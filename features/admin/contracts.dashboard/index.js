import { useState, useEffect, useContext } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import DataColumn from "../../ui/data.column";
import {moneyConverter} from '../../utils/convert'; 
import MGMTService from "../../../pages/api/service/MGMT-ContractService"
import { alertContext } from "../../utils/alert.context";

const sortingButtons = [
    {id: 0, text: "ID"}, 
    {id: 1, text: "Student ID" }, 
    {id: 2, text: "Room ID" }, 
    {id: 3, text: "Date" },
    {id: 4, text: "Total Cost" },
    {id: 5, text: "Status" }
]



export default function ContractDashboard() {
    const [contracts, setContracts] = useState([]);
    // const showAlert = useContext(alertContext);

    const [filterValues, setFilterValues] = useState({
        id: "",
        studentId: "",
        roomId: "all",
        gender: "all",
        status: 'all',
    });
    const [selectedRowID, setSelectedRowID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rooms, setRooms] = useState([])
    const [terms, setTerms] = useState([])
    // data dropdown
    const [status, setStatus] = useState(false)
    const [idRoom, setIdRoom] = useState(0)
    const [idTerm, setIdTerm] = useState(0)
    const [elements, setElements] = useState(10)
    // Search box 
    const [textValue, setTextValue] = useState('')

    function loadAllContract(elm, idRoom, idTerm, status ){
        if(elm===undefined)
            elm=elements
        
        MGMTService.getListContract(elm, idRoom, idTerm, status).then(res=>{
            setContracts(res.data)
                
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }
    function loadDropDownTerm(){
        MGMTService.getListTerm().then(res=>{        
            setTerms(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }
    function loadDropDownIdRoom(status){
        MGMTService.getListIdRoom(status).then(res=>{        
            setRooms(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }
    function selectedIdRoom(id){
        setIdRoom(id)
        loadAllContract(elements, id, idTerm, status)
    }
    function selectedTerm(term){
        setIdTerm(term)
        loadAllContract(elements, idRoom, term, status)
    }
    function selectedStatus(stt){
        setStatus(stt)
        loadDropDownIdRoom(stt)
        loadAllContract(elements, idRoom, idTerm, stt)
    }
    function valueSearching(text){
        setTextValue(text)
        if(text.length==0){
            loadAllContract()
        }
        else{
            MGMTService.searchListContract(text).then((res)=>{
                setContracts(res.data)
            }).catch((error)=>{
                
                if(error.response){
                    console.log(error.response.data)
                }
            })
        }
        
    }
    useEffect(()=>{
        loadAllContract()
        loadDropDownIdRoom(status)
        loadDropDownTerm()
    },[])

    const rowClassName = " flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa ";
    const seletectRowClassName = rowClassName + " bg-fa border-l-2 border-r-2 "
    const selectedRow = selectedRowID == null ? null : contracts.find(invoice => invoice.id == selectedRowID);

    function handleSelectRow(nextID) {
        if (nextID == selectedRowID)
            nextID = null;
        setSelectedRowID(nextID);
    }
    function handleMarkStatus() {
        MGMTService.updateStatusContract(selectedRow.id).then(res=>{
            console.log(res.data)
            loadAllContract()
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }

    function handleShowMore() {
        loadAllContract(elements+5, idRoom, idTerm, status)
        setElements(elements+5)
    }

    return (
        <>
            {/* *** Header contains filter fields *** */}
            <HeaderSection> 
                <SectionFilter 
                    rooms={rooms}
                    selectedIdRoom={selectedIdRoom}
                    terms={terms}
                    selectedTerm={selectedTerm}
                    selectedStatus={selectedStatus}
                    valueSearching={valueSearching}
                    textValue={textValue}
                    />
            </HeaderSection>


            
            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
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
                        
                        {/* contract info rows */}
                        <main className="h-full w-full flex flex-col overflow-auto">
                        {contracts.map( contract => 
                            <div 
                                key={contract.id} className={selectedRowID == contract.id ? seletectRowClassName : rowClassName}
                                onClick={() => handleSelectRow(contract.id)}
                            >
                                <DataColumn text={contract.id} /> 
                                <DataColumn text={contract.mssv} /> 
                                <DataColumn text={contract.idPhongKTX} /> 
                                <DataColumn text={contract.ngayLamDon} />   
                                <DataColumn text={moneyConverter(contract.tongTien)} />
                                <DataColumn text={contract.trangThai ? "Paid" : "Unpaid"} className={"font-bold " + (contract.trangThai ? " text-green " : " text-b")} />
                            </div>
                        )}
                        </main>
                        
                        {/* Bottom */}
                        <footer className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
                            <button 
                                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
                                onClick={() => {
                                    setIsLoading(true);
                                    
                                    setTimeout(() => {
                                        setIsLoading(false)
                                        loadAllContract()
                                    }, 700)

                                }}
                            >
                                Reload
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
                </Container>
            </div>
        </>
    )
}
 

function SectionFilter({
    rooms,
    terms,
    selectedStatus,
    selectedIdRoom,
    selectedTerm,
    textValue,
    valueSearching,
}) {
    
    
    return (
        <section className="grid grid-cols-4 h-full gap-4 grow">

            <InputFilter
                textValue={textValue}
                handleTextChange={nextText => {
                    valueSearching(nextText)
                }}
                placeholder="Type student ID or ID here.."
            />
  
            <FilterSelection
                title="Room"
                options={
                    [
                        {text: "All", value: "0"},
                        ...rooms.map(room => ({
                            text: room.id,
                            value: room.id,
                        }))
                    ]
                    
                }
                handleChangeSelection={idRoom => {
                    selectedIdRoom(idRoom)
                  
                }}
            />

            <FilterSelection
                title="Term"
                options={
                    [
                        {text: "All", value: "0"},
                        ...terms.map(term => ({
                            text: term.ngayMoDangKy,
                            value: term.id,
                        }))
                    ]
                    
                }
                handleChangeSelection={term => {
                    selectedTerm(term)
                    
                }}
            />

            <FilterSelection
                title="Status"
                options={[
                    {text: "Unpaid", value: false},
                    {text: "Paid", value: true},
                ]}
                handleChangeSelection={stt => {
                    selectedStatus(stt)
                }}
            />
 
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