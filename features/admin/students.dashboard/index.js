import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faRotate, faVenus } from "@fortawesome/free-solid-svg-icons";
import DataColumn from "../../ui/data.column";
import SectionStudentInfo from "./student-info.section";

const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Full name" },
    {id: 2, text: "Date of birth"},
    {id: 3, text: "Gender"},
    {id: 4, text: "Status"}
]

const students = [
    {id: "N19DCCN001", name: "Nguyen Van A", birthday: "21/11/2001", gender: true, status: true},
    {id: "N19DCCN002", name: "Nguyen Thi A", birthday: "19/01/2001", gender: false, status: false},
    {id: "N19DCCN003", name: "Nguyen Van B", birthday: "15/05/2001", gender: true, status: true},
    {id: "N19DCCN005", name: "Tran Quang D", birthday: "22/07/2001", gender: true, status: true},
    {id: "N19DCCN007", name: "Hoang Van E", birthday: "21/11/2001", gender: true, status: true},
    {id: "N19DCCN011", name: "Huynh Thi Thanh F", birthday: "21/02/2001", gender: false, status: true},
    {id: "N19DCCN021", name: "Pham Van G", birthday: "14/04/2001", gender: true, status: false},
    {id: "N19DCCN030", name: "Nguyen Van H", birthday: "18/07/2001", gender: true, status: true},
    {id: "N19DCCN031", name: "Le Van K", birthday: "01/12/2001", gender: true, status: false}, 
    {id: "N19DCCN032", name: "Le Thi K", birthday: "01/12/2001", gender: false, status: true}, 
    {id: "N19DCCN033", name: "Le Van K", birthday: "01/12/2001", gender: true, status: false}, 
    {id: "N19DCCN034", name: "Le Thi K", birthday: "01/12/2001", gender: false, status: true}, 
    {id: "N19DCCN035", name: "Tran Quang K", birthday: "01/12/2001", gender: true, status: true}, 
]

export default function StudentsDashboard() { 
    const [filterValues, setFilterValues] = useState({
        studentID: "",
        gender: "all",
        status: 'all',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState(null);

    // Student Info display on info dashboard
    const studentInfo = students.find(student => student.id == studentId);

    // Student array have been filtered
    const filteredStudents = students.filter(student => {
        const checkedName = student.name.includes(filterValues.studentID.trim());
        const checkedID = student.id.includes(filterValues.studentID.trim());
        const checkedStatus = filterValues.status == "all" ? true : student.status + "" == filterValues.status;
        const checkedGender = filterValues.gender == "all" ? true : student.gender + "" == filterValues.gender;

        if ((checkedID || checkedName) && checkedStatus && checkedGender)
            return true;
        return false;
    })
  

    const [sectionId, setSectionId] = useState(0);
    const displaySections = [
        {
            id: 0,
            section: 
                <SectionStudentList 
                    filteredStudents={filteredStudents}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} 
                    setStudentId={setStudentId}
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
                />)
        }
        </header>
        
        {/* Student info rows */}
        <main className="h-full w-full flex flex-col  overflow-auto">
        {filteredStudents.map( student => 
            <div 
                key={student.id} className="flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
                onClick={() => {
                    setStudentId(student.id);
                    setSectionId(1);
                }}    
            >
                <DataColumn text={student.id} />
                <DataColumn text={student.name} />
                <DataColumn text={student.birthday} />
                <DataColumn text={student.gender ? "Male" : "Female"}>
                {student.gender ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                </DataColumn>
                <DataColumn text={student.status ? "In Dorm" : "Out Dorm"} className={"font-bold " + (student.status ? " text-green " : " text-b")} />
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
