import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import OrderButtoon from "../../ui/button-order";  
import DataColumn from "../../ui/data.column";
import SectionAdminAdding from "./admin-adding.section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Full name" },
    {id: 2, text: "Date of birth"},
    {id: 3, text: "Gender"},
    {id: 4, text: "Role"},
]

let initAdmins = [
    {id: "N19DCCN001", name: "Nguyen Van A", birthday: "21/11/2001", gender: true, role: 0},
    {id: "N19DCCN002", name: "Nguyen Thi A", birthday: "19/01/2001", gender: false, role: 0},
    {id: "N19DCCN003", name: "Nguyen Van B", birthday: "15/05/2001", gender: true, role: 0},
    {id: "N19DCCN005", name: "Tran Quang D", birthday: "22/07/2001", gender: true, role: 0},
    {id: "N19DCCN007", name: "Hoang Van E", birthday: "21/11/2001", gender: true, role: 0},
    {id: "N19DCCN011", name: "Huynh Thi Thanh F", birthday: "21/02/2001", gender: false, role: 0},
    {id: "N19DCCN021", name: "Pham Van G", birthday: "14/04/2001", gender: true, role: 0},
    {id: "N19DCCN030", name: "Nguyen Van H", birthday: "18/07/2001", gender: true, role: 0},
    {id: "N19DCCN031", name: "Le Van K", birthday: "01/12/2001", gender: true, role: 0}, 
    {id: "N19DCCN032", name: "Le Thi K", birthday: "01/12/2001", gender: false, role: 0}, 
    {id: "N19DCCN033", name: "Le Van K", birthday: "01/12/2001", gender: true, role: 0}, 
    {id: "N19DCCN034", name: "Le Thi K", birthday: "01/12/2001", gender: false, role: 0}, 
    {id: "N19DCCN035", name: "Tran Quang K", birthday: "01/12/2001", gender: true, role: 0}, 
]

export default function AdminDashboard() {
    const [admins, setAdmins] = useState(initAdmins);
    const [filterValues, setFilterValues] = useState({
        id: "", 
    });
    const [sectionId, setSectionId] = useState(0);
    const [info, setInfo] = useState(null);
 
    const filteredAdmins = admins.filter(admin => {
        const checkedID = admin.id.includes(filterValues.id.trim()); 

        if (checkedID)
            return true;
        return false;
    })

    function handleDeleteAdmin(adminId) {
        initAdmins = initAdmins.filter(admin =>  admin.id != adminId);
        setAdmins(initAdmins);
    }

    // Handle adding admin here
    function handleAddingAdmin(tempInfo) {
        
        let initId;
        while (true) {
            initId = Math.random() * 100;
            initId = parseInt(initId);
            initId = (initId + "").padStart(3, 0);

            let flag = true;

            admins.forEach(admin => {
                if (admin.id == initId)
                    flag = false;
            })

            if (flag) break;
        }

        setAdmins([
            ...admins,
            {
                id: initId,
                ...tempInfo,
            }
        ]);
        setSectionId(0);
    } 

    function handleShowMore() {
        setAdmins([
            ...admins,
            ...initAdmins,
        ])
    }

    const displaySections = [
        {
            id: 0,
            section: (
                <SectionAdminList 
                    filteredAdmins={filteredAdmins}
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
    const selectedRow = selectedRowID == null ? null : filteredAdmins.find(invoice => invoice.id == selectedRowID);

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
                key={admin.id} className={admin.id == selectedRowID ? seletectRowClassName : rowClassName}
                onClick={() => handleSelectRow(admin.id)}
            >
                <DataColumn text={admin.id} />
                <DataColumn text={admin.name} />
                <DataColumn text={admin.birthday} />
                <DataColumn text={admin.gender ? "Male" : "Female"}>
                {admin.gender ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                </DataColumn>
                <DataColumn text={admin.role } />
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
                textValue={filterValues.id}
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