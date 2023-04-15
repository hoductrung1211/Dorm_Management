import {   faCalendar,   faMoneyBill, faRightFromBracket, faRightToBracket, faSquare } from "@fortawesome/free-solid-svg-icons";
import SectionInfoHeader from "../../layouts/info-header.section";
import AttributeText from '../../ui/attribute-text';
import {  useState } from "react";
import InputEditing from "../../ui/input-editing";

export default function SectionTermEditing({ 
    setSectionId,
    handleEditingTerm,
    info,
}) {

    const [tempInfo, setTempInfo] = useState(info)
 
    return (
        <>
        <SectionInfoHeader 
            title="Term Adding" 
            handleOut={() => setSectionId(0)} />

        <main className="flex flex-col justify-between items-center gap-10 h-full p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
            <section className="w-96 h-full p-5 border-2 border-ec rounded-lg ">
                <AttributeText title="Term ID">
                    <span className="text-5xl text-primary font-bold">
                        {tempInfo.id}
                    </span>
                </AttributeText>

                <AttributeText title="Start date">
                    <InputEditing 
                        icon={faRightToBracket} 
                        value={tempInfo.startDate} 
                        type="date"
                        handleChange={nextDateStart => setTempInfo({
                            ...tempInfo,
                            startDate: nextDateStart,
                        })}
                    />
                </AttributeText>

                <AttributeText title="End date">
                    <InputEditing 
                        icon={faRightFromBracket} 
                        value={tempInfo.endDate} 
                        type="date"
                        handleChange={nextDateEnd => setTempInfo({
                            ...tempInfo,
                            endDate: nextDateEnd,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Form submission deadline">
                    <InputEditing 
                        icon={faCalendar} 
                        value={tempInfo.formDeadline} 
                        type="date"
                        handleChange={nextSubmissionDeadline => setTempInfo({
                            ...tempInfo,
                            formDeadline: nextSubmissionDeadline,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Tuition fee deadline">
                    <InputEditing 
                        icon={faMoneyBill} 
                        value={tempInfo.feeDeadline} 
                        handleChange={nextFeeDeadline => setTempInfo({
                            ...tempInfo,
                            feeDeadline: nextFeeDeadline,
                        })}
                    />
                </AttributeText>
            </section>

            <section className="w-96 h-16 flex ">
                <Button text="Save" handleClick={() => {
                    handleEditingTerm(tempInfo)
                }}/>
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