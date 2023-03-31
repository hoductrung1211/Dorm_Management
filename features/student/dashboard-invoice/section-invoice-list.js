import {moneyConverter} from '../../utils/convert';
import { useContext, useState } from "react";
import InvoiceDetailSection from "./section-invoice-detail";
import {SectionContext} from '../../utils/section.context';
import { DataContext } from '../../utils/data.context';

function InvoiceRow({
    invoice: {
        id,
        category,
        date,
        status,
        total,
    }
}) {
    const handleChangeSection = useContext(SectionContext);
    return (
        <div 
            className="grid grid-cols-5 items-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
            onClick={() => handleChangeSection(<InvoiceDetailSection />)}
        >
            <div className="p-4">{id}</div>
            <div className="p-4">{category}</div>
            <div className="p-4">{date}</div>
            <div className={'p-4 font-bold ' + (status?" text-green":" text-orange")}>{status ? "Paid" : "Unpaid"}</div>
            <div className="p-4">{moneyConverter(total)}</div>
        </div>
    )
}

export default function InvoiceListSection({
    handleChangeSection,
}) {
    const invoices = useContext(DataContext);

    return (
        <>
            <header className="grid grid-cols-5 items-center w-full h-14 font-bold bg-ec rounded-tl-lg rounded-tr-lg shadow-sm">
                <div className="p-4">Invoice</div>
                <div className="p-4">Category</div>
                <div className="p-4">Date</div>
                <div className="p-4">Status</div>
                <div className="p-4">Total Cost</div>
            </header>
            <div className="h-full w-full flex flex-col overflow-auto">
            {
                invoices.map(invoice => <InvoiceRow key={invoice.id} invoice={invoice} handleClick={handleChangeSection} />)
            }
            </div> 
        </>
    )
}