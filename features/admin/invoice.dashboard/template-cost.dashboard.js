import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faFaucetDrip  } from "@fortawesome/free-solid-svg-icons";
import TemplateCostInfo from "./template-cost-info.section";

const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Month" },
    {id: 2, text: "Year" },
    {id: 3, text: "Cost" }, 
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

    function handleShowMore() {
        
    }

    const [sectionId, setSectionId] = useState(0);
    const displaySections = [
        {
            id: 0,
            section: <SectionRoomList 
                filteredData={filteredData}
                setViewedDataId={setViewedDataId}
                setSectionId={setSectionId}
                handleShowMore={handleShowMore} />,
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
    filteredData ,
    setViewedDataId , 
    setSectionId,
    handleShowMore,
}) {
    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-4 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {
            sortingButtons.map(button => 
                <OrderButtoon 
                    key={button.id}
                    button={button}
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

            <button 
                className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
                onClick={handleShowMore}
            >
                Show more
            </button>
        </div>
    </>
    )
}