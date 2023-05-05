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

    function formatDate(dateStr) {
        var isoDate=  dateStr.split("/").reverse().join("-")
        return isoDate;
    }
    function reFormatDate(date){
        var isoDate=  date.split("-").reverse().join("/")
        return isoDate;
    }
    
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
                        value={formatDate(tempInfo.ngayMoDangKy)} 
                        type="date"
                        handleChange={nextDateStart => setTempInfo({
                            ...tempInfo,
                            ngayMoDangKy: nextDateStart,
                        })}
                    />
                </AttributeText>

                <AttributeText title="End date">
                    <InputEditing 
                        icon={faRightFromBracket} 
                        value={formatDate(tempInfo.ngayKetThuc)} 
                        type="date"
                        handleChange={nextDateEnd => setTempInfo({
                            ...tempInfo,
                            ngayKetThuc: nextDateEnd,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Form submission deadline">
                    <InputEditing 
                        icon={faCalendar} 
                        value={formatDate(tempInfo.ngayKetThucDangKy)} 
                        type="date"
                        handleChange={nextSubmissionDeadline => setTempInfo({
                            ...tempInfo,
                            ngayKetThucDangKy: nextSubmissionDeadline,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Tuition fee deadline">
                    <InputEditing 
                        icon={faMoneyBill} 
                        value={tempInfo.hanDongPhi} 
                        handleChange={nextFeeDeadline => setTempInfo({
                            ...tempInfo,
                            hanDongPhi: nextFeeDeadline,
                        })}
                    />
                </AttributeText>
            </section>

            <section className="w-96 h-16 flex ">
                <Button text="Save" handleClick={() => {
                    const term = {...tempInfo,
                        ngayMoDangKy: reFormatDate(tempInfo.ngayMoDangKy),
                        ngayKetThuc: reFormatDate(tempInfo.ngayKetThuc),
                        ngayKetThucDangKy: reFormatDate(tempInfo.ngayKetThucDangKy)
                    }
                    handleEditingTerm(term)
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