import { faBolt, faCalendar, faCalendarWeek, faCircle, faDiamond, faFaucetDrip, faMoneyBill, faSquare } from "@fortawesome/free-solid-svg-icons";
import SectionInfoHeader from "../../layouts/info-header.section";
import AttributeText from '../../ui/attribute-text';
import AttributeValue from '../../ui/attribute-value';
import { moneyConverter } from "../../utils/convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function TemplateCostInfo({
    info,
    setSectionId,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempCost, setTempCost] = useState(info.cost)
    const formRef = useRef(null);

    function handleChangeCost() {
        setSectionId(0);
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
                    <AttributeValue value={info.type ? "Electricity" : "Water"}>
                    {info.type ? <FontAwesomeIcon icon={faBolt} className=" text-2xl text-orange" /> : <FontAwesomeIcon icon={faFaucetDrip} className=" text-2xl text-primary" /> }
                    </AttributeValue>
                </AttributeText>

                <AttributeText title="Month">
                    <AttributeValue icon={faCalendarWeek} value={info.month} />
                </AttributeText>

                <AttributeText title="Year">
                    <AttributeValue icon={faCalendar} value={info.year} />
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
                        <AttributeValue icon={faMoneyBill} value={moneyConverter(info.cost) + (info.type ? "/kW" : "/m3")} /> 
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