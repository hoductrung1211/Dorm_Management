import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const orderButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.id > rowB.id ? 1 : -1;
            } 

            return rowA.id < rowB.id ? 1 : -1;
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
    {id: 4, text: "Status",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.status > rowB.status ? 1 : -1;
            } 

            return rowA.status < rowB.status ? 1 : -1;
        }
    }
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
    const [orderButton, setOrderButton] = useState({
        id: 0,
        isAsc: true,
    });
    const [filterValues, setFilterValues] = useState({
        studentID: "",
        gender: "all",
        status: 'all',
    });
    const [isLoading, setIsLoading] = useState(false);


    const filteredStudents = students.filter(student => {
        const isNamePassed = student.name.includes(filterValues.studentID.trim());
        const isIdPassed = student.id.includes(filterValues.studentID.trim());
        const isStatusPassed = filterValues.status == "all" ? true : student.status + "" == filterValues.status;
        const isGenderPassed = filterValues.gender == "all" ? true : student.gender + "" == filterValues.gender;

        if ((isIdPassed || isNamePassed) && isStatusPassed && isGenderPassed)
            return true;
        return false;
    })

    filteredStudents.sort((rowA, rowB) => {
        const sortCB = orderButtons.find(btn => btn.id == orderButton.id).handleOrder;

        return sortCB(rowA, rowB, orderButton.isAsc);
    })

    return (
        <>
            <HeaderSection> 
                <section className="grid grid-cols-4 h-full gap-4 grow">
                    <InputFilter
                        textValue={filterValues.studentID}
                        handleTextChange={nextText => {
                            setFilterValues({
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
                            setFilterValues({
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
                            setFilterValues({
                                ...filterValues,
                                gender: nextStatus,
                            })
                        }}
                    />
                </section>

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
            </HeaderSection>


            
            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                    <div className="h-full w-full p-4 flex flex-col">
                        <header className="grid grid-flow-col grid-cols-5 w-full h-14 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
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
                                                    isAsc: false,
                                                })
                                            }
                                        }}
                                    />)
                            }
                        </header>

                        <main className="h-full w-full flex flex-col  overflow-auto">
                        {filteredStudents.map( student => 
                            <div key={student.id} className="flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa">
                                <TextColumn text={student.id} />
                                <TextColumn text={student.name} />
                                <TextColumn text={student.birthday} />
                                <TextColumn text={student.gender ? "Male" : "Female"} />
                                <TextColumn text={student.status ? "In Dorm" : "Out Dorm"} className="font-bold" />
                            </div>
                        )}
                        </main>

                        <div className="w-full py-4 px-6  text-end">
                            Size: {filteredStudents.length}
                        </div>
                    </div>

                    
                </Container>
            </div>
        </>

        
    )
}


function TextColumn({
    text,
    className
}) {
    let classname = "col-span-1 p-4 " + className;
    return (
        <div className={classname}>
            {text}
        </div>
    )
}
