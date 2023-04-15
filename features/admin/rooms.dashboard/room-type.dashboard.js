import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderButtoon from "../../ui/button-order";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import SectionRoomTypeEditing from "./room-type-editing.section";
import SectionRoomTypeInfo from "./room-type-info.section";
import SectionAddingRoom from "./room-type-adding.section";

const sortingButtons = [
  {id: 0,text: "ID" },
  {id: 1,text: "Type name" },
  {id: 2,text: "For gender" },
  {id: 3,text: "Number of beds" },
  {id: 4,text: "Cost per month" },
];

const initRoomTypes = [
  {
    id: "001",
    typeName: "standard",
    gender: true,
    beds: 6,
    cost: 240000,
    imgUrl: "/rooms/basic/8.jfif",
    desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.",
  },
  {
    id: "002",
    typeName: "standard",
    gender: false,
    beds: 6,
    cost: 240000,
    imgUrl: "/rooms/basic/13.jfif",
    desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.",
  },
  {
    id: "003",
    typeName: "deluxe",
    gender: true,
    beds: 4,
    cost: 360000,
    imgUrl: "/rooms/medium/8.jfif",
    desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.",
  },
  {
    id: "004",
    typeName: "deluxe",
    gender: false,
    beds: 4,
    cost: 360000,
    imgUrl: "/rooms/medium/12.jfif",
    desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.",
  },
  {
    id: "005",
    typeName: "premium",
    gender: true,
    beds: 2,
    cost: 420000,
    imgUrl: "/rooms/highend/4.jfif",
    desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.",
  },
  {
    id: "006",
    typeName: "premium",
    gender: false,
    beds: 2,
    cost: 420000,
    imgUrl: "/rooms/highend/5.jfif",
    desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.",
  },
];

export default function SectionRoomTypes() {
  const [roomTypes, setRoomTypes] = useState(initRoomTypes);
  const [sectionId, setSectionId] = useState(0);
  const [roomTypeInfoId, setRoomTypeInfoId] = useState(0);

  const roomTypeInfo = roomTypes.find(
    (roomType) => roomType.id == roomTypeInfoId
  );
 

  function handleUpdateInfo(updatedInfo) {
    setRoomTypes(
      roomTypes.map((roomType) => {
        if (roomType.id == updatedInfo.id) return updatedInfo;
        return roomType;
      })
    );
  }
  function handleDeleteRoomType(roomTypeId) {
    setRoomTypes(roomTypes.filter((roomtype) => roomtype.id !== roomTypeId));
  }

  function handleShowMore() {
    
  }


  const displaySections = [
    {
      id: 0,
      section: (
        <SectionRoomTypeList 
          roomTypes={roomTypes}
          setRoomTypeInfoId={setRoomTypeInfoId}
          setSectionId={setSectionId}
          handleShowMore={handleShowMore}
        />
      ),
    },
    {
      id: 1,
      section: (
        <SectionRoomTypeInfo
          info={roomTypeInfo}
          setSectionId={setSectionId}
          handleDeleteRoomType={handleDeleteRoomType}
        />
      ),
    },
    {
      id: 2,
      section: (
        <SectionRoomTypeEditing
          info={roomTypeInfo}
          handleUpdateInfo={handleUpdateInfo}
          setSectionId={setSectionId}
        />
      ),
    },
    {
      id: 3,
      section: (
        <SectionAddingRoom
          info={roomTypeInfo}
          handleAddingRoomType={(data) => {
            initRoomTypes.push({
              id: "new room type",
              ...data,
            });

            setRoomTypes(initRoomTypes);
          }}
          setSectionId={setSectionId}
        />
      ),
    },
  ];
  const section = displaySections.find((st) => st.id == sectionId).section;

  return <div className="h-full w-full p-4 flex flex-col">{section}</div>;
}

function SectionRoomTypeList({ 
  roomTypes,
  setRoomTypeInfoId,
  setSectionId,
  handleShowMore,
}) {
  return (
    <>
      <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {sortingButtons.map((button) => (
          <OrderButtoon
            key={button.id}
            button={button}
          />
        ))}
      </header>

      <main className="h-full w-full flex flex-col  overflow-auto">
        {roomTypes.map((roomType) => (
          <div
            key={roomType.id}
            className="flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
            onClick={() => {
              setRoomTypeInfoId(roomType.id);
              setSectionId(1);
            }}
          >
            <DataColumn text={roomType.id} />
            <DataColumn text={roomType.typeName} />
            <DataColumn text={roomType.gender ? "Male" : "Female"}>
              {roomType.gender ? (
                <FontAwesomeIcon
                  icon={faMars}
                  className=" text-xl mr-1 text-primary"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faVenus}
                  className="text-xl mr-1 text-pink-500"
                />
              )}
            </DataColumn>
            <DataColumn text={roomType.beds} />
            <DataColumn
              text={moneyConverter(roomType.cost)}
              className="font-bold"
            />
          </div>
        ))}
      </main>

      <div className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
          <button 
            className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
            onClick={() => setSectionId(3)}
          >
              Add
          </button>

          <button 
              className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
              onClick={handleShowMore}
          >
              Show more
          </button>
      </div>
    </>
  );
}
