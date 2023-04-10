import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderButtoon from "../../ui/button-order";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import SectionRoomTypeEditing from "./room-type-editing.section";
import SectionRoomTypeInfo from "./room-type-info.section";

const sortingButtons = [
  {
    id: 0,
    text: "ID",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.id > rowB.id ? 1 : -1;
      }
      return rowA.id < rowB.id ? 1 : -1;
    },
  },
  {
    id: 1,
    text: "Type name",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.typeName > rowB.typeName ? 1 : -1;
      }
      return rowA.typeName < rowB.typeName ? 1 : -1;
    },
  },
  {
    id: 2,
    text: "For gender",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.gender > rowB.gender ? 1 : -1;
      }
      return rowA.gender < rowB.gender ? 1 : -1;
    },
  },
  {
    id: 3,
    text: "Number of beds",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.beds > rowB.beds ? 1 : -1;
      }
      return rowA.beds < rowB.beds ? 1 : -1;
    },
  },
  {
    id: 4,
    text: "Cost per month",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.cost > rowB.cost ? 1 : -1;
      }
      return rowA.cost < rowB.cost ? 1 : -1;
    },
  },
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
  const [sortingButton, setSortingButton] = useState({
    id: 0,
    isAsc: true,
  });
  const [sectionId, setSectionId] = useState(0);
  const [roomTypeInfoId, setRoomTypeInfoId] = useState(0);

  const roomTypeInfo = roomTypes.find(
    (roomType) => roomType.id == roomTypeInfoId
  );
  // Sorting Filtered RoomType array by order button
  roomTypes.sort((rowA, rowB) => {
    const sortCB = sortingButtons.find(
      (btn) => btn.id == sortingButton.id
    ).handleOrder;

    return sortCB(rowA, rowB, sortingButton.isAsc);
  });

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

  const displaySections = [
    {
      id: 0,
      section: (
        <SectionRoomTypeList
          sortingButton={sortingButton}
          sortingButtons={sortingButtons}
          setSortingButton={setSortingButton}
          roomTypes={roomTypes}
          setRoomTypeInfoId={setRoomTypeInfoId}
          setSectionId={setSectionId}
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
  ];
  const section = displaySections.find((st) => st.id == sectionId).section;

  return <div className="h-full w-full p-4 flex flex-col">{section}</div>;
}

function SectionRoomTypeList({
  sortingButtons,
  sortingButton,
  setSortingButton,
  roomTypes,
  setRoomTypeInfoId,
  setSectionId,
}) {
  return (
    <>
      <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {sortingButtons.map((button) => (
          <OrderButtoon
            key={button.id}
            button={button}
            sortingButton={sortingButton}
            handleClick={(id) => {
              if (id == sortingButton.id) {
                setSortingButton({
                  id,
                  isAsc: !sortingButton.isAsc,
                });
              } else {
                setSortingButton({
                  id,
                  isAsc: true,
                });
              }
            }}
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
        <button className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition">
          Add
        </button>
      </div>
    </>
  );
}
