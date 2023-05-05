import { useContext, useState, useEffect } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faFaucetDrip  } from "@fortawesome/free-solid-svg-icons";
import TemplateCostInfo from "./template-cost-info.section";
import MGMTService from "../../../pages/api/service/MGMT-InvoicesService"


const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Month" },
    {id: 2, text: "Year" },
    {id: 3, text: "Cost" }, 
]



export default function SectionTemplateCost({filterCosts}) {
    const [viewedDataId, setViewedDataId] = useState(null);
    const [templateCosts, setTemplateCosts] = useState([])
    const [infoChanged, setInfoChanged] = useState(false)
    const typeOf= JSON.parse(filterCosts.type)
    useEffect(()=>{
        try{
            typeOf ?
                MGMTService.listElectricPrice(filterCosts.year).then(res=>{
                    setTemplateCosts(res.data)
                })
                :
                MGMTService.listWaterPrice(filterCosts.year).then(res=>{
                    setTemplateCosts(res.data)
                })
        }catch(error){
            if(error.response){
                console.log(error.response.data)
            }
        }
    },[filterCosts, infoChanged])


    // Room Info display on info dashboard
    const viewedTemplateCost = templateCosts.find(data => data.id == viewedDataId);

    // Room array have been filtered

    function handleShowMore() {
        
    }

    
    const [sectionId, setSectionId] = useState(0);
    const displaySections = [
        {
            id: 0,
            section: <SectionRoomList 
                templateCosts={templateCosts}
                setViewedDataId={setViewedDataId}
                setSectionId={setSectionId}
                handleShowMore={handleShowMore} />,
        },
        {
            id: 1,
            section: <TemplateCostInfo
                        info={viewedTemplateCost}
                        setSectionId={setSectionId}
                        setInfoChanged={setInfoChanged}
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
    templateCosts ,
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
        {templateCosts.map( data => 
            <div 
                key={data.id} className="flex-shrink-0 grid grid-cols-4  text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"  
                onClick={() => {
                    setViewedDataId(data.id);
                    setSectionId(1);
                }}
            >
                <DataColumn text={data.id} />
                <DataColumn text={data.thang} />
                <DataColumn text={data.nam} /> 
                <DataColumn text={ ('giaDien' in data) ? (moneyConverter(data.giaDien) + "/kW") : (moneyConverter(data.giaNuoc)+ "/m3")} className=" font-bold" > 
                {('giaDien' in data) ? <FontAwesomeIcon icon={faBolt} className="text-xl text-orange-400 mr-1" /> : <FontAwesomeIcon icon={faFaucetDrip} className="text-xl text-primary mr-1" />}
                </DataColumn>
 
            </div>
        )}
        </main>

        <div className="flex-shrink-0 w-full h-14 pt-2 text-end">
            {/* <button 
                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
              
            >
                Add
            </button> */}

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