import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faFaucetDrip  } from "@fortawesome/free-solid-svg-icons";
import TemplateCostInfo from "./template-cost-info.section";

const sortingButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.id > rowB.id ? 1 : -1;
            } 
            return rowA.id < rowB.id ? 1 : -1;
        }
    },
    {id: 1, text: "Month",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.month > rowB.month ? 1 : -1;
            } 
            return rowA.month < rowB.month ? 1 : -1;
        }
    },
    {id: 2, text: "Year",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.year > rowB.year ? 1 : -1;
            } 
            return rowA.year < rowB.year ? 1 : -1;
        }
    },
    {id: 3, text: "Cost",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.cost > rowB.cost ? 1 : -1;
            } 
            return rowA.cost < rowB.cost ? 1 : -1;
        }
    }, 
]

const templateCosts = [
    {id: "001", month: 4, year: 2023, cost: 12000, type: true },
    {id: "002", month: 3, year: 2023, cost: 12000, type: true },
    {id: "003", month: 2, year: 2023, cost: 11000, type: true },
    {id: "004", month: 1, year: 2023, cost: 11000, type: true }, 
    {id: "005", month: 4, year: 2023, cost: 13000, type: false },
    {id: "006", month: 3, year: 2023, cost: 13000, type: false },
    {id: "007", month: 2, year: 2023, cost: 12000, type: false },
    {id: "008", month: 1, year: 2023, cost: 12000, type: false }, 
]

export default function SectionTemplateCost() {
    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const filterValues = useContext(FilterValuesContext);
    const [viewedDataId, setViewedDataId] = useState(null);

    // Room Info display on info dashboard
    const viewedTemplateCost = templateCosts.find(data => data.id == viewedDataId);

    // Room array have been filtered
    const filteredData = templateCosts.filter(data => {
        const checkedID = data.id.includes(filterValues.text);
        const checkedType = filterValues.type == "all" ? true : filterValues.type == data.type + "";

        if (checkedID && checkedType  ) {
            return true;
        }
        return false;
    });

    // Filtered Room array have been sorted by order button
    filteredData.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    });

    const [sectionId, setSectionId] = useState(0);
    const displaySections = [
        {
            id: 0,
            section: <SectionRoomList
                        sortingButton={sortingButton}
                        sortingButtons={sortingButtons}
                        setSortingButton={setSortingButton}
                        filteredData={filteredData}
                        setViewedDataId={setViewedDataId}
                        setSectionId={setSectionId} />,
        },
        {
            id: 1,
            section: <TemplateCostInfo
                        info={viewedTemplateCost}
                        setSectionId={setSectionId}
                    />
        }
    ]
    const section = displaySections.find(st => st.id == sectionId).section;

    return (
        <div className="h-full w-full p-4 flex flex-col">
        {section}           
        </div>
    )
}

function SectionRoomList({
    sortingButtons,
    sortingButton ,
    setSortingButton,
    filteredData ,
    setViewedDataId , 
    setSectionId,
}) {
    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-4 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {
            sortingButtons.map(button => 
                <OrderButtoon 
                    key={button.id}
                    button={button}
                    sortingButton={sortingButton}
                    handleClick={(id) => {
                        if (id == sortingButton.id) {
                            setSortingButton({
                                id,
                                isAsc: !sortingButton.isAsc,
                            })
                        } else {
                            setSortingButton({
                                id,
                                isAsc: true,
                            })
                        }
                    }}
                />)
        }
        </header>

        <main className="h-full w-full flex flex-col overflow-auto">
        {filteredData.map( data => 
            <div 
                key={data.id} className="flex-shrink-0 grid grid-cols-4  text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"  
                onClick={() => {
                    setViewedDataId(data.id);
                    setSectionId(1);
                }}
            >
                <DataColumn text={data.id} />
                <DataColumn text={data.month} />
                <DataColumn text={data.year} /> 
                <DataColumn text={moneyConverter(data.cost) + (data.type ? "/kW" : "/m3")} className=" font-bold" > 
                {data.type ? <FontAwesomeIcon icon={faBolt} className="text-xl text-orange-400 mr-1" /> : <FontAwesomeIcon icon={faFaucetDrip} className="text-xl text-primary mr-1" />}
                </DataColumn>
 
            </div>
        )}
        </main>

        <div className="flex-shrink-0 w-full h-14 pt-2 text-end ">
            <button 
                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
              
            >
                Add
            </button>
        </div>
    </>
    )
}