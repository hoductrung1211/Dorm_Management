import { useState, useEffect } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faRotate, faVenus } from "@fortawesome/free-solid-svg-icons";
import DataColumn from "../../ui/data.column";
import SectionStudentInfo from "./student-info.section";
import MGMTService from "../../../pages/api/service/MGMT-StudentService"




const sortingButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.username > rowB.username ? 1 : -1;
            } 

            return rowA.username < rowB.username ? 1 : -1;
        }
    },
    {id: 1, text: "Full name",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.name > rowB.name ? 1 : -1;
            } 

            return rowA.name < rowB.name ? 1 : -1;
        }
    },
    {id: 2, text: "Date of birth",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.birthday > rowB.birthday ? 1 : -1;
            } 

            return rowA.birthday < rowB.birthday ? 1 : -1;
        }
    },
    {id: 3, text: "Gender",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.gender > rowB.gender ? 1 : -1;
            } 

            return rowA.gender < rowB.gender ? 1 : -1;
        }
    },
    {id: 4, text: "Identity card number",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.status > rowB.status ? 1 : -1;
            } 

            return rowA.status < rowB.status ? 1 : -1;
        }
    }
]

// const students = [
//     {username: "N19DCCN001", hoTen: "Nguyen Van A", ngaySinh: "21/11/2001", gioiTinh: true, cmnd:"0123456789"},
//     {username: "N19DCCN002", hoTen: "Nguyen Thi A", ngaySinh: "19/01/2001", gioiTinh: false, cmnd:"0123456789"},
//     {username: "N19DCCN003", hoTen: "Nguyen Van B", ngaySinh: "15/05/2001", gioiTinh: true, cmnd:"0123456789"},
//     {username: "N19DCCN005", hoTen: "Tran Quang D", ngaySinh: "22/07/2001", gioiTinh: true, cmnd:"0123456789"},
//     {username: "N19DCCN007", hoTen: "Hoang Van E", ngaySinh: "21/11/2001", gioiTinh: true, cmnd:"0123456789"},
//     {username: "N19DCCN011", hoTen: "Huynh Thi Thanh F", ngaySinh: "21/02/2001", gioiTinh: false, cmnd:"0123456789"},
//     {username: "N19DCCN021", hoTen: "Pham Van G", ngaySinh: "14/04/2001", gioiTinh: true, cmnd:"0123456789"},
//     {username: "N19DCCN030", hoTen: "Nguyen Van H", ngaySinh: "18/07/2001", gioiTinh: true, cmnd:"0123456789"},
//     {username: "N19DCCN031", hoTen: "Le Van K", ngaySinh: "01/12/2001", gioiTinh: true, cmnd:"0123456789"}, 
//     {username: "N19DCCN032", hoTen: "Le Thi K", ngaySinh: "01/12/2001", gioiTinh: false, cmnd:"0123456789"}, 
//     {username: "N19DCCN033", hoTen: "Le Van K", ngaySinh: "01/12/2001", gioiTinh: true, cmnd:"0123456789"}, 
//     {username: "N19DCCN034", hoTen: "Le Thi K", ngaySinh: "01/12/2001", gioiTinh: false, cmnd:"0123456789"}, 
//     {username: "N19DCCN035", hoTen: "Tran Quang K", ngaySinh: "01/12/2001", gioiTinh: true, cmnd:"0123456789"}, 
// ]

export default function StudentsDashboard() {

    const [students, setStudents] = useState([])

    const [typeSort, setTypeSort] = useState(true)
    useEffect(()=>{
        MGMTService.getListStudentInDorm(20, 'username', typeSort).then(res=>{
            setStudents(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    })

    function handleChangeSort(){
        MGMTService.getListStudentInDorm(10, 'username', typeSort).then(res=>{
            setStudents(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }

    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const [filterValues, setFilterValues] = useState({
        studentID: "",
        gender: "all",
        status: 'all',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState(null);

    // Student Info display on info dashboard
    const studentInfo = students.find(student => student.username == studentId);

    // Student array have been filtered
    const filteredStudents = students.filter(student => {
        const checkedName = student.hoTen.includes(filterValues.studentID.trim());
        const checkedID = student.username.includes(filterValues.studentID.trim());
        const checkedStatus = filterValues.status == "all" ? true : student.status + "" == filterValues.status;
        const checkedGender = filterValues.gender == "all" ? true : student.gender + "" == filterValues.gender;

        if ((checkedID || checkedName) && checkedStatus && checkedGender)
            return true;
        return false;
    })

    // // Filtered Student array have been sorted by order button
    filteredStudents.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    })


    const [sectionId, setSectionId] = useState(0);
    const displaySections = [
        {
            id: 0,
            section: 
                <SectionStudentList
                    sortingButtons={sortingButtons}
                    sortingButton={sortingButton}
                    setSortingButton={setSortingButton}
                    filteredStudents={filteredStudents}
                
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} 
                
                    setStudentId={setStudentId}
                    setTypeSort={setTypeSort}
                    setSectionId={setSectionId}
                />,
        },
        {
            id: 1,
            section:
                <SectionStudentInfo 
                    studentInfo={studentInfo}
                    setSectionId={setSectionId}
   
                />,
        },
    ];
    const section = displaySections.find(st => st.id == sectionId).section;
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

function SectionStudentList({
    sortingButtons,
    sortingButton,
    setSortingButton,
    filteredStudents,
    isLoading,
    setStudentId,
    setIsLoading,
    setSectionId,

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
        
        {/* Student info rows */}
        <main className="h-full w-full flex flex-col  overflow-auto">
        {filteredStudents.map( student => 
            <div 
                key={student.username} className="flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
                onClick={() => {
                    setStudentId(student.username);
                    setSectionId(1);
                }}    
            >
                <DataColumn text={student.username} />
                <DataColumn text={student.hoTen} />
                <DataColumn text={student.ngaySinh} />
                <DataColumn text={student.gioiTinh ? "Male" : "Female"}>
                {student.gioiTinh ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                </DataColumn>
                {/* <DataColumn text={student.status ? "In Dorm" : "Out Dorm"} className={"font-bold " + (student.status ? " text-green " : " text-b")} /> */}
                <DataColumn text={student.cmnd} />
            </div>
        )}
        </main>
        
        {/* Bottom */}
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
        </footer>
    </>
    )
}

function SectionFilter({
    filterValues,
    handleChangeFilterValues,
}) {
    return (
        <section className="grid grid-cols-4 h-full gap-4 grow">
            <InputFilter
                textValue={filterValues.studentID}
                handleTextChange={nextText => {
                    handleChangeFilterValues({
                        ...filterValues,
                        studentID: nextText,
                    })
                }}
                placeholder="Type student ID here.."
            />

            <FilterSelection
                title="Status"
                options={[
                    {text: "All", value: "all"},
                    {text: "In Dormitory", value: true},
                    {text: "Out Dormitory", value: false},
                ]}
                handleChangeSelection={nextStatus => {
                    handleChangeFilterValues({
                        ...filterValues,
                        status: nextStatus,
                    })
                }}
            />

            <FilterSelection
                title="Gender"
                options={[
                    {text: "All", value: "all"},
                    {text: "Male", value: true},
                    {text: "Female", value: false},
                ]}
                handleChangeSelection={nextStatus => {
                    handleChangeFilterValues({
                        ...filterValues,
                        gender: nextStatus,
                    })
                }}
            />
        </section>
    )
}
