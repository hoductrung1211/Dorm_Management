import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faDiamond, faMars, faMoneyBill, faVenus, faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from '../../ui/attribute-text';
import AttributeValue from '../../ui/attribute-value';
import ActionButton from "../../ui/button-action";
import {moneyConverter} from '../../utils/convert';
import SectionInfoHeader from "../../layouts/info-header.section";
export default function SectionRoomTypeInfo({
    info,
    setSectionId,
    handleDeleteRoomType,
}) {

    return (
        <>
            <SectionInfoHeader 
                title="Room Detail" 
                handleOut={() => setSectionId(0)} />

            <main className="flex flex-col h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
                <section className="w-full flex gap-3">
                    <ImageSection info={info} />
                    <InfoSection info={info} />
                    <ActionsSection>
                        <ActionButton 
                            title="Edit"
                            handleClick={() => {
                                setSectionId(2);
                            }}
                         />
                        <ActionButton 
                            title="Delete" 
                            handleClick={() => {
                                const result = confirm("Do you really want to DELETE this room type?");
                                if (result) {
                                    handleDeleteRoomType(info.id)
                                    
                                }
                            }}
                            bgRed={true} />
                        <ActionButton title="Show all rooms (12)" />
                    </ActionsSection>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <DescriptionSection info={info} />
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


function ImageSection({ info: {image, giaPhong}}) {
    return (
        <section className="w-full">
            <div className="relative w-10/12 aspect-square">
                <img
                    className="object-cover rounded-lg"
                    src={image}
                    alt="A picture of room"
                />
            </div>
            <AttributeText title="Cost">
                <AttributeValue icon={faMoneyBill} value={moneyConverter(giaPhong)} />
            </AttributeText>
        </section>
    )
}

function InfoSection({info: {
    id,
    tenLoai,
    gioiTinh,
    soGiuong,
}}) {
    return (
        <section className="relative w-full ">
            <AttributeText title="Room ID">
                <span className="text-5xl text-primary font-bold">
                    {id}
                </span>
            </AttributeText>
            <AttributeText title="Type name">
                <AttributeValue icon={faDiamond} value={tenLoai} />
            </AttributeText>
            <AttributeText title="For gender">
                <AttributeValue icon={gioiTinh ? faMars : faVenus} value={gioiTinh ? 'male' : 'female' } />
            </AttributeText>
            <AttributeText title="Number of beds">
                <AttributeValue icon={faBed} value={soGiuong } />
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
}) {
    return (
        <>
        <div className="col-span-2 flex flex-col">
            <AttributeText title="Description" />
            <p className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                {info.description}
            </p>
        </div>
        </>
    )
}

 