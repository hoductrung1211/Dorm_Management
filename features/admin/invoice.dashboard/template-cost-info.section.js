import { faBolt, faCalendar, faCalendarWeek, faCircle, faDiamond, faFaucetDrip, faMoneyBill, faSquare } from "@fortawesome/free-solid-svg-icons";
import SectionInfoHeader from "../../layouts/info-header.section";
import AttributeText from '../../ui/attribute-text';
import AttributeValue from '../../ui/attribute-value';
import { moneyConverter } from "../../utils/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import MGMTService from "../../../pages/api/service/MGMT-InvoicesService"

export default function TemplateCostInfo({
    info,
    setSectionId,
    setInfoChanged
}) {

    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef(null);
    
    const [tempCost, setTempCost] = useState('giaDien' in info ? info.giaDien : info.giaNuoc)

    useEffect(()=>{
        setInfoChanged(false)
    },[])

    function handleChangeCost() {
        try{
            ('giaDien' in info) ? 
            MGMTService.updateCostElectricity(info.id, tempCost).then(res=>{
                setInfoChanged(true)
                console.log(res.data)
            }) :
            MGMTService.updateCostWater(info.id, tempCost).then(res=>{
                setInfoChanged(true)
                console.log(res.data)
            })
            setSectionId(0);
        }catch(error){
            console.log(error.response.data)
        }
    
        
    }

    return (
        <>
        <SectionInfoHeader 
            title="Template Cost detail" 
            handleOut={() => setSectionId(0)} />

        <main className="flex flex-col justify-between items-center gap-10 h-full p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
            <section className="w-96 h-full bg-fa p-5 border-2 border-ec rounded-lg ">
                <AttributeText title="Room ID">
                    <span className="text-5xl text-primary font-bold">
                        {info.id}
                    </span>
                </AttributeText>

                <AttributeText title="Type">
                    <AttributeValue value={('giaDien' in info) ? "Electricity" : "Water"}>
                    {('giaDien' in info) ? <FontAwesomeIcon icon={faBolt} className=" text-2xl text-orange" /> : <FontAwesomeIcon icon={faFaucetDrip} className=" text-2xl text-primary" /> }
                    </AttributeValue>
                </AttributeText>

                <AttributeText title="Month">
                    <AttributeValue icon={faCalendarWeek} value={info.thang} />
                </AttributeText>

                <AttributeText title="Year">
                    <AttributeValue icon={faCalendar} value={info.nam} />
                </AttributeText>

                <AttributeText title="Cost">
                    {
                        isEditing ? 
                        <form 
                            className="relative"
                            ref={formRef}
                            method="post">
                            <input 
                                type="number"
                                className="h-10 w-full outline-none pl-14 pr-4 text-lg border-2 rounded-md"
                                value={tempCost}
                                onChange={e => setTempCost(e.target.value)} /> 
                            <FontAwesomeIcon icon={faMoneyBill} className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-primary" />
                        </form> :
                        <AttributeValue icon={faMoneyBill} value={moneyConverter(('giaDien' in info) ? info.giaDien : info.giaNuoc) + (('giaDien' in info) ? "/kW" : "/m3")} /> 
                    }
                </AttributeText>
            </section>

            <section className="w-96 h-16 flex gap-4">
                {
                    isEditing ? 
                    <>
                        <Button text="Save" handleClick={() => {
                            setIsEditing(true)                       
                            handleChangeCost()
                        }}/>
                        <Button text="Cancel" handleClick={() => {
                            setIsEditing(false)                       
                            setTempCost(info.cost)
                        }} />
                    </> :
                    <Button text="Edit cost" handleClick={() => {
                        setIsEditing(true)                       
                    }} />
                }
            </section>
        </main>
        </>
    )
}

function Button({
    text,
    handleClick,
}) {
    return (
        <button 
            className="w-full h-full bg-ec font-bold rounded-lg active:opacity-80"
            onClick={handleClick}>
        {text}
        </button>
    )
}