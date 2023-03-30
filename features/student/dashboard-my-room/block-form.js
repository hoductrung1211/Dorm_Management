import { faAsterisk, faCakeCandles, faCalendar, faCalendarDays, faDiamond, faIdCard, faMoneyBill, faSignature, faVenusMars } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { useContext, useState } from "react"
import FormInfoBlock from "./block-form-info"
import { SectionContext } from "./section.context";
import SucessfullyBlock from "../../user/layouts/block-sucessfully";

export default function FormBlock() {
    const [readCheckbox, setReadCheckbox] = useState(false);
    const setSection = useContext(SectionContext);

    return (
        <form className="w-full h-full pt-8 flex flex-col">
            <div className="flex justify-between">
                <div className="relative w-80">
                    <Image 
                        src="/svg/agreement.svg"
                        fill
                        alt="agreement illustration"
                    />
                </div>
                <FormInfoBlock
                    title="Room Information"
                    infos={roomInfo}
                />
                <FormInfoBlock
                    title="Personal Information"
                    infos={personalInfo}
                />
            </div>
            
            <div className="mt-5 h-full flex flex-col justify-between  items-center">
                <div className="w-full flex justify-between items-center">
                    <p className="w-80">
                        {/* Please read all terms before registering the form */}
                    </p>

                    <label className="w-80 flex items-center gap-2 text-md cursor-pointer">
                        <input 
                            type="checkbox"
                            value={readCheckbox}
                            onChange={(e) => setReadCheckbox(!readCheckbox)}
                        />
                        I've already read the terms
                    </label>


                    <label className="relative flex flex-col font-bold text-primary">
                        Total cost  
                        <input 
                            className="w-80 h-12 py-2 pl-5 pr-10 rounded-md font-bold text-center text-xl border-2 bg-white"
                            value="1,200,000đ"
                            disabled
                        />
                    </label>
                </div>


                <button 
                    className="w-80 h-12 rounded-md bg-primary font-bold text-white hover:opacity-95 transition disabled:bg-ec disabled:text-primary"
                    disabled={!readCheckbox}
                    onClick={() => setSection(<SucessfullyBlock title="Register sucessfully" desc="Please check your bill in your invoices section" />)}>
                    Submit
                </button>
            </div>
        </form>
    )
}

const roomInfo = [
    {id: 0, name: "Room ID", value: "10", icon: faAsterisk},
    {id: 1, name: "Type", value: "Standard", icon: faDiamond},
    {id: 2, name: "Cost per month", value: "240,000", icon: faMoneyBill},
    {id: 3, name: "Duration (months)", value: "5", icon: faCalendarDays},
]

const personalInfo = [
    {id: 0, name: "Student ID", value: "N19DCCN018", icon: faIdCard},
    {id: 1, name: "Full name", value: "Nguyen Dang Bac", icon: faSignature},
    {id: 2, name: "Gender", value: "Male", icon: faVenusMars},
    {id: 3, name: "Birthday", value: "01-01-2001", icon: faCakeCandles},
]
