import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { faBolt, faFaucetDrip, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sortingButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.id > rowB.id ? 1 : -1;
            } 
            return rowA.id < rowB.id ? 1 : -1;
        }
    },
    {id: 1, text: "Room ID",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.roomId > rowB.roomId ? 1 : -1;
            } 
            return rowA.roomId < rowB.roomId ? 1 : -1;
        }
    },
    {id: 2, text: "Date",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.date > rowB.date ? 1 : -1;
            } 
            return rowA.date < rowB.date ? 1 : -1;
        }
    },
    {id: 3, text: "Comsumption",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.comsumption > rowB.comsumption ? 1 : -1;
            } 
            return rowA.comsumption < rowB.comsumption ? 1 : -1;
        }
    },
    {id: 4, text: "Total Cost",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.cost > rowB.cost ? 1 : -1;
            } 
            return rowA.cost < rowB.cost ? 1 : -1;
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

const invoices = [
    {id: "001", roomId: "010", date: "03/02/2023", comsumption: 50, cost: 270000, type: false, status: true},
    {id: "002", roomId: "011", date: "03/03/2023", comsumption: 60, cost: 250000, type: true, status: false},
    {id: "003", roomId: "002", date: "03/03/2023", comsumption: 70, cost: 270000, type: false, status: false},
    {id: "004", roomId: "001", date: "03/04/2023", comsumption: 60, cost: 250000, type: true, status: true},
    {id: "005", roomId: "011", date: "03/04/2023", comsumption: 50, cost: 270000, type: false, status: false},
    {id: "006", roomId: "022", date: "03/03/2023", comsumption: 50, cost: 240000, type: true, status: false},
    {id: "007", roomId: "014", date: "03/03/2023", comsumption: 70, cost: 250000, type: false, status: true},
    {id: "008", roomId: "004", date: "03/04/2023", comsumption: 50, cost: 240000, type: true, status: false},
    {id: "009", roomId: "005", date: "03/04/2023", comsumption: 70, cost: 250000, type: false, status: false},
    {id: "010", roomId: "002", date: "03/03/2023", comsumption: 60, cost: 240000, type: true, status: true},
    {id: "011", roomId: "014", date: "03/03/2023", comsumption: 70, cost: 240000, type: false, status: false},
    {id: "012", roomId: "002", date: "03/02/2023", comsumption: 50, cost: 270000, type: true, status: true},
    {id: "013", roomId: "003", date: "03/02/2023", comsumption: 60, cost: 250000, type: false, status: false},
]

export default function SectionInvoices() {
    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const filterValues = useContext(FilterValuesContext);
    const [viewedInvoiceId, setViewedInvoiceId] = useState(null);



    // Room Info display on info dashboard
    const viewedInvoice = invoices.find(invoice => invoice.id == viewedInvoiceId);

    // Room array have been filtered
    const filteredInvoices = invoices.filter(invoice => {
        const checkedID = invoice.id.includes(filterValues.text);
        const checkedRoomID = invoice.roomId.includes(filterValues.text);
        const checkedType = filterValues.type == "all" ? true : filterValues.type == invoice.type + "";
        const checkedStatus = filterValues.status == "all" ? true : filterValues.status == invoice.status + "";

        if ((checkedID|| checkedRoomID) && checkedType && checkedStatus )  
            return true;
        return false;
    });
    // Filtered Room array have been sorted by order button
    filteredInvoices.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    });


    return (
        <div className="h-full w-full p-4 flex flex-col">
        {viewedInvoiceId != null 
        
        ?   null
        :
            <SectionRoomList
                isLoading={isLoading} // For Syncing
                setIsLoading={setIsLoading} // For syncing

                sortingButtons={sortingButtons}
                sortingButton={sortingButton} 
                setSortingButton={setSortingButton}
                
                filteredInvoices={filteredInvoices}
                
                setViewedRoomId={setViewedInvoiceId}
            />
        }            
        </div>
    )
}

function SectionRoomList({
    isLoading, setIsLoading,
    sortingButtons, setSortingButton, sortingButton ,
    filteredInvoices ,
    setViewedRoomId ,
}) {
    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-6 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {
            sortingButtons.map(button => 
                <OrderButtoon 
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
        {filteredInvoices.map( room => 
            <div 
                key={room.id} className="flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"  
                onClick={() => setViewedRoomId(room.id)}
            >
                <DataColumn text={room.id} />
                <DataColumn text={room.roomId} />
                <DataColumn text={room.date} />
                <DataColumn text={room.comsumption + (room.type ? " kW" : " m3")} className="  font-bold ">
                    {room.type ? <FontAwesomeIcon icon={faBolt} className="text-xl text-orange-400 mr-1" /> : <FontAwesomeIcon icon={faFaucetDrip} className="text-xl text-primary mr-1" />}
                </DataColumn>
                <DataColumn text={moneyConverter(room.cost)} />
                <DataColumn text={room.status ? "Paid" : "Unpaid"} className={" font-bold " + (room.status ? " text-green" : " text-orange-400") } />
 
            </div>
        )}
        </main>

        <div className="flex-shrink-0 w-full h-14 pt-2 text-end ">
            <button 
                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
                onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 1000)
                }}
            >
                Sync
                {isLoading && <FontAwesomeIcon className="ml-4 animate-spin" icon={faRotate} />}
            </button>
        </div>
    </>
    )
}