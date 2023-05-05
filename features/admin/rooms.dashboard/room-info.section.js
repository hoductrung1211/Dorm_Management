import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faDiamond, faMars, faMoneyBill, faVenus, faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from '../../ui/attribute-text';
import AttributeValue from '../../ui/attribute-value';
import ActionButton from "../../ui/button-action";
import {moneyConverter} from '../../utils/convert';
import SectionInfoHeader from "../../layouts/info-header.section";

export default function SectionRoomInfo({
    info,
    setSectionId,
    handleDeleteRoom,
}) {
    info= info.phongKTX
    return (
        <>
            <SectionInfoHeader 
                title="Room Detail" 
                handleOut={() => setSectionId(0)} />

            <main className="flex flex-col h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
                <section className="w-full flex gap-3">
                    <ImageSection imgUrl={info.loaiKTX.image}
                                    cost={info.loaiKTX.giaPhong} />
                    <InfoSection info={info} />
                    <ActionsSection>
                        <ActionButton 
                            title="Edit"
                            handleClick={() => setSectionId(2)}    
                        />
                        <ActionButton 
                            title={
                                info.trangThai ? "Delete" : "Restore"
                            } 
                            bgRed={true}
                            handleClick={() => {
                                let result = confirm("Do you really want to delete this room?");
                                if (result) {
                                    handleDeleteRoom(info.id)
                                    setSectionId(0);
                                }
                            }}
                        />
                        <ActionButton title="Show all students (4)" />
                    </ActionsSection>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <AnalysisSection />

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

function ImageSection({imgUrl, cost}) {
    return (
        <section className="w-full">
            <div className="relative w-10/12 aspect-square">
                <img src={imgUrl}  alt="A picture of room" className="object-cover rounded-lg"/>
                {/* <Image
                    className="object-cover rounded-lg"
                    src={imgUrl}
                    alt="A picture of room"
                    fill
                /> */}
            </div>
            <AttributeText title="Cost">
                <AttributeValue icon={faMoneyBill} value={moneyConverter(cost)} />
            </AttributeText>
        </section>
    )
}

function InfoSection({info}) {
    
    return (
        <section className="relative w-full ">
            <AttributeText title="Room ID">
                <span className="text-5xl text-primary font-bold">
                    {info.id}
                </span>
            </AttributeText>
            <AttributeText title="Type name">
                <AttributeValue icon={faDiamond} value={info.loaiKTX.tenLoai} />
            </AttributeText>
            <AttributeText title="For gender">
                <AttributeValue icon={info.loaiKTX.gioiTinh ? faMars : faVenus} value={info.loaiKTX.gioiTinh ? 'male' : 'female' } />
            </AttributeText>
            <AttributeText title="Number of beds">
                <AttributeValue icon={faBed} value={info.loaiKTX.soGiuong } />
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

function AnalysisSection({

}) {
    return (
        <>
        <div className="col-span-2 flex flex-col">
            <AttributeText title="Analysis" />
            <div className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                <AnalysisField text="Total students" />
                <AnalysisField text="Total used electricity" />
                <AnalysisField text="Total used water" />
            </div>
        </div>
        </>
    )
}

function AnalysisField({
    text,
}) {
    return (
        <div className="h-full flex gap-3 items-center">
            <h6 className="flex-shrink-0 text-lg w-1/2">{text}:</h6>
            <ActionButton title="Show more" />
        </div>
    )
}