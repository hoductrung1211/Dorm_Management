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
    {id: 1, text: "Start date",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.startDate > rowB.startDate ? 1 : -1;
            } 

            return rowA.startDate < rowB.startDate ? 1 : -1;
        }
    },
    {id: 2, text: "End date",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.endDate > rowB.endDate ? 1 : -1;
            } 

            return rowA.endDate < rowB.endDate ? 1 : -1;
        }
    },
    {id: 3, text: "Form submission deadline",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.formDeadline > rowB.formDeadline ? 1 : -1;
            } 

            return rowA.formDeadline < rowB.formDeadline ? 1 : -1;
        }
    },
    {id: 4, text: "Tuition fee deadline",
        handleOrder: (rowA, rowB, isAsc) => {
            if (isAsc) {
                return rowA.feeDeadline > rowB.feeDeadline ? 1 : -1;
            } 

            return rowA.feeDeadline < rowB.feeDeadline ? 1 : -1;
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

const terms = [ 
    {id: "004", startDate: "01/06/2021", endDate: "01/01/2023", formDeadline: "02/07/2022", feeDeadline: "09/07/2022", status: false},
    {id: "003", startDate: "01/01/2021", endDate: "01/07/2022", formDeadline: "02/02/2022", feeDeadline: "09/02/2022", status: false},
    {id: "002", startDate: "01/06/2021", endDate: "01/01/2022", formDeadline: "02/07/2021", feeDeadline: "09/07/2021", status: false},
    {id: "001", startDate: "01/01/2021", endDate: "01/07/2021", formDeadline: "02/02/2021", feeDeadline: "09/02/2021", status: false},
]

export default function TermDashboard() {
    const [sortingButton, setSortingButton] = useState({
        id: 0,
        isAsc: true,
    });
    const [filterValues, setFilterValues] = useState({
        id: "", 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [viewedDataId, setViewedDataId] = useState(null);

    // term Info display on info dashboard
    const viewedData = terms.find(term => term.id == viewedDataId);

    // term array have been filtered
    const filteredTerms = terms.filter(term => {
        const checkedID = term.id.includes(filterValues.id.trim()); 

        if (checkedID)
            return true;
        return false;
    })

    // Filtered term array have been sorted by order button
    filteredTerms.sort((rowA, rowB) => {
        const sortCB = sortingButtons.find(btn => btn.id == sortingButton.id).handleOrder;

        return sortCB(rowA, rowB, sortingButton.isAsc);
    })

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
                    {
                        viewedDataId != null
                        ?   // When user click to a term row, it will popup term info 
                            null

                        :   // term info overvie Table  
                        <SectionTermList
                            sortingButtons={sortingButtons}
                            sortingButton={sortingButton}
                            setSortingButton={setSortingButton}
                            filteredTerms={filteredTerms}
                            isLoading={isLoading}
                            setViewedDataId={setViewedDataId}
                            setIsLoading={setIsLoading} />
                    }
                    </div>
                </Container>
            </div>
        </>
    )
}

function SectionTermList({
    sortingButtons,
    sortingButton,
    setSortingButton,
    filteredTerms,
    isLoading,
    setViewedDataId,
    setIsLoading,
}) {
    return (
    <>
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
        
        {/* term info rows */}
        <main className="h-full w-full flex flex-col  overflow-auto">
        {filteredTerms.map( term => 
            <div 
                key={term.id} className="flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
                onClick={() => {
                    setViewedDataId(term.id);
                }}    
            >
                <DataColumn text={term.id} />
                <DataColumn text={term.startDate} />
                <DataColumn text={term.endDate} />
                <DataColumn text={term.formDeadline} />
                <DataColumn text={term.feeDeadline} />
                <DataColumn text={term.status ? "In progressing" : "Ended"} className={"font-bold " + (term.status ? " text-green " : " text-b")} />
            </div>
        )}
        </main>
        
        {/* Bottom */}
        <div className="flex-shrink-0 w-full h-14 pt-2  text-end">
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
                placeholder="Type term ID here.."
            /> 
        </section>
    )
}
