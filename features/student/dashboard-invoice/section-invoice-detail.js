import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Logo from '../../ui/logo';
import { useContext } from "react";
import { SectionContext } from "../../utils/section.context";
import InvoiceListSection from "./section-invoice-list";

export default function InvoiceDetailSection() {
    const handleChangeSection = useContext(SectionContext);

    return (
        <section className="h-full w-full flex flex-col p-5">
            <nav className="w-full ">
                <button 
                    className="h-12 w-12 rounded-full active:bg-ec transition text-3xl"
                    onClick={() => handleChangeSection(<InvoiceListSection />)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button> 
            </nav>

            <main className="h-full w-full flex flex-col py-5 px-8 bg-fa rounded-md">
                <header className="flex items-center justify-between">
                    <Logo />
                    <span className="text-2xl">invoice</span>
                </header>

                <section className="mt-4 flex justify-between">
                    <div className="flex flex-col gap-2">
                        <p>Cube Dormitory</p>
                        <p>97 Man Thien st, Tang Nhon Phu A, Thu Duc District</p>
                        <p>0123 456 783</p>
                        <p>cubedormitory@gmail.com</p>
                    </div>

                    <div className="flex flex-col justify-around items-end">
                        <p className="underline text-3xl">ROOM-001</p>
                        <p className=" text-xl">01-01-2023</p>
                    </div>
                </section>
                
                <section className="mt-8 h-full grid grid-cols-10 ">
                    <div className="col-span-3">
                        <h4 className="font-bold h-10 flex items-center">Bill to</h4>
                        <p>Nguyen Dang Bac</p>
                        <p>0123 123 321</p>
                        <p>nguyendangbac@gmail.com</p> 
                    </div>

                    <div className="col-span-7"> 
                        <div className="grid grid-cols-4 items-center h-10 bg-ec">
                            <p className="col-span-2 px-2">Description</p>
                            <p className="cols-span-1 px-2">Unit cost</p>
                            <p className="cols-span-1 px-2">Amount</p>
                        </div>

                        <div className="grid grid-cols-4 items-center h-10 bg-white">
                            <p className="col-span-2 px-2">Room</p>
                            <p className="cols-span-1 px-2">240,000đ x 5</p>
                            <p className="cols-span-1 px-2">1,200,000đ</p>
                        </div>


                        <div className="mt-10 grid grid-cols-4 items-center">
                            <p className="col-span-2 "></p>
                            <p className="col-span-1 px-2">Subtotal</p>
                            <p className="col-span-1 px-2">1,200,000đ</p>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <p className="col-span-2 "></p>
                            <p className="col-span-1 px-2">Tax</p>
                            <p className="col-span-1 px-2">0</p>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <p className="col-span-2 "></p>
                            <p className="col-span-1 px-2">Total</p>
                            <p className="col-span-1 px-2 text-xl font-bold">1,200,000đ</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col italic text-sm">
                    {/* <p><span className="font-bold ">Payment term:</span> Net 30</p> */}
                    {/* <p><span className="font-bold ">Late Payment Fee:</span> 2%</p> */}
                    <p><span className="font-bold ">Payment Options:</span> Credit Card, Bank Transfer, or Check</p>
                    <p><span className="font-bold ">Terms and Conditions:</span> Payment must be received within 30 days of invoice date. Late payments will be subject to a 2% late payment fee. All sales are final.</p>
                    <p><span className="font-bold ">Contact Information:</span> If you have any questions or concerns about this invoice, please contact us</p>

                </section>
            </main>
        </section>
    )
}