import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import SectionRoomInfo from "./room-info.section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

const sortingButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.id > rowB.id ? 1 : -1;
            } 
            return rowA.id < rowB.id ? 1 : -1;
        }
    },
    {id: 1, text: "Type name",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.type > rowB.type ? 1 : -1;
            } 
            return rowA.type < rowB.type ? 1 : -1;
        }
    },
    {id: 2, text: "For gender",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.gender > rowB.gender ? 1 : -1;
            } 
            return rowA.gender < rowB.gender ? 1 : -1;
        }
    },
    {id: 3, text: "Number of beds",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.beds > rowB.beds ? 1 : -1;
            } 
            return rowA.beds < rowB.beds ? 1 : -1;
        }
    },
    {id: 4, text: "Current Students",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.students > rowB.students ? 1 : -1;
            } 
            return rowA.students < rowB.students ? 1 : -1;
        }
    },
    {id: 5, text: "Status",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.status > rowB.status ? 1 : -1;
            } 
            return rowA.status < rowB.status ? 1 : -1;
        }
    },
]

const rooms = [
    {id: "001", type: 0, gender: true, beds: 6, students: 5, status: 1, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "002", type: 0, gender: false, beds: 6, students: 6, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "003", type: 2, gender: true, beds: 2, students: 2, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "004", type: 1, gender: false, beds: 4, students: 4, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "005", type: 0, gender: true, beds: 6, students: 6, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "006", type: 2, gender: false, beds: 2, students: 0, status: 0, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "007", type: 2, gender: true, beds: 2, students: 2, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "008", type: 1, gender: true, beds: 4, students: 3, status: 1, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "009", type: 0, gender: false, beds: 6, students: 6, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "010", type: 1, gender: true, beds: 4, students: 4, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "011", type: 0, gender: false, beds: 6, students: 6, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "012", type: 2, gender: false, beds: 2, students: 2, status: 2, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
    {id: "013", type: 1, gender: true, beds: 4, students: 2, status: 1, imgUrl: "/rooms/basic/8.jfif", cost: 240000},
]

export default function SectionRooms() {
    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const filterValues = useContext(FilterValuesContext);
    const [viewedRoomId, setViewedRoomId] = useState(null);



    // Room Info display on info dashboard
    const viewedRoom = rooms.find(room => room.id == viewedRoomId);

    // Room array have been filtered
    const filteredRooms = rooms.filter(room => {
        const checkedID = room.id.includes(filterValues.text);
        const checkedType = filterValues.type == "all" ? true : filterValues.type == room.type + "";
        const checkedStatus = filterValues.status == "all" ? true : filterValues.status == room.status + "";

        if (checkedID && checkedType && checkedStatus )  
            return true;
        return false;
    });
    // Filtered Room array have been sorted by order button
    filteredRooms.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    });


    return (
        <div className="h-full w-full p-4 flex flex-col">
        {viewedRoomId != null 
        
        ?   <SectionRoomInfo 
                info={viewedRoom}
                setViewedId={setViewedRoomId} />
        :
            <SectionRoomList
                sortingButton={sortingButton}
                sortingButtons={sortingButtons}
                setSortingButton={setSortingButton}
                filteredRooms={filteredRooms}
                setViewedRoomId={setViewedRoomId}/>
        }            
        </div>
    )
}

function SectionRoomList({
    sortingButtons={sortingButtons},
    sortingButton={sortingButton},
    setSortingButton={setSortingButton},
    filteredRooms={filteredRooms},
    setViewedRoomId={setViewedRoomId}
}) {
    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-6 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {
            sortingButtons.map(button => 
                <OrderButtoon 
                    key={button.id}
                    button={button}
                    sortingButton={sortingButton}
                    handleClick={(id) => {
                        if (id == sortingButton.id) {
                            setSortingButton({
                                id,
                                isAsc: !sortingButton.isAsc,
                            })
                        } else {
                            setSortingButton({
                                id,
                                isAsc: true,
                            })
                        }
                    }}
                />)
        }
        </header>

        <main className="h-full w-full flex flex-col overflow-auto">
        {filteredRooms.map( room => 
            <div
                key={room.id} className="flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"  
                onClick={() => setViewedRoomId(room.id)}
            >
                <DataColumn text={room.id} />
                <DataColumn text={room.type == 0 ? "standard" : room.type == 1 ? "deluxe" : "premium"} />
                <DataColumn text={room.gender ? "Male" : "Female"}>
                {room.gender ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                </DataColumn>
                <DataColumn text={room.beds} />
                <DataColumn text={room.students} />
                <DataColumn text={room.status == 0 ? "Empty" : room.status == 1 ? "Available" : "Full"} className={"font-bold " + (room.status == 0 ? "text-violet-500" : room.status == 1 ? "text-green" : "text-orange")} />
            </div>
        )}
        </main>

        <div className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
            <button 
                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
            >
                Add
            </button>
        </div>
    </>
    )
}