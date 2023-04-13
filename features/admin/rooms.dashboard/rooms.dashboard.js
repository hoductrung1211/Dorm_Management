import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import SectionRoomInfo from "./room-info.section";
import SectionRoomEditing from "./room-editing.section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

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
        return rowA.type > rowB.type ? 1 : -1;
      }
      return rowA.type < rowB.type ? 1 : -1;
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
    text: "Current Students",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.students > rowB.students ? 1 : -1;
      }
      return rowA.students < rowB.students ? 1 : -1;
    },
  },
  {
    id: 5,
    text: "Status",
    handleOrder: (rowA, rowB, isAsc) => {
      if (isAsc) {
        return rowA.status > rowB.status ? 1 : -1;
      }
      return rowA.status < rowB.status ? 1 : -1;
    },
  },
];

const initRooms = [
  { id: "001", typeId: "001", students: 6 },
  { id: "002", typeId: "002", students: 4 },
  { id: "003", typeId: "003", students: 1 },
  { id: "004", typeId: "004", students: 4 },
  { id: "005", typeId: "005", students: 0 },
  { id: "006", typeId: "006", students: 2 },
  { id: "007", typeId: "001", students: 6 },
  { id: "008", typeId: "002", students: 4 },
  { id: "009", typeId: "003", students: 2 },
  { id: "010", typeId: "004", students: 2 },
  { id: "011", typeId: "005", students: 2 },
  { id: "012", typeId: "006", students: 2 },
  { id: "013", typeId: "001", students: 2 },
  { id: "014", typeId: "002", students: 0 },
  { id: "015", typeId: "003", students: 4 },
  { id: "016", typeId: "004", students: 2 },
];

const roomTypes = [
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

export default function SectionRooms() {
  const [rooms, setRooms] = useState(
    initRooms.map((room) => {
      const { typeName, gender, beds, cost, imgUrl, desc } = roomTypes.find(
        (roomtype) => roomtype.id == room.typeId
      );
      return {
        ...room,
        typeName,
        gender,
        beds,
        cost,
        imgUrl,
        desc,
      };
    })
  );
  const [sortingButton, setSortingButton] = useState({
    id: 0,
    isAsc: true,
  });
  const [sectionId, setSectionId] = useState(0);
  const filterValues = useContext(FilterValuesContext);
  const [roomId, setRoomId] = useState(null);

  // Room Info display on info dashboard
  const roomInfo = rooms.find((room) => room.id == roomId);

  // Room array have been filtered
  const filteredRooms = rooms.filter((room) => {
    const checkedID = room.id.includes(filterValues.text);
    const checkedType =
      filterValues.type == "all" ? true : filterValues.type == room.type + "";
    const checkedStatus =
      filterValues.status == "all"
        ? true
        : filterValues.status == room.status + "";

    if (checkedID && checkedType && checkedStatus) return true;
    return false;
  });

  // Sorting filtered Room array by order button
  filteredRooms.sort((rowA, rowB) => {
    const sortCB = sortingButtons.find(
      (btn) => btn.id == sortingButton.id
    ).handleOrder;

    return sortCB(rowA, rowB, sortingButton.isAsc);
  });

  // Call API with PUT status, after that update the state
  function handleUpdateRoom(roomId, typeId) {
    initRooms.find((room) => room.id == roomId).typeId = typeId;
    setRooms(
        initRooms.map((room) => {
            const { typeName, gender, beds, cost, imgUrl, desc } = roomTypes.find(
            (roomtype) => roomtype.id == room.typeId
            );

            return {
                ...room,
                typeName,
                gender,
                beds,
                cost,
                imgUrl,
                desc,
            };
        })
    );
  }

  const displaySections = [
    {
      id: 0,
      section: (
        <SectionRoomList
          sortingButton={sortingButton}
          sortingButtons={sortingButtons}
          setSortingButton={setSortingButton}
          filteredRooms={filteredRooms}
          setRoomId={setRoomId}
          setSectionId={setSectionId}
        />
      ),
    },
    {
      id: 1,
      section: (
        <SectionRoomInfo
          info={roomInfo}
          setViewedId={setRoomId}
          setSectionId={setSectionId}
        />
      ),
    },
    {
      id: 2,
      section: (
        <SectionRoomEditing
          info={roomInfo}
          setSectionId={setSectionId}
          roomTypeList={roomTypes}
          handleUpdateRoom={handleUpdateRoom}
        />
      ),
    },
  ];
  const section = displaySections.find((st) => st.id == sectionId).section;

  return <div className="h-full w-full p-4 flex flex-col">{section}</div>;
}

function SectionRoomList({
  sortingButtons,
  sortingButton,
  setSortingButton,
  filteredRooms,
  setRoomId,
  setSectionId,
}) {
  return (
    <>
      <header className="flex-shrink-0 grid grid-flow-col grid-cols-6 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
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

      <main className="h-full w-full flex flex-col overflow-auto">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
            onClick={() => {
              setRoomId(room.id);
              setSectionId(1);
            }}
          >
            <DataColumn text={room.id} />
            <DataColumn text={room.typeName} />
            <DataColumn text={room.gender ? "Male" : "Female"}>
              {room.gender ? (
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
            <DataColumn text={room.beds} />
            <DataColumn text={room.students} />
            <DataColumn
              text={
                room.beds == room.students
                  ? "Full"
                  : room.students == 0
                  ? "Empty"
                  : "Available"
              }
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
