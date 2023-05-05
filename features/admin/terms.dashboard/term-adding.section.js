import {   faCalendar,   faMoneyBill, faRightFromBracket, faRightToBracket, faSquare } from "@fortawesome/free-solid-svg-icons";
import SectionInfoHeader from "../../layouts/info-header.section";
import AttributeText from '../../ui/attribute-text';
import {  useState } from "react";
import InputEditing from "../../ui/input-editing";

export default function SectionTermAdding({ 
    setSectionId,
    handleAddingTerm,
}) {

    function mockDate(num){
        let currentDate = new Date();
        let nextDay = new Date();
        nextDay.setDate(currentDate.getDate() + 1 + num);
        return nextDay.toISOString().slice(0, 10);
    }
    function formatDate(date){
        var isoDate=  date.split("-").reverse().join("/")
        return isoDate;
    }

    const [tempInfo, setTempInfo] = useState({
        ngayMoDangKy: mockDate(0),
        ngayKetThuc: mockDate(92),
        ngayKetThucDangKy: mockDate(5),
        hanDongPhi: 5,
    })

    // function authenInfo() {
    //     if (tempInfo.startDate == null) {
    //         alert("Cannot leave the Start Date blank!")
    //         return false;
    //     }
        
    //     else if (tempInfo.endDate == null) {
    //         alert("Cannot leave the End Date blank!")
    //         return false;
    //     }
        
    //     else if (tempInfo.formDeadline == null) {
    //         alert("Cannot leave the Form deadline blank!")
    //         return false;
    //     }
    //     else if (tempInfo.feeDeadline == 0) {
    //         alert("Cannot leave the fee Deadline equals 0!")
    //         return false;
    //     }

    //     return true;
    // }

    return (
        <>
        <SectionInfoHeader 
            title="Term Adding" 
            handleOut={() => setSectionId(0)} />

        <main className="flex flex-col justify-between items-center gap-10 h-full p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
            <section className="w-96 h-full p-5 border-2 border-ec rounded-lg ">
                {/* <AttributeText title="Term ID">
                    <span className="text-5xl text-primary font-bold">
                        {tempInfo.id}
                    </span>
                </AttributeText> */}

                <AttributeText title="Start date">
                    <InputEditing 
                        icon={faRightToBracket} 
                        value={tempInfo.ngayMoDangKy} 
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
                        value={tempInfo.ngayKetThuc} 
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
                        value={tempInfo.ngayKetThucDangKy} 
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
                        ngayMoDangKy: formatDate(tempInfo.ngayMoDangKy),
                        ngayKetThuc: formatDate(tempInfo.ngayKetThuc),
                        ngayKetThucDangKy: formatDate(tempInfo.ngayKetThucDangKy)
                    }
                    handleAddingTerm(term)
                        
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