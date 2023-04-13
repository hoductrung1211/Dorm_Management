import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faDiamond,  faL,  faMarsAndVenus, faMoneyBill, faWarning  } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from '../../ui/attribute-text';
import ActionButton from "../../ui/button-action";
import SectionInfoHeader from "../../layouts/info-header.section";
import InputEditing from "../../ui/input-editing";
import { useState } from "react";
import SelectEditing from "../../ui/select-editing";
import TextareaEditing from "../../ui/textarea-editing";
import InputImageEditing from "../../ui/input-image-editing";

export default function SectionRoomTypeEditing({
    handleAddingRoom,
    setSectionId,
}) {
    const [tempInfo, setTempInfo] = useState({
        typeName: "",
        gender: true,
        beds: 0,
        cost: 100_000,
        desc: "",
    });

    return (
        <>
            <SectionInfoHeader 
                title="Room Detail Editing" 
                handleOut={() => setSectionId(0)} />

            <main className="flex flex-col h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
                <section className="w-full flex gap-3">
                    <ImageSection info={tempInfo} handleChangeInfo={setTempInfo} />
                    <InfoSection info={tempInfo}  handleChangeInfo={setTempInfo}/>
                    <ActionsSection>
                        <ActionButton 
                            title="Save"
                            handleClick={() => {
                                let result = confirm("Do you really want to save the changes?");
                                if (result) {
                                    handleUpdateInfo(tempInfo);
                                    setSectionId(1);
                                }
                            }}
                        />
                     
                    </ActionsSection>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <DescriptionSection
                        info={tempInfo.desc}
                        handleChangeInfo={setTempInfo}
                    />
                    
                </section>
            </main>
        </>
    )
}

function ImageSection({ 
    info,
    handleChangeInfo,
}) {
    return (
        <section className="w-full h-full flex justify-center items-center">
            <div className="relative w-10/12 aspect-square">
                <InputImageEditing />
            </div>
        </section>
    )
}

function InfoSection({
    info,
    handleChangeInfo,
}) {
    return (
        <section className="relative w-full ">
            
            <AttributeText title="Type name">
                <InputEditing 
                    icon={faDiamond} 
                    value={info.typeName}
                    handleChange={nextTypeName => handleChangeInfo({
                        ...info,
                        typeName: nextTypeName,
                    })} />
            </AttributeText>
            <AttributeText title="For gender">
                <SelectEditing
                    icon={faMarsAndVenus}
                    options={[
                        {text: "Male", value: true},
                        {text: "Female", value: false},
                    ]}
                    value={info.gender}
                    handleChange={nextGender => handleChangeInfo({
                        ...info,
                        gender: nextGender == "true" ? true : false,
                    })}
                />
            </AttributeText>
            <AttributeText title="Number of beds">
                <InputEditing 
                    icon={faBed} 
                    value={info.beds} type="number"
                    handleChange={nextBeds => handleChangeInfo({
                        ...info,
                        beds: nextBeds,
                    })} />
            </AttributeText>
            <AttributeText title="Cost">
                <InputEditing 
                    icon={faMoneyBill} 
                    value={info.cost} 
                    type="number"
                    handleChange={nextCost => handleChangeInfo({
                        ...info, 
                        cost: nextCost,
                    })}    
                />
            </AttributeText>
        </section>
    )
}

function ActionsSection({
    children,
}) {
    return (
        <section className="w-full flex flex-col">
            <AttributeText title="Actions">
                <div className="flex flex-col h-full gap-3 p-3 border-2 border-ec rounded-md">
                    {children}
                </div>
            </AttributeText>
        </section>
    )
}

function DescriptionSection({
    desc,
    handleChangeDesc,
}) {
    return (
        <>
        <div className="col-span-2 flex flex-col">
            <AttributeText title="Description" />
            {/* <p className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.
            </p> */}
            <TextareaEditing
                value={desc}
                handleChange={e => handleChangeDesc(e.target.value)} 
            />
        </div>
        </>
    )
}

 