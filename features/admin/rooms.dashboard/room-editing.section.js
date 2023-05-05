import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faDiamond,
  faMars,
  faMoneyBill,
  faVenus,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from "../../ui/attribute-text";
import AttributeValue from "../../ui/attribute-value";
import ActionButton from "../../ui/button-action";
import { moneyConverter } from "../../utils/convert";
import SectionInfoHeader from "../../layouts/info-header.section";
import SelectEditing from "../../ui/select-editing";
import { useState } from "react";

export default function SectionRoomEditing({
  info,
  roomTypeList,
  setSectionId,
  handleUpdateRoom,
}) {
  info= info.phongKTX
  const [roomTypeId, setRoomTypeId] = useState(info.idLoaiKTX);
  const roomTypeInfo = roomTypeList.find(
    (roomType) => roomType.id == roomTypeId
  ); 
  return (
    <>
      <SectionInfoHeader
        title="Room Detail Editing"
        handleOut={() => setSectionId(0)}
      />

      <main className="flex flex-col justify-between h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
        <section className="w-full flex gap-3">
          <ImageSection roomTypeInfo={roomTypeInfo} />
          <InfoSection
            info={info}
            roomTypeList={roomTypeList}
            roomTypeInfo={roomTypeInfo}
            setRoomTypeId={setRoomTypeId}
          />
          <ActionsSection>
            <ActionButton 
                title="Save"
                handleClick={() => {
                    const result = confirm("Do you really want to save the changes?");
                    if (result) {
                        handleUpdateRoom(info.id, roomTypeId);
                        setSectionId(1);
                    }
                }}    
            />
            <ActionButton 
                title="Cancel"
                handleClick={() => {
                    const result = confirm("Don't you want to save the changes?");
                    if (result) {
                        setSectionId(1);
                    }
                }}    
            />
          </ActionsSection>
        </section>

        <section className=" w-full ">
          <h4 className=" text-red mb-2 text-xl font-bold">
            Important
            <FontAwesomeIcon icon={faWarning} className="ml-2 text-2xl" />
          </h4>
          <p>
            When you editing or deleting this room, make sure that there is no
            students related to this type!
          </p>
        </section>
      </main>
    </>
  );
}

function ImageSection({ roomTypeInfo }) {
  return (
    <section className="w-full">
      <div className="relative w-10/12 aspect-square">
        {/* <Image
            className="object-cover rounded-lg"
            
            alt="A picture of room"
            fill
        /> */}
        <img src={roomTypeInfo.image} alt="A picture of room" className="object-cover rounded-lg"/>
      </div>
      <AttributeText title="Cost">
        <AttributeValue
            icon={faMoneyBill}
            value={moneyConverter(roomTypeInfo.giaPhong)}
        />
      </AttributeText>
    </section>
  );
}

function InfoSection({
  info: { id },
  roomTypeList,
  roomTypeInfo,
  setRoomTypeId,
}) {
  return (
    <section className="relative w-full ">
      <AttributeText title="Room ID">
        <span className="text-5xl text-primary font-bold">{id}</span>
      </AttributeText>
      <AttributeText title="Room Type ID">
        <SelectEditing
          icon={faDiamond}
          options={roomTypeList.map((roomType) => ({
            value: roomType.id,
            text:
              roomType.id +
              " " +
              roomType.tenLoai +
              " " +
              (roomType.gioiTinh ? "male" : "female"),
          }))}
          value={roomTypeInfo.id}
          handleChange={(nextRoomTypeId) => {
            setRoomTypeId(nextRoomTypeId);
          }}
        />
      </AttributeText>
      <AttributeText title="Type name">
        <AttributeValue icon={faDiamond} value={roomTypeInfo.tenLoai} />
      </AttributeText>
      <AttributeText title="For gender">
        <AttributeValue
          icon={roomTypeInfo.gioiTinh ? faMars : faVenus}
          value={roomTypeInfo.gioiTinh ? "male" : "female"}
        />
      </AttributeText>
      <AttributeText title="Number of beds">
        <AttributeValue icon={faBed} value={roomTypeInfo.soGiuong} />
      </AttributeText>
    </section>
  );
}

function ActionsSection({ children }) {
  return (
    <section className="w-full flex flex-col">
      <AttributeText title="Actions">
        <div className="flex flex-col h-full gap-3 p-3 border-2 border-ec rounded-md">
          {children}
        </div>
      </AttributeText>
    </section>
  );
}
