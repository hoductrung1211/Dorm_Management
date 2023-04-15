import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import SectionRoomInfo from "./room-info.section";
import SectionRoomAdding from "./room-adding.section";
import SectionRoomEditing from "./room-editing.section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

const sortingButtons = [
  {id: 0,text: "ID" },
  {id: 1,text: "Type name"},
  {id: 2,text: "For gender"},
  {id: 3,text: "Number of beds"},
  {id: 4,text: "Current Students"},
  {id: 5,text: "Status"},
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

  function handleDeleteRoom(roomId) {
    setRooms(rooms.filter((room) => room.id !== roomId));
  }


  function handleAddRoom(typeId) {
    let initId;

    while (true) {
      initId = Math.random() * 100;
      initId = parseInt(initId);
      initId = (initId + "").padStart(3, 0);

      let flag = true;

      initRooms.forEach(room => {
        if (room.id == initId)
          flag = false;
      })

      if (flag) break;
    }

    initRooms.push({
      id:  initId,
      typeId: typeId,
      students: 0,
    })

    setRooms(initRooms.map((room) => {
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
        }})
    );
  }


  const displaySections = [
    {
      id: 0,
      section: (
        <SectionRoomList 
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
          handleDeleteRoom={handleDeleteRoom}
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
    {
      id: 3,
      section: (
        <SectionRoomAdding
          setSectionId={setSectionId}
          roomTypeList={roomTypes}
          handleAddRoom={handleAddRoom}
        />
      )
    }
  ];
  const section = displaySections.find((st) => st.id == sectionId).section;

  return <div className="h-full w-full p-4 flex flex-col">{section}</div>;
}

function SectionRoomList({ 
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
        <button 
          className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
          onClick={() => {
            setSectionId(3);
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}
