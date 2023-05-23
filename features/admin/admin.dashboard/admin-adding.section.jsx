import {   faCalendar, faGlasses, faIdCard, faKey, faMarsAndVenus, faMailBulk,   faMoneyBill, faRightFromBracket, faRightToBracket, faSignature, faSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import SectionInfoHeader from "../../layouts/info-header.section";
import AttributeText from '../../ui/attribute-text';
import {  useState, useEffect } from "react";
import InputEditing from "../../ui/input-editing";
import SelectEditing from "../../ui/select-editing";
import MGMTService from "../../../pages/api/service/MGMT-Admin"

export default function SectionAdminAdding({ 
    setSectionId,
    handleAddingAdmin,
}) {
    const [roles, setRolse] = useState([])
    useEffect(()=>{
        MGMTService.listRoles().then((res)=>{
            console.log(res.data)
            setRolse(res.data)
        }).catch((error)=>{
                if(error.response){
                    console.log(error.response.data)
                }
            })
    },[])

    const roleOptions= roles.filter(role=>{
        return role.id!=1
    }).map(role=>{    
        return {value : role.id,
        text: role.roleName }
    })


    const [tempInfo, setTempInfo] = useState({ 
        username: "",
        hoTen:"",
        mail: "",
        password: "",
        role_id: 2,
    })

    function authenInfo() {
        if (tempInfo.username == "") {
            alert("Cannot leave the name blank!")
            return false;
        }
        
        else if (tempInfo.mail == "") {
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

                <AttributeText title="ID">
                    <InputEditing 
                        icon={faUser} 
                        value={tempInfo.username} 
                        handleChange={nextDateStart => setTempInfo({
                            ...tempInfo,
                            username: nextDateStart,
                        })}
                    />
                </AttributeText>
                <AttributeText title="Full Name">
                    <InputEditing 
                        icon={faSignature} 
                        value={tempInfo.hoTen} 
                        handleChange={nextDateStart => setTempInfo({
                            ...tempInfo,
                            hoTen: nextDateStart,
                        })}
                    />
                </AttributeText>
                <AttributeText title="Mail">
                    <InputEditing 
                        icon={faMailBulk} 
                        value={tempInfo.mail} 
                        handleChange={nextDateStart => setTempInfo({
                            ...tempInfo,
                            mail: nextDateStart,
                        })}
                    />
                </AttributeText>
               

                {/* <AttributeText title="Birthday">
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
                </AttributeText> */}

                <AttributeText title="Role">
                    <SelectEditing
                        icon={faGlasses}
                        options={roleOptions}
                        value="2"
                        handleChange={nextGender => setTempInfo({
                            ...tempInfo,
                            role_id: nextGender
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
                    // if (authenInfo())
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