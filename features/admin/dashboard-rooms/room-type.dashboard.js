import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderButtoon from "../../ui/button-order"; 
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";

const orderButtons = [
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
    const [orderButton, setOrderButton] = useState({
        id: 0,
        isAsc: true,
    });

    roomTypes.sort((rowA, rowB) => {
        const sortCB = orderButtons.find(btn => btn.id == orderButton.id).handleOrder;

        return sortCB(rowA, rowB, orderButton.isAsc);
    });

    return (
        <div className="h-full w-full p-4 flex flex-col">
            <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
            {
                orderButtons.map(button => 
                    <OrderButtoon 
                        button={button}
                        orderButton={orderButton}
                        handleClick={(id) => {
                            if (id == orderButton.id) {
                                setOrderButton({
                                    id,
                                    isAsc: !orderButton.isAsc,
                                })
                            } else {
                                setOrderButton({
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
                >
                    <DataColumn text={roomType.id} />
                    <DataColumn text={roomType.typeName} />
                    <DataColumn text={roomType.gender ? "Male" : "Female"} />
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
        </div>
    ) 
}


