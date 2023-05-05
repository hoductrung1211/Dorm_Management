import { useState, useEffect } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faRotate, faVenus, faSortDown, faUnsorted, faSort, faSortUp } from "@fortawesome/free-solid-svg-icons";
import DataColumn from "../../ui/data.column";
import SectionStudentInfo from "./student-info.section";
import MGMTService from "../../../pages/api/service/MGMT-StudentService"




const sortingButtons = [

    {id: 0, text: "ID" },
    {id: 1, text: "Full name" },
    {id: 2, text: "Date of birth"},
    {id: 3, text: "Gender"},
    {id: 4, text: "Identity card number"}
]



export default function StudentsDashboard() { 
    const [students, setStudents] = useState([])
    const [typeSort, setTypeSort] = useState(true)
    const [amountElement, setAmountElement] = useState(20)
    useEffect(()=>{
        MGMTService.getListStudentInDorm(amountElement, 'username', typeSort).then(res=>{
            setStudents(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    },[])

    function handleChangeSort(){
        
        MGMTService.getListStudentInDorm(amountElement, 'username', !typeSort).then(res=>{
            // console.log(res.data.length)
            setTypeSort(!typeSort)
            setStudents(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }


    // const [filterValues, setFilterValues] = useState({
    //     studentID: "",
    //     gender: "all",
    //     status: 'all',
    // });
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState(null);

    // Student Info display on info dashboard
    const studentInfo = students.find(student => student.username == studentId);

    // // Student array have been filtered
    // const filteredStudents = students.filter(student => {
    //     const checkedName = student.hoTen.includes(filterValues.studentID.trim());
    //     const checkedID = student.username.includes(filterValues.studentID.trim());
    //     const checkedStatus = filterValues.status == "all" ? true : student.status + "" == filterValues.status;
    //     const checkedGender = filterValues.gender == "all" ? true : student.gender + "" == filterValues.gender;

    //     if ((checkedID || checkedName) && checkedStatus && checkedGender)
    //         return true;
    //     return false;
    // })

  
    function handleShowMore() {
        
        MGMTService.getListStudentInDorm(amountElement+20, 'username', typeSort).then(res=>{
            setAmountElement(amountElement+20)
            setStudents(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }

    const [textValue, setTextValue] = useState('')
    function lookupById(text){
        // search function
        if(/^[a-z]/i.test(text) || text.length==0 || /^[0-9]/i.test(text)){
            setTextValue(text)
            MGMTService.getListStudentSearch(text,text).then(res=>{
                setStudents(res.data)
            }).catch((error)=>{
                if(error.response){
                    console.log(error.response.data)
                }
            })
        }
    }

    function genderSelection(selected){
        MGMTService.getListStudentInDorm(amountElement, 'username', !typeSort, selected).then(res=>{
            // console.log(res.data.length)
            setTypeSort(!typeSort)
            setStudents(res.data)
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data)
            }
        })
    }

    async function requestSyncStudents(){
        try{
            setIsLoading(true)
            const res= await MGMTService.syncStudents()
            setIsLoading(false)
            return res.data
        }catch(error){
            if(error.response){
                console.log(error.response.data)
            }
        }
        
        // MGMTService.syncStudents().then((res)=>{
            
        //     console.log(res.data)
        // })
    }

    const [sectionId, setSectionId] = useState(0);
    const displaySections = [
        {
            id: 0,
            section: 
                <SectionStudentList 
                    filteredStudents={students}
                    isLoading={isLoading}
                    setStudentId={setStudentId}
                    setSectionId={setSectionId}
                    handleShowMore={handleShowMore}
                    
                    requestSyncStudents={requestSyncStudents}
                    handleChangeSort={handleChangeSort}
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
                    lookupById={lookupById}
                    textValue={textValue}
                    genderSelection={genderSelection}
                    />
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
    filteredStudents,
    isLoading,
    setStudentId,
    setSectionId,
    handleShowMore,

    handleChangeSort,
    requestSyncStudents
}) {
    function handleClickHeader(){       
        handleChangeSort() 
    }

    return (
    <>
        <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {
            sortingButtons.map(button => 
                button.id==0 ?
                    <OrderButtoon 
                    key={button.id}
                    button={button}
                    handleClick={handleClickHeader}
                    children={
                        <FontAwesomeIcon
                        icon={faSort}
                        className="text-xl pl-2 text-primary"
                        />
                      }
                    /> :
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
                    // handleClickSync()    
                    
                    requestSyncStudents()
                    
                }}
            >
                Sync
                {isLoading && <FontAwesomeIcon className="ml-4 animate-spin" icon={faRotate} />}

            </button>

            <button 
                className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
                onClick={handleShowMore}
            >
                Show more
            </button>
        </footer>
    </>
    )
}

function SectionFilter({
    

    lookupById,
    textValue,
    genderSelection

}) {
    
    return (
        <section className="grid grid-cols-3 h-full gap-4 grow">
            <InputFilter
                // textValue={filterValues.studentID}
                textValue={textValue}
                handleTextChange={nextText => {
                    lookupById(nextText)
                }}
                
                placeholder="Type student ID here.."
            />

            {/* <FilterSelection
                title="Status"
                options={[
                    // {text: "All", value: "all"},
                    {text: "In Dormitory", value: true},
                    {text: "Out Dormitory", value: false},
                ]}
                handleChangeSelection={nextStatus => {
                    handleChangeFilterValues({
                        ...filterValues,
                        status: nextStatus,
                    })
                }}
            /> */}

            <FilterSelection
                title="Gender"
                options={[
                    {text: "All", value: ''},
                    {text: "Male", value: true},
                    {text: "Female", value: false},
                ]}
                handleChangeSelection={selected=>{
                    genderSelection(selected)
                }}
            />
        </section>
    )
}
