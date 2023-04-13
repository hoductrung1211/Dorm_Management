import { faAsterisk, faCakeCandles, faCalendar, faCalendarDays, faDiamond, faIdCard, faPhone, faMoneyBill, faSignature, faVenusMars } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import FormInfoBlock from "./block-form-info"
import {SectionContext} from '../../utils/section.context';  
import SucessfullyBlock from "../../user/layouts/block-sucessfully";
import FailedBlock from "../../user/layouts/block-failed";
import StudentSerivce from "../../../pages/api/service/Contract-StudentService"
// import RoomDetailSection from "./section-room-detail";
import { useRouter } from "next/navigation";                       
// import {studentURL,userURL} from '../../utils/links'


export default function FormBlock({dataContract}) {
    const [readCheckbox, setReadCheckbox] = useState(false);
    const setSection = useContext(SectionContext);
    const router= useRouter()
    // const [dataContract, setDataContract] = useState({})
    function renderGender(gender){
        if(gender){
            return "Male"
        }
        else{
            return "Female"
        }
    }
    function handleSubmitCreateContract(e){
        e.preventDefault()
        StudentSerivce.createContract(dataContract.hopDongKTX.idPhongKTX).then(res=>{
            if(res.data==true){
                setSection(<SucessfullyBlock title="Register sucessfully" desc="Please check your bill in your invoices section" />)
                setTimeout(()=>{
                    router.refresh()
                },2000)
            }
            else{
                setSection(<FailedBlock title="Register failed" desc="An error occurred during registration, please try again" />)
            }
        })

    }
    

        const roomInfo = [
            {id: 0, name: "Room ID", value: dataContract.hopDongKTX.idPhongKTX, icon: faAsterisk},
            {id: 1, name: "Type", value: dataContract.loaiKTX.tenLoai, icon: faDiamond},
            {id: 2, name: "Cost per month", value: dataContract.loaiKTX.giaPhong, icon: faMoneyBill},
            // {id: 3, name: "Duration (months)", value: "5", icon: faCalendarDays},
            {id: 3, name: "Date From - Date End", value: dataContract.dateFrom+' - '+dataContract.dateEnd, icon: faCalendar},
        ]
        const personalInfo = [
            {id: 0, name: "Student ID", value: dataContract.student.username, icon: faIdCard},
            {id: 1, name: "Full name", value:dataContract.student.hoTen, icon: faSignature},
            {id: 2, name: "Gender", value: renderGender(dataContract.student.gioiTinh), icon: faVenusMars},
            {id: 3, name: "Phone", value: dataContract.student.sdt, icon: faPhone},
            // {id: 3, name: "mail", value: "ádlkậdlskl;", icon: faCakeCandles},
        ]
        
        return (
            <form onSubmit={handleSubmitCreateContract} className="w-full h-full pt-8 flex flex-col">
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
                                value={dataContract.total+'.000 VND'}
                                disabled
                            />
                        </label>
                    </div>


                    <button 
                        className="w-80 h-12 rounded-md bg-primary font-bold text-white hover:opacity-95 transition disabled:bg-ec disabled:text-primary"
                        disabled={!readCheckbox}
                        // onClick={() => setSection(<SucessfullyBlock title="Register sucessfully" desc="Please check your bill in your invoices section" />)}
                        >
                        Submit
                    </button>
                </div>
            </form>
        )
}

// const roomInfo = [
//     {id: 0, name: "Room ID", value: "10", icon: faAsterisk},
//     {id: 1, name: "Type", value: "Standard", icon: faDiamond},
//     {id: 2, name: "Cost per month", value: "240,000", icon: faMoneyBill},
//     // {id: 3, name: "Duration (months)", value: "5", icon: faCalendarDays},
//     {id: 3, name: "Date From - Date End", value: "01/01/2001-01/01/2001", icon: faCalendar},
// ]

// const personalInfo = [
//     {id: 0, name: "Student ID", value: "N19DCCN018", icon: faIdCard},
//     {id: 1, name: "Full name", value: "Nguyen Dang Bac", icon: faSignature},
//     {id: 2, name: "Gender", value: "Male", icon: faVenusMars},
//     {id: 3, name: "Birthday", value: "0000", icon: faPhone},
//     // {id: 3, name: "mail", value: "ádlkậdlskl;", icon: faCakeCandles},
// ]
