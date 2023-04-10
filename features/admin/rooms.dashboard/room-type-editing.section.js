import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiamond,  faL,  faMarsAndVenus, faMoneyBill, faWarning  } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from '../../ui/attribute-text';
import ActionButton from "../../ui/button-action";
import SectionInfoHeader from "../../layouts/info-header.section";
import InputEditing from "../../ui/input-editing";
import { useState } from "react";
import SelectEditing from "../../ui/select-editing";
import TextareaEditing from "../../ui/textarea-editing";

export default function SectionRoomTypeEditing({
    info,
    handleUpdateInfo,
    setSectionId,
}) {
    const [tempInfo, setTempInfo] = useState(info);

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
                        <ActionButton 
                            title="Cancel"
                            handleClick={() => {
                                let result = confirm("Don't you really want to save the changes?");
                                if (result)
                                    setSectionId(1);
                            }}
                        />
                    </ActionsSection>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <DescriptionSection
                        info={info}
                        handleChangeInfo={setTempInfo}
                    />
                    <div className="col-span-1 ">
                        <h4 className=" text-red mb-2 text-xl font-bold">
                            Important
                            <FontAwesomeIcon icon={faWarning} className="ml-2 text-2xl" />
                        </h4>
                        <p>When you editing or deleting this room, make sure that there is no students related to this type!</p>
                    </div>
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
        <section className="w-full">
            <div className="relative w-10/12 aspect-square">
                <Image
                    className="object-cover rounded-lg"
                    src={info.imgUrl}
                    alt="A picture of room"
                    fill
                />
            </div>
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

function InfoSection({
    info,
    handleChangeInfo,
}) {
    return (
        <section className="relative w-full ">
            <AttributeText title="Room ID">
                <span className="text-5xl text-primary font-bold">
                    {info.id}
                </span>
            </AttributeText>
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
                    icon={faMoneyBill} 
                    value={info.beds} type="number"
                    handleChange={nextBeds => handleChangeInfo({
                        ...info,
                        beds: nextBeds,
                    })} />
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
    info,
    handleChangeInfo,
}) {
    return (
        <>
        <div className="col-span-2 flex flex-col">
            <AttributeText title="Analysis" />
            {/* <p className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.
            </p> */}
            <TextareaEditing
                value={info.desc}
                handleChange={nextDesc => handleChangeInfo({
                        ...info,
                        desc: nextDesc,
                    })} 
            />
        </div>
        </>
    )
}

 