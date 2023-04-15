import { useContext, useState } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { faBolt, faFaucetDrip, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Room ID" },
    {id: 2, text: "Date" },
    {id: 3, text: "Comsumption" },
    {id: 4, text: "Total Cost" },
    {id: 5, text: "Status" },
]

const initInvoices = [
    {id: "001", roomId: "010", month: "01", year: "2023", comsumption: 50, cost: 270000, type: false, status: true},
    {id: "002", roomId: "011", month: "01", year: "2023", comsumption: 60, cost: 250000, type: true, status: false},
    {id: "003", roomId: "002", month: "02", year: "2023", comsumption: 70, cost: 270000, type: false, status: false},
    {id: "004", roomId: "001", month: "01", year: "2023", comsumption: 60, cost: 250000, type: true, status: true},
    {id: "005", roomId: "011", month: "02", year: "2023", comsumption: 50, cost: 270000, type: false, status: false},
    {id: "006", roomId: "022", month: "02", year: "2023", comsumption: 50, cost: 240000, type: true, status: false},
    {id: "007", roomId: "014", month: "03", year: "2023", comsumption: 70, cost: 250000, type: false, status: true},
    {id: "008", roomId: "004", month: "02", year: "2023", comsumption: 50, cost: 240000, type: true, status: false},
    {id: "009", roomId: "005", month: "01", year: "2023", comsumption: 70, cost: 250000, type: false, status: false},
    {id: "010", roomId: "002", month: "02", year: "2023", comsumption: 60, cost: 240000, type: true, status: true},
    {id: "011", roomId: "014", month: "02", year: "2023", comsumption: 70, cost: 240000, type: false, status: false},
    {id: "012", roomId: "002", month: "03", year: "2023", comsumption: 50, cost: 270000, type: true, status: true},
    {id: "013", roomId: "003", month: "01", year: "2023", comsumption: 60, cost: 250000, type: false, status: false},
]

export default function SectionInvoices() {
    const [invoices, setInvoices] = useState(initInvoices.map(invoice => {
        return {
            ...invoice,
            date: invoice.month + "/" +  invoice.year,
        }
    }));
    const filterValues = useContext(FilterValuesContext); 
    const [selectedRowID, setSelectedRowID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Room array have been filtered
    const filteredInvoices = invoices.filter(invoice => {
        const checkedID = invoice.id.includes(filterValues.text);
        const checkedRoomID = invoice.roomId.includes(filterValues.text);
        const checkedType = filterValues.type == "all" ? true : filterValues.type == invoice.type + "";
        const status = filterValues.status == "all" ? true : invoice.status + "" ==  filterValues.status;
 
        if ((checkedID|| checkedRoomID) && checkedType && status )  
            return true;
        return false;
    });
    const rowClassName = " flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa ";
    const seletectRowClassName = rowClassName + " bg-fa border-l-2 border-r-2 "
    const selectedRow = selectedRowID == null ? null : filteredInvoices.find(invoice => invoice.id == selectedRowID);

    function handleSelectRow(nextID) {
        if (nextID == selectedRowID)
            nextID = null;
        setSelectedRowID(nextID);
    }
    function handleMarkStatus() {
        setInvoices(filteredInvoices.map(invoice => {
            if (invoice.id == selectedRowID)
                return {
                    ...invoice,
                    status: !invoice.status,
                }
            return invoice;
        }));

        setSelectedRowID(null);
    }
    
    function handleShowMore() {
        
    }

    return (
        <section className="h-full w-full p-4 flex flex-col">
            <header className="flex-shrink-0 grid grid-flow-col grid-cols-6 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
            {
                sortingButtons.map(button => 
                    <OrderButtoon 
                        key={button.id}
                        button={button}
                    />)
            }
            </header>

            <main className="h-full w-full flex flex-col overflow-auto">
            {filteredInvoices.map( invoice => 
                <div 
                    key={invoice.id} className={selectedRowID == invoice.id ? seletectRowClassName : rowClassName}
                    onClick={() => handleSelectRow(invoice.id)}
                >
                    <DataColumn text={invoice.id} />
                    <DataColumn text={invoice.roomId} />
                    <DataColumn text={invoice.date} />
                    <DataColumn text={invoice.comsumption + (invoice.type ? " kW" : " m3")} className="  font-bold ">
                        {invoice.type ? <FontAwesomeIcon icon={faBolt} className="text-xl text-orange-400 mr-1" /> : <FontAwesomeIcon icon={faFaucetDrip} className="text-xl text-primary mr-1" />}
                    </DataColumn>
                    <DataColumn text={moneyConverter(invoice.cost)} />
                    <DataColumn text={invoice.status ? "Paid" : "Unpaid"} className={" font-bold " + (invoice.status ? " text-green" : " text-b") } />
    
                </div>
            )}
            </main>

            <footer className="flex-shrink-0 w-full h-14 flex gap-3 pt-2">
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
                { selectedRow && <ActionsBoard selectedRow={selectedRow} handleAction={handleMarkStatus} />}

                <button 
                    className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
                    onClick={handleShowMore}
                >
                    Show more
                </button>
            </footer>
        </section>
    )
}

function ActionsBoard({
    selectedRow,
    handleAction,
}) {
    let classname = " w-32 h-full rounded-lg  font-bold active:opacity-90 transition "
    if (selectedRow.status)
        classname += " bg-ec text-b "
    else classname += "  bg-green text-white ";
    return (
        <>
        <button 
            className={classname}
            onClick={handleAction}
        >
        {selectedRow.status ? "Mark Unpaid" : "Mark paid"}
        </button>
        </>
    )
}