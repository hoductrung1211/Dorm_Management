import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import DataColumn from "../../ui/data.column";
import {moneyConverter} from '../../utils/convert'; 

const sortingButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.id > rowB.id ? 1 : -1;
            } 

            return rowA.id < rowB.id ? 1 : -1;
        }
    }, 
    {id: 1, text: "Student ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.studentId > rowB.studentId ? 1 : -1;
            } 

            return rowA.studentId < rowB.studentId ? 1 : -1;
        }
    }, 
    {id: 2, text: "Room ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.roomId > rowB.roomId ? 1 : -1;
            } 

            return rowA.roomId < rowB.roomId ? 1 : -1;
        }
    }, 
    {id: 3, text: "Date",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.date > rowB.date ? 1 : -1;
            } 

            return rowA.date < rowB.date ? 1 : -1;
        }
    },
    {id: 4, text: "Total Cost",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.termId > rowB.termId ? 1 : -1;
            } 

            return rowA.termId < rowB.termId ? 1 : -1;
        }
    },
    {id: 5, text: "Status",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.status > rowB.status ? 1 : -1;
            } 

            return rowA.status < rowB.status ? 1 : -1;
        }
    }
]

const initContracts = [
    {id: "001", studentId: "N19DCCN010", roomId: "001", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true},
    {id: "002", studentId: "N19DCCN011", roomId: "001", gender: false, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: false},
    {id: "003", studentId: "N19DCCN012", roomId: "001", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true},
    {id: "004", studentId: "N19DCCN013", roomId: "001", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: false},
    {id: "005", studentId: "N19DCCN014", roomId: "002", gender: false, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true},
    {id: "006", studentId: "N19DCCN015", roomId: "002", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true},
    {id: "007", studentId: "N19DCCN016", roomId: "002", gender: false, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: false},
    {id: "008", studentId: "N19DCCN017", roomId: "002", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true},
    {id: "009", studentId: "N19DCCN018", roomId: "003", gender: false, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: false}, 
    {id: "010", studentId: "N19DCCN019", roomId: "003", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true}, 
    {id: "011", studentId: "N19DCCN020", roomId: "003", gender: false, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: false}, 
    {id: "012", studentId: "N19DCCN021", roomId: "003", gender: true, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true}, 
    {id: "013", studentId: "N19DCCN022", roomId: "004", gender: false, dateBegin: "23/02/2023", dateEnd: "01/03/2023", cost: 1_000_000, status: true}, 
]

export default function ContractDashboard() {
    const [contracts, setContracts] = useState(initContracts);
    const [filterValues, setFilterValues] = useState({
        id: "",
        studentId: "",
        roomId: "all",
        gender: "all",
        status: 'all',
    });
    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const [selectedRowID, setSelectedRowID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // contract array have been filtered
    const filteredContracts = contracts.filter(contract => {
        // const checkedID = contract.id.includes(filterValues.id.trim());  
        const studentId = contract.studentId.toLowerCase().includes(filterValues.studentId.trim().toLowerCase());
        
        const roomId = filterValues.roomId == 'all' ? true : contract.roomId  == filterValues.roomId;

        const checkedStatus = filterValues.status == "all" ? true : contract.status + "" == filterValues.status;
        const checkedGender = filterValues.gender == "all" ? true : contract.gender + "" == filterValues.gender;

        if ( roomId &&  studentId && checkedStatus && checkedGender)
            return true;
        return false;
    })
    // Filtered contract array have been sorted by order button
    filteredContracts.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    })

    const rowClassName = " flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa ";
    const seletectRowClassName = rowClassName + " bg-fa border-l-2 border-r-2 "
    const selectedRow = selectedRowID == null ? null : filteredContracts.find(invoice => invoice.id == selectedRowID);

    // Filtered Row array have been sorted by order button
    function handleSelectRow(nextID) {
        if (nextID == selectedRowID)
            nextID = null;
        setSelectedRowID(nextID);
    }
    function handleMarkStatus() {
        setContracts(filteredContracts.map(contract => {
            if (contract.id == selectedRowID)
                return {
                    ...contract,
                    status: !contract.status,
                }
            return contract;
        }));

        setSelectedRowID(null);
    }


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
                    <section className="h-full w-full p-4 flex flex-col">
                        <header className="flex-shrink-0 grid grid-flow-col grid-cols-6 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
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
                        
                        {/* contract info rows */}
                        <main className="h-full w-full flex flex-col overflow-auto">
                        {filteredContracts.map( contract => 
                            <div 
                                key={contract.id} className={selectedRowID == contract.id ? seletectRowClassName : rowClassName}
                                onClick={() => handleSelectRow(contract.id)}
                            >
                                <DataColumn text={contract.id} /> 
                                <DataColumn text={contract.studentId} /> 
                                <DataColumn text={contract.roomId} /> 
                                <DataColumn text={contract.dateBegin + " - " + contract.dateEnd} />
                                <DataColumn text={moneyConverter(contract.cost)} />
                                <DataColumn text={contract.status ? "Paid" : "Unpaid"} className={"font-bold " + (contract.status ? " text-green " : " text-b")} />
                            </div>
                        )}
                        </main>
                        
                        {/* Bottom */}
                        <footer className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
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
                        </footer>
                    </section>
                </Container>
            </div>
        </>
    )
}
 

