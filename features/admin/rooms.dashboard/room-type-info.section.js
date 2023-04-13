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
    setViewedId,
}) {
    return (
        <>
            
            <SectionInfoHeader 
                title="Room Detail" 
                setViewedId={setViewedId} />

            <main className="flex flex-col h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
                <section className="w-full flex gap-3">
                    <ImageSection info={info} />
                    <InfoSection info={info} />
                    <ActionsSection>
                        <ActionButton title="Edit" />
                        <ActionButton title="Delete" bgRed={true} />
                        <ActionButton title="Show all rooms (12)" />
                    </ActionsSection>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <DescriptionSection />
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

function ImageSection({ info: {imgUrl, cost}}) {
    return (
        <section className="w-full">
            <div className="relative w-10/12 aspect-square">
                <Image
                    className="object-cover rounded-lg"
                    src={imgUrl}
                    alt="A picture of room"
                    fill
                />
            </div>
            <AttributeText title="Cost">
                <AttributeValue icon={faMoneyBill} value={moneyConverter(cost)} />
            </AttributeText>
        </section>
    )
}

function InfoSection({info: {
    id,
    type,
    gender,
    beds,
}}) {
    return (
        <section className="relative w-full ">
            <AttributeText title="Room ID">
                <span className="text-5xl text-primary font-bold">
                    {id}
                </span>
            </AttributeText>
            <AttributeText title="Type name">
                <AttributeValue icon={faDiamond} value={type == 0 ? 'standard' : type == 1 ? 'deluxe' : 'premium'} />
            </AttributeText>
            <AttributeText title="For gender">
                <AttributeValue icon={gender ? faMars : faVenus} value={gender ? 'male' : 'female' } />
            </AttributeText>
            <AttributeText title="Number of beds">
                <AttributeValue icon={faBed} value={beds } />
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

}) {
    return (
        <>
        <div className="col-span-2 flex flex-col">
            <AttributeText title="Analysis" />
            <p className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.
            </p>
        </div>
        </>
    )
}

 