import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import MenuButton from "../../ui/button-menu";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import SmallFilterSelection from "../../ui/select-filter-small";
import { FilterValuesContext } from "../filterValues.context";
import SectionInvoices from "./invoice.dashboard";
import SectionTemplateCost from "./template-cost.dashboard";



export default function InvoiceDashboard() {

    const [filterValues, setFilterValues] = useState({
        text: "",
        type: true,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        status: false,
    })
    const [filterCosts, setFilterCosts] = useState({
        text: "",
        type: true,
    })

    const menus = [
        {
            id: 0,
            text: "Invoice",
            section: <SectionInvoices/>,
        },
        {
            id: 1,
            text: "Template Cost",
            section: <SectionTemplateCost filterCosts={filterCosts}  />,
        },
    ]
    const [menuID, setMenuID] = useState(0);
    const section = menus.find(menu => menu.id == menuID).section;
    

    function handleChangeMenu(nextMenuID) {
        setFilterValues({
            text: "",
            type: true,
            month: null,
            year: 2023,
            status: false,
        });
        setFilterCosts({
            year: 2023,
            type: true,
        })

        setMenuID(nextMenuID);
    }

    // Just display search bar when the menu is ROOMS
    const searchBar = menuID == 0 
        ? <InvoiceFilterBar filterValues={filterValues} setFilterValues={setFilterValues}  />
        : <CostFilterBar filterValues={filterCosts} setFilterValues={setFilterCosts} />
        
    

    return (
        <FilterValuesContext.Provider value={filterValues}>
            <HeaderSection>
                <div className="relative top-1.5 h-14 -mt-1 z-10"> 
                    {menus.map(menu => 
                        <MenuButton 
                            key={menu.id}
                            menu={menu} 
                            isActive={menuID == menu.id} 
                            handleChangeActiveMenu={handleChangeMenu}
                        />
                    )}
                </div>
                
                {searchBar}
            </HeaderSection>

            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                {section}
                </Container>
            </div>
        </FilterValuesContext.Provider>
    )
}

function InvoiceFilterBar({
    filterValues,
    setFilterValues,
    
}) {
    function getMonths(year) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
      
        const months = [
            { text: "--", value: null },
            { text: "Jan", value: 1 },
            { text: "Feb", value: 2 },
            { text: "Mar", value: 3 },
            { text: "Apr", value: 4 },
            { text: "May", value: 5 },
            { text: "Jun", value: 6 },
            { text: "Jul", value: 7 },
            { text: "Aug", value: 8 },
            { text: "Sep", value: 9 },
            { text: "Oct", value: 10 },
            { text: "Nov", value: 11 },
            { text: "Dec", value: 12 }
        ];
      
        if (year < currentYear) {
          return months;
        } else if (year == currentYear) {
          return months.filter(month => month.value <= currentMonth);
        } else {
          return [];
        }
      }



    return (
        <div className="pl-2 w-20 flex-grow h-full grid grid-flow-col gap-5">
            <InputFilter
                textValue={filterValues.text}
                handleTextChange={nextText => {
                    setFilterValues({
                        ...filterValues,
                        text: nextText,
                    })
                }}
                placeholder="Search here.."
            />

            <FilterSelection
                title="Type"
                options={[
                    {text: "Electric", value: true},
                    {text: "Water", value: false}, 
                ]}
                handleChangeSelection={nextStatus => {
                    setFilterValues({
                        ...filterValues,
                        type: nextStatus,
                    })
                }}
            />

            <SmallFilterSelection
                title="Time"
                options={getMonths(filterValues.year)}
                handleChangeSelection={nextTimeframe => {
                    setFilterValues({
                        ...filterValues,
                        month: nextTimeframe,
                    })
                }}
                // defaultValue={new Date().getMonth()}
            />
            <SmallFilterSelection
                title=""
                options={[
                    {text: 2023, value: 2023},
                    {text: 2022, value: 2022},
                ]}
                handleChangeSelection={nextTimeframe => {
                    setFilterValues({
                        ...filterValues,
                        year: nextTimeframe,
                    })
                }}
            />

            <FilterSelection
                title="Status"
                options={[
                    {text: "Unpaid", value: false}, 
                    {text: "Paid", value: true},
                ]}
                handleChangeSelection={nextStatus => {
                    setFilterValues({
                        ...filterValues,
                        status: nextStatus,
                    })
                }}
            />
        </div>
    )
}

function CostFilterBar({
    filterValues,
    setFilterValues,
}) {
    return (
        <div className="ml-5 pl-2 w-0 flex-grow h-full flex gap-5">
            {/* <InputFilter
                textValue={filterValues.text}
                handleTextChange={nextText => {
                    setFilterValues({
                        ...filterValues,
                        text: nextText,
                    })
                }}
                placeholder="Search here.."
            /> */}
            <SmallFilterSelection
                title="Year"
                options={[
                    {text: "2023", value: 2023},
                    {text: "2022", value: 2022},
                ]}
                handleChangeSelection={nextStatus => {
                    setFilterValues({
                        ...filterValues,
                        year: nextStatus,
                    })
                }}
            />
            <FilterSelection
                title="Type"
                options={[
                    {text: "Electric", value: true},
                    {text: "Water", value: false},
                ]}
                handleChangeSelection={nextStatus => {
                    setFilterValues({
                        ...filterValues,
                        type: nextStatus,
                    })
                }}
            />
        </div>
    )
}

