import Container from "../../user/layouts/db-container";
import FilterBlock from "./block-filter";
import {SectionContext} from '../../utils/section.context';
import {DataContext} from '../../utils/data.context';
import InvoiceListSection from "./section-invoice-list";
import { useState } from "react";

const invoiceData = [
    {
        id: "ROOM-001",
        category: "Room",
        date: "01-01-2023",
        status: true,
        total: 1200000,
    },
    {
        id: "WAT-001",
        category: "Water",
        date: "02-02-2023",
        status: true,
        total: 50000,
    },
    {
        id: "ELT-001",
        category: "Electricity",
        date: "02-02-2023",
        status: true,
        total: 50000,
    },
    {
        id: "WAT-002",
        category: "Water",
        date: "02-03-2023",
        status: false,
        total: 60000,
    },
    {
        id: "ELT-002",
        category: "Electricity",
        date: "02-03-2023",
        status: false,
        total: 50000,
    },
]

export default function InvoiceDashboard() {
    const [textFilter, setTextFilter] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const invoices = invoiceData.filter(invoice => {

        if (category != "all" && invoice.category != category)
            return false;

        if (status != "all" && invoice.status.toString() != status)
            return false;
        
        if (!invoice.id.includes(textFilter))
            return false;
        
        return true;
    })

    const [section, setSection] = useState(<InvoiceListSection />)
    return (
        <>
            <FilterBlock
                textValue={textFilter}
                category={category}
                status={status}
                setCategory={setCategory}
                setTextFilter={setTextFilter}
                setStatus={setStatus}
            />
            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                    <div className="h-full w-full p-5 flex flex-col">
                        <SectionContext.Provider value={setSection}>
                        <DataContext.Provider value={invoices}>
                            {section} 
                        </DataContext.Provider>
                        </SectionContext.Provider>
                    </div>
                </Container>
            </div>
        </>
    )
}

