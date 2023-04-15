import { useState } from "react";
import HeaderSection from "../../layouts/section-header";
import Container from "../../user/layouts/db-container";
import InputFilter from "../../ui/input-filter";
import OrderButtoon from "../../ui/button-order";  
import DataColumn from "../../ui/data.column";
import SectionTermAdding from "./term-adding.section";
import SectionTermEditing from "./term-editing.section";



const sortingButtons = [
    {id: 0, text: "ID" },
    {id: 1, text: "Start date" },
    {id: 2, text: "End date" },
    {id: 3, text: "Form submission deadline" },
    {id: 4, text: "Tuition fee deadline"}, 
]

let initTerms = [ 
    {id: "004", startDate: "2023-04-28", endDate: "2023-04-28", formDeadline: "2023-04-28", feeDeadline: 30},
    {id: "003", startDate: "2023-04-28", endDate: "2023-04-28", formDeadline: "2023-04-28", feeDeadline: 30},
    {id: "002", startDate: "2023-04-28", endDate: "2023-04-28", formDeadline: "2023-04-28", feeDeadline: 30},
    {id: "001", startDate: "2023-04-28", endDate: "2023-04-28", formDeadline: "2023-04-28", feeDeadline: 30},
]

export default function TermDashboard() {
    const [terms, setTerms] = useState(initTerms);
    const [filterValues, setFilterValues] = useState({
        id: "", 
    });
    const [sectionId, setSectionId] = useState(0);
    const [info, setInfo] = useState(null);
 
    const filteredTerms = terms.filter(term => {
        const checkedID = term.id.includes(filterValues.id.trim()); 

        if (checkedID)
            return true;
        return false;
    })

    function handleDeleteTerm(termId) {
        initTerms = initTerms.filter(term =>  term.id != termId);
        setTerms(initTerms);
    }

    // Handle adding term here
    function handleAddingTerm(tempInfo) {
        
        let initId;
        while (true) {
            initId = Math.random() * 100;
            initId = parseInt(initId);
            initId = (initId + "").padStart(3, 0);

            let flag = true;

            terms.forEach(term => {
                if (term.id == initId)
                    flag = false;
            })

            if (flag) break;
        }

        setTerms([
            ...terms,
            {
                id: initId,
                ...tempInfo,
            }
        ]);
        console.log(terms)
        setSectionId(0);
    }

    function handleEditingTerm(editedTerm) {
        setTerms(terms.map(term => {
            if (term.id == editedTerm.id)
                return editedTerm;
            return term;
        }))

        setSectionId(0);
    }

    function handleShowMore() {
        setTerms([
            ...terms,
            ...initTerms,
        ])
    }

    const displaySections = [
        {
            id: 0,
            section: (
                <SectionTermList 
                    filteredTerms={filteredTerms}
                    handleDeleteTerm={handleDeleteTerm}
                    setSectionId={setSectionId}
                    setInfo={setInfo}
                    handleShowMore={handleShowMore}
                />
            )
        },
        {
            id: 1,
            section: (
                <SectionTermAdding
                    setSectionId={setSectionId}
                    handleAddingTerm={handleAddingTerm}
                />
            )
        },
        {
            id: 2,
            section: (
                <SectionTermEditing
                    setSectionId={setSectionId}
                    handleEditingTerm={handleEditingTerm}
                    info={info}
                />
            )
        },
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

function SectionTermList({ 
    filteredTerms,
    setSectionId,
    setInfo,
    handleDeleteTerm,
    handleShowMore,
}) {
    const [selectedRowID, setSelectedRowID] = useState(null);
    const rowClassName = " flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa ";
    const seletectRowClassName = rowClassName + " bg-fa border-l-2 border-r-2 "
    const selectedRow = selectedRowID == null ? null : filteredTerms.find(invoice => invoice.id == selectedRowID);

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
        
        {/* term info rows */}
        <main className="h-full w-full flex flex-col  overflow-auto">
        {filteredTerms.map( term => 
            <div 
                key={term.id} className={term.id == selectedRowID ? seletectRowClassName : rowClassName}
                onClick={() => handleSelectRow(term.id)}
            >
                <DataColumn text={term.id} />
                <DataColumn text={term.startDate} />
                <DataColumn text={term.endDate} />
                <DataColumn text={term.formDeadline} />
                <DataColumn text={term.feeDeadline} />
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
                handleDelete={() => handleDeleteTerm(selectedRowID)}
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
                placeholder="Type term ID here.."
            /> 
        </section>
    )
}

function ActionsBoard({
    handleDelete,
    changeToEdit
}) {
    let classname = " w-32 h-full rounded-lg  font-bold active:opacity-90 transition "
    let editClassname = classname + "  bg-ec text-b ";
    let deleteClassname = classname + "  bg-red text-white ";
    return (
        <>
            <button 
                className={editClassname}
                onClick={changeToEdit}
            >
                Edit
            </button>

            <button 
                className={deleteClassname}
                onClick={() => handleDelete()}
            >
                Delete
            </button>
        </>
    )
}