import { useContext, useState, useEffect } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { faBolt, faFaucetDrip, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MGMTService from "../../../pages/api/service/MGMT-InvoicesService"

const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Room ID" },
    {id: 2, text: "Date" },
    {id: 3, text: "Comsumption" },
    {id: 4, text: "Total Cost" },
    {id: 5, text: "Status" },
]



export default function SectionInvoices() {
    const [invoices, setInvoices] = useState([]);
    const filterValues = useContext(FilterValuesContext);
    const [typeOfInvoices, setTypeOfInvoices]= useState(undefined)
    const typeOf=JSON.parse(filterValues.type)
    

    function loadListInvoices(){
        try{
            typeOf ?
                MGMTService.getListElectric(1, JSON.parse(filterValues.month), JSON.parse(filterValues.year), filterValues.status).then(res=>{
                    setInvoices(res.data)
                    setTypeOfInvoices(true)
                })
            :
                MGMTService.getListWater().then(res=>{
                    setInvoices(res.data)
                    setTypeOfInvoices(false)
                })
        }catch(error){
            if(error.response){
                console.log(error.response.data)
            }
        }
    }

    useEffect(()=>{
        loadListInvoices()
    },[filterValues, invoices])

    const [selectedRowID, setSelectedRowID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Room array have been filtered
    
    
    // .filter(invoice => {
    //     const checkedID = invoice.id.includes(filterValues.text);
    //     const checkedRoomID = invoice.roomId.includes(filterValues.text);
    //     const checkedType = filterValues.type == "all" ? true : filterValues.type == invoice.type + "";
    //     const status = filterValues.status == "all" ? true : invoice.status + "" ==  filterValues.status;
 
    //     if ((checkedID|| checkedRoomID) && checkedType && status )  
    //         return true;
    //     return false;
    // });
    const rowClassName = " flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa ";
    const seletectRowClassName = rowClassName + " bg-fa border-l-2 border-r-2 "
    const selectedRow = selectedRowID == null ? null : invoices.find(invoice => invoice.id == selectedRowID);

    function handleSelectRow(nextID) {
        if (nextID == selectedRowID)
            nextID = null;
        setSelectedRowID(nextID);
    }
    function handleMarkStatus() {
        try{
            typeOf ?
            MGMTService.updateElectric(selectedRowID).then(res=>{
                
                console.log(res.data)
            }) :
            MGMTService.updateWater(selectedRowID).then(res=>{
                console.log(res.data)
            })
        }catch(error){
            console.log(1111)
            console.error(error);
        }
        loadListInvoices()
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
            {invoices.map( invoice => 
                <div 
                    key={invoice.id} className={selectedRowID == invoice.id ? seletectRowClassName : rowClassName}
                    onClick={() => handleSelectRow(invoice.id)}
                >
                    <DataColumn text={invoice.id} />
                    <DataColumn text={invoice.maSoKTX} />
                    <DataColumn text={typeOfInvoices ?  (invoice.giaDienTheoThang.thang +"/"+ invoice.giaDienTheoThang.nam) :
                        (invoice.giaNuocTheoThang.thang +"/"+ invoice.giaNuocTheoThang.nam)} />
                    <DataColumn text={typeOfInvoices ? (invoice.soDienTieuThu +" kW") : (invoice.luongNuocTieuThu+" m3")} className="  font-bold ">
                        {typeOfInvoices ? <FontAwesomeIcon icon={faBolt} className="text-xl text-orange-400 mr-1" /> : <FontAwesomeIcon icon={faFaucetDrip} className="text-xl text-primary mr-1" />}
                    </DataColumn>
                    <DataColumn text={moneyConverter(invoice.total)} />
                    <DataColumn text={invoice.trangThai ? "Paid" : "Unpaid"} className={" font-bold " + (invoice.status ? " text-green" : " text-b") } />
    
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
        {selectedRow.trangThai ? "Mark Unpaid" : "Mark paid"}
        </button>
        </>
    )
}