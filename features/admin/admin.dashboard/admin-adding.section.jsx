import {   faCalendar, faGlasses, faKey, faMarsAndVenus,   faMoneyBill, faRightFromBracket, faRightToBracket, faSignature, faSquare } from "@fortawesome/free-solid-svg-icons";
import SectionInfoHeader from "../../layouts/info-header.section";
import AttributeText from '../../ui/attribute-text';
import {  useState } from "react";
import InputEditing from "../../ui/input-editing";
import SelectEditing from "../../ui/select-editing";

export default function SectionAdminAdding({ 
    setSectionId,
    handleAddingAdmin,
}) {

    const [tempInfo, setTempInfo] = useState({ 
        name: "",
        birthday: null,
        gender: true,
        role: 0,
        password: "",
    })

    function authenInfo() {
        if (tempInfo.name == "") {
            alert("Cannot leave the name blank!")
            return false;
        }
        
        else if (tempInfo.birthday == null) {
            alert("Cannot leave the birthday blank!")
            return false;
        }
        
        else if (tempInfo.password == "") {
            alert("Cannot leave the password blank!")
            return false;
        } 

        return true;
    }

    return (
        <>
        <SectionInfoHeader 
            title="Admin Adding" 
            handleOut={() => setSectionId(0)} />

        <main className="flex flex-col justify-between items-center gap-8 h-full p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
            <section className="w-96 h-full py-2 px-5 border-2 border-ec rounded-lg ">

                <AttributeText title="Full name">
                    <InputEditing 
                        icon={faSignature} 
                        value={tempInfo.name} 
                        handleChange={nextDateStart => setTempInfo({
                            ...tempInfo,
                            name: nextDateStart,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Birthday">
                    <InputEditing 
                        icon={faCalendar} 
                        value={tempInfo.endDate}
                        type="date" 
                        handleChange={nextDateEnd => setTempInfo({
                            ...tempInfo,
                            birthday: nextDateEnd,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Gender">
                    <SelectEditing
                        icon={faMarsAndVenus}
                        options={[
                            {text: "Male", value: true},
                            {text: "Female", value: false},
                        ]}
                        value={tempInfo.gender}
                        handleChange={nextGender => setTempInfo({
                            ...tempInfo,
                            gender: nextGender == "true" ? true : false,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Role">
                    <SelectEditing
                        icon={faGlasses}
                        options={[
                            {text: "Master", value: true},
                            {text: "Nerd", value: false},
                        ]}
                        value={tempInfo.gender}
                        handleChange={nextGender => setTempInfo({
                            ...tempInfo,
                            role: nextGender == "true" ? true : false,
                        })}
                    />
                </AttributeText>

                <AttributeText title="Password">
                    <InputEditing 
                        icon={faKey} 
                        value={tempInfo.feeDeadline} 
                        type="password"
                        handleChange={nextFeeDeadline => setTempInfo({
                            ...tempInfo,
                            password: nextFeeDeadline,
                        })}
                    />
                </AttributeText>
            </section>

            <section className="w-96 h-16 flex ">
                <Button text="Save" handleClick={() => {
                    if (authenInfo())
                        handleAddingAdmin(tempInfo)
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