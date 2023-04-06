import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import MenuButton from "../../ui/button-menu";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";

const menus = [
    {
        id: 0,
        text: "Rooms",
        section: null,
    },
    {
        id: 1,
        text: "Room Types",
        section: null,
    },
]

export default function RoomsDashboard() {
    const [menuID, setMenuID] = useState(0);
    const section = menus.find(menu => menu.id == menuID).section;
    const [filterValues, setFilterValues] = useState({
        text: "",
        type: "all",
        status: "all",
    })

    function handleChangeMenu(nextMenuID) {
        setFilterValues({
            text: "",
            type: "all",
            status: "all",
        });

        setMenuID(nextMenuID);
    }

    // Just display search bar when the menu is ROOMS
    const searchBar = menuID == 0 
        && <FilterBar filterValues={filterValues} setFilterValues={setFilterValues} />
        

    return (
        <FilterValuesContext.Provider value={filterValues}>
            <HeaderSection>
                <div className="relative top-1.5 h-14 -mt-1 z-10"> 
                    {menus.map(menu => 
                        <MenuButton 
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

function FilterBar({
    filterValues,
    setFilterValues,
}) {
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
                title="Room type"
                options={[
                    {text: "All", value: "all"},
                    {text: "standard", value: 0},
                    {text: "deluxe", value: 1},
                    {text: "premium", value: 2},
                ]}
                handleChangeSelection={nextStatus => {
                    setFilterValues({
                        ...filterValues,
                        type: nextStatus,
                    })
                }}
            />

            <FilterSelection
                title="Status"
                options={[
                    {text: "All", value: "all"},
                    {text: "Empty", value: 0},
                    {text: "Available", value: 1},
                    {text: "Full", value: 2},
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