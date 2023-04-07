import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import OrderButtoon from "../../ui/button-order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faRotate, faVenus } from "@fortawesome/free-solid-svg-icons";
import DataColumn from "../../ui/data.column";

const sortingButtons = [
    {id: 0, text: "ID", 
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.id > rowB.id ? 1 : -1;
            } 

            return rowA.id < rowB.id ? 1 : -1;
        }
    },
    {id: 1, text: "contract ID",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.contractId > rowB.contractId ? 1 : -1;
            } 

            return rowA.contractId < rowB.contractId ? 1 : -1;
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
    {id: 3, text: "Term ID",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.termId > rowB.termId ? 1 : -1;
            } 

            return rowA.termId < rowB.termId ? 1 : -1;
        }
    },
    {id: 4, text: "Date",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.date > rowB.date ? 1 : -1;
            } 

            return rowA.date < rowB.date ? 1 : -1;
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
    {id: "001", contractId: "N19DCCN001", roomId: "002", gender: true, termId: "03/2022", date: "23/02/2023", status: true},
    {id: "002", contractId: "N19DCCN002", roomId: "002", gender: false, termId: "02/2023", date: "23/02/2023", status: false},
    {id: "003", contractId: "N19DCCN003", roomId: "002", gender: true, termId: "03/2023", date: "23/02/2023", status: true},
    {id: "004", contractId: "N19DCCN005", roomId: "001", gender: true, termId: "02/2023", date: "23/02/2023", status: false},
    {id: "005", contractId: "N19DCCN007", roomId: "001", gender: false, termId: "03/2022", date: "23/02/2023", status: true},
    {id: "006", contractId: "N19DCCN011", roomId: "001", gender: true, termId: "02/2023", date: "23/02/2023", status: true},
    {id: "007", contractId: "N19DCCN021", roomId: "004", gender: false, termId: "02/2023", date: "23/02/2023", status: false},
    {id: "008", contractId: "N19DCCN030", roomId: "004", gender: true, termId: "03/2022", date: "23/02/2023", status: true},
    {id: "009", contractId: "N19DCCN031", roomId: "005", gender: false, termId: "02/2023", date: "23/02/2023", status: false}, 
    {id: "010", contractId: "N19DCCN032", roomId: "006", gender: true, termId: "02/2023", date: "23/02/2023", status: true}, 
    {id: "011", contractId: "N19DCCN033", roomId: "006", gender: false, termId: "03/2022", date: "23/02/2023", status: false}, 
    {id: "012", contractId: "N19DCCN034", roomId: "007", gender: true, termId: "02/2023", date: "23/02/2023", status: true}, 
    {id: "013", contractId: "N19DCCN035", roomId: "006", gender: false, termId: "03/2022", date: "23/02/2023", status: true}, 
]

export default function ContractDashboard() {
    const [contracts, setContracts] = useState(initContracts);
    const [filterValues, setFilterValues] = useState({
        id: "",
        contractId: "",
        roomId: "",
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
        const checkedID = contract.id.includes(filterValues.id.trim());
        const checkedcontractID = contract.contractId.includes(filterValues.contractId.trim()); 
        const checkedRoomID = contract.roomId.includes(filterValues.roomId.trim());

        const checkedStatus = filterValues.status == "all" ? true : contract.status + "" == filterValues.status;
        const checkedGender = filterValues.gender == "all" ? true : contract.gender + "" == filterValues.gender;

        if (checkedID  && checkedcontractID && checkedRoomID && checkedStatus && checkedGender)
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
                        <main className="h-full w-full flex flex-col  overflow-auto">
                        {filteredContracts.map( contract => 
                            <div 
                                key={contract.id} className={selectedRowID == contract.id ? seletectRowClassName : rowClassName}
                                onClick={() => handleSelectRow(contract.id)}
                            >
                                <DataColumn text={contract.id} />
                                <DataColumn text={contract.contractId} />
                                <DataColumn text={contract.roomId}>
                                    {contract.gender ? <FontAwesomeIcon icon={faMars} className=" text-xl mr-1 text-primary" /> : <FontAwesomeIcon icon={faVenus} className="text-xl mr-1 text-pink-500" />}
                                </DataColumn>
                                <DataColumn text={contract.termId} />
                                <DataColumn text={contract.date} />
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
                placeholder="Type contract ID here.."
            />

            <InputFilter
                textValue={filterValues.contractId}
                handleTextChange={nextText => {
                    handleChangeFilterValues({
                        ...filterValues,
                        contractId: nextText,
                    })
                }}
                placeholder="Type contract ID here.."
            />

            <InputFilter
                textValue={filterValues.roomId}
                handleTextChange={nextText => {
                    handleChangeFilterValues({
                        ...filterValues,
                        roomId: nextText,
                    })
                }}
                placeholder="Type room ID here.."
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