function SectionFilter({
    filterValues,
    handleChangeFilterValues,
}) {
    // Call API here to get list
    const rooms = [
        {id: "001", typeName: "standard", },
        {id: "002", typeName: "standard", },
        {id: "003", typeName: "standard", },
        {id: "004", typeName: "standard", },
        {id: "005", typeName: "standard", },
        {id: "006", typeName: "standard", },
        {id: "007", typeName: "standard", },
        {id: "008", typeName: "standard", },
        {id: "009", typeName: "standard", },
        {id: "010", typeName: "standard", },
        {id: "011", typeName: "standard", },
        {id: "012", typeName: "standard", },
        {id: "013", typeName: "standard", },
        {id: "014", typeName: "standard", },
        {id: "015", typeName: "standard", },
        {id: "016", typeName: "standard", },
        {id: "017", typeName: "standard", },
        {id: "018", typeName: "standard", },
        {id: "019", typeName: "standard", },
        {id: "020", typeName: "standard", },
    ]

    const terms = [
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
        {dateBegin: "01/01/2023", dateEnd: "02/05/2023"},
    ]

    return (
        <section className="grid grid-cols-5 h-full gap-4 grow">
            {/* <InputFilter
                textValue={filterValues.id}
                handleTextChange={nextText => {
                    handleChangeFilterValues({
                        ...filterValues,
                        id: nextText,
                    })
                }}
                placeholder="Type contract ID here.."
            /> */}

            <InputFilter
                textValue={filterValues.studentId}
                handleTextChange={nextText => {
                    handleChangeFilterValues({
                        ...filterValues,
                        studentId: nextText,
                    })
                }}
                placeholder="Type student ID here.."
            />
  
            <FilterSelection
                title="Room"
                options={
                    [
                        {text: "All", value: "all"},
                        ...rooms.map(room => ({
                            text: room.id,
                            value: room.id,
                        }))
                    ]
                    
                }
                handleChangeSelection={nextStatus => {
                    handleChangeFilterValues({
                        ...filterValues,
                        roomId: nextStatus,
                    })
                }}
            />

            <FilterSelection
                title="Term"
                options={
                    [
                        {text: "All", value: "all"},
                        ...rooms.map(room => ({
                            text: room.id,
                            value: room.id,
                        }))
                    ]
                    
                }
                handleChangeSelection={nextStatus => {
                    handleChangeFilterValues({
                        ...filterValues,
                        roomId: nextStatus,
                    })
                }}
            />

            <FilterSelection
                title="Status"
                options={[
                    {text: "All", value: "all"},
                    {text: "Paid", value: true},
                    {text: "Unpaid", value: false},
                ]}
                handleChangeSelection={nextStatus => {
                    handleChangeFilterValues({
                        ...filterValues,
                        status: nextStatus,
                    })
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
        {selectedRow.status ? "Mark Unpaid" : "Mark paid"}
        </button>
        </>
    )
}