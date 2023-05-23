import { useState, useEffect, useContext } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import OrderButtoon from "../../ui/button-order";  
import DataColumn from "../../ui/data.column";
import SectionAdminAdding from "./admin-adding.section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import MGMTService from "../../../pages/api/service/MGMT-Admin"
import { alertContext } from "../../utils/alert.context";

const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Full name" },
    {id: 2, text: "Mail"},
    {id: 3, text: "Gender"},
    {id: 4, text: "Role"},
]



export default function AdminDashboard() {
    const showAlert = useContext(alertContext);
    const [admins, setAdmins] = useState([]);
    const [filterValues, setFilterValues] = useState({
        username: "", 
    });
    const [sectionId, setSectionId] = useState(0);
    const [info, setInfo] = useState(null);
 
    function loadListAdmins(){
        MGMTService.listAdmins().then((res)=>{
            console.log(res.data)
            setAdmins(res.data)
        }).catch((error)=>{
                if(error.response){
                    console.log(error.response.data)
                }
            })
    }

    useEffect(()=>{
        loadListAdmins()
    },[])

    

    function handleDeleteAdmin(adminId) {
       MGMTService.deleteAccount(adminId).then(res=>{
            loadListAdmins()
            res.data ? showAlert(true,'Delete Successfully!' ) : showAlert(false,'Delete Failed!' )
       }).catch(error=>{
            showAlert(false,'Delete Failed!')
            console.log(error.response.data)
       })
    }

    // Handle adding admin here
    function handleAddingAdmin(tempInfo) {
        console.log(tempInfo)
        MGMTService.createAccount(tempInfo).then(res=>{
            console.log(res.data)
            loadListAdmins()
            setSectionId(0);
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
        
    } 

    function handleShowMore() {
        
    }

    const displaySections = [
        {
            id: 0,
            section: (
                <SectionAdminList 
                    filteredAdmins={admins}
                    handleDeleteAdmin={handleDeleteAdmin}
                    setSectionId={setSectionId}
                    setInfo={setInfo}
                    handleShowMore={handleShowMore}
                />
            )
        },
        {
            id: 1,
            section: (
                <SectionAdminAdding
                    setSectionId={setSectionId}
                    handleAddingAdmin={handleAddingAdmin}
                />
            )
        } 
    ]
    const section = displaySections.find((st) => st.id == sectionId).section;

    return (
        <>
            {/* *** Header contains filter fields *** */}
            <HeaderSection> 
                <SectionFilter 
                    filterValues={filterValues}
                    handleChangeFilterValues={setFilterValues} />
            </HeaderSection>


            
            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                    <div className="h-full w-full p-4 flex flex-col">
                     {section}
                    </div>
                </Container>
            </div>
        </>
    )
}

function SectionAdminList({ 
    filteredAdmins,
    setSectionId,
    setInfo,
    handleDeleteAdmin,
    handleShowMore,
}) {
    const [selectedRowID, setSelectedRowID] = useState(null);
    const rowClassName = " flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa ";
    const seletectRowClassName = rowClassName + " bg-fa border-l-2 border-r-2 "
    const selectedRow = selectedRowID == null ? null : filteredAdmins.find(invoice => invoice.username == selectedRowID);

    function handleSelectRow(nextID) {
        if (nextID == selectedRowID)
            nextID = null;
        setSelectedRowID(nextID);
    }

    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {
            sortingButtons.map(button => 
                <OrderButtoon
                    key={button.id}
                    button={button} 
                />)
        }
        </header>
        
        {/* admin info rows */}
        <main className="h-full w-full flex flex-col  overflow-auto">
        {filteredAdmins.map( admin => 
            <div 
                key={admin.username} className={admin.username == selectedRowID ? seletectRowClassName : rowClassName}
                onClick={() => handleSelectRow(admin.username)}
            >
                <DataColumn text={admin.username} />
                <DataColumn text={admin.hoTen} />
                <DataColumn text={admin.mail} />
                <DataColumn text={admin.gioiTinh ? "Male" : "Female"}>
                {admin.gioiTinh ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                </DataColumn>
                <DataColumn text={admin.role.roleName } />
            </div>
        )}
        </main>
        
        {/* Bottom */}
        <div className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
            <button 
                className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
                onClick={() => setSectionId(1)}
            >
                Add

            </button>

            { selectedRow && <ActionsBoard 
                handleDelete={() => handleDeleteAdmin(selectedRowID)}
                changeToEdit={() => {
                    setInfo(selectedRow)
                    setSectionId(2)
                }}    
            />}

            <button 
                className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
                onClick={handleShowMore}
            >
                Show more
            </button>
        </div>
    </>
    )
}

function SectionFilter({
    filterValues,
    handleChangeFilterValues,
}) {
    return (
        <section className="grid grid-cols-5 h-full gap-4 grow">
            <InputFilter
                textValue={filterValues.username}
                handleTextChange={nextText => {
                    handleChangeFilterValues({
                        ...filterValues,
                        id: nextText,
                    })
                }}
                placeholder="Type admin ID here.."
            /> 
        </section>
    )
}

function ActionsBoard({
    handleDelete, 
}) {
    let classname = " w-32 h-full rounded-lg  font-bold active:opacity-90 transition "
    let deleteClassname = classname + "  bg-red text-white ";
    return (
        <> 
            <button 
                className={deleteClassname}
                onClick={() => handleDelete()}
            >
                Delete
            </button>
        </>
    )
}