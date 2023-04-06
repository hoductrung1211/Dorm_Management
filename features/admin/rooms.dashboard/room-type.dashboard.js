import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderButtoon from "../../ui/button-order"; 
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import SectionRoomTypeInfo from "./room-type-info.section";
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
                return rowA.typeName > rowB.typeName ? 1 : -1;
            } 
            return rowA.typeName < rowB.typeName ? 1 : -1;
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
    {id: 4, text: "Cost per month",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.cost > rowB.cost ? 1 : -1;
            } 
            return rowA.cost < rowB.cost ? 1 : -1;
        }
    },
   
]

const roomTypes = [
    {id: "001", typeName: "standard", gender: true, beds: 6, cost: 240000},
    {id: "002", typeName: "standard", gender: false, beds: 6, cost: 240000},
    {id: "003", typeName: "deluxe", gender: true, beds: 4, cost: 360000},
    {id: "004", typeName: "deluxe", gender: false, beds: 4, cost: 360000},
    {id: "005", typeName: "premium", gender: true, beds: 2,cost: 420000}, 
    {id: "006", typeName: "premium", gender: false, beds: 2,cost: 420000}, 
]

export default function SectionRoomTypes() {
    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const [viewedRoomTypeId, setViewedRoomTypeId] = useState(null);
    // Room Info display on info dashboard
    const viewedRoomType = roomTypes.find(roomType => roomType.id == viewedRoomTypeId);


    // Filtered RoomType array have been sorted by order button
    roomTypes.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    });

    return (
        <div className="h-full w-full p-4 flex flex-col">
        {viewedRoomTypeId != null 

        ? <SectionRoomTypeInfo 
            info={viewedRoomType}
            setViewedId={setViewedRoomTypeId} />
        : <SectionRoomTypeList
            sortingButton={sortingButton}
            sortingButtons={sortingButtons}
            setSortingButton={setSortingButton}
            roomTypes={roomTypes}
            setViewedRoomTypeId={setViewedRoomTypeId} />
        }
        </div>
    ) 
}


function SectionRoomTypeList({
    sortingButtons,
    sortingButton,
    setSortingButton,
    roomTypes,
    setViewedRoomTypeId,
}) {
    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
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

        <main className="h-full w-full flex flex-col  overflow-auto">
        {roomTypes.map( roomType => 
            <div 
                key={roomType.id} className="flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
                onClick={() => setViewedRoomTypeId(roomType.id)}
            >
                <DataColumn text={roomType.id} />
                <DataColumn text={roomType.typeName} />
                <DataColumn text={roomType.gender ? "Male" : "Female"}>
                {roomType.gender ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                </DataColumn>
                <DataColumn text={roomType.beds} />
                <DataColumn text={moneyConverter(roomType.cost)} className="font-bold" />
            </div>
        )}
        </main>

        <div className="flex-shrink-0 w-full h-14 pt-2 text-end ">
            <button 
                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
            >
                Add
            </button>
        </div>
    </>
    )
}