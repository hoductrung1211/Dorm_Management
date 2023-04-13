import { faDiamond, faBed, faUsers, faWifi, faBox, faFaucetDrip, faBolt, faTv, faEye, faEyeSlash, faIdCard, faSignature, faPhone, faCakeCandles, faVenusMars, faMobile, faAt, faRightFromBracket, faRightToBracket, faMoneyBill, faMoneyCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from "react";
const icons = [faBed, faBox, faFaucetDrip, faBolt, faTv];
import StudentSerivce from "../../../pages/api/service/Contract-StudentService"
import StdService from "../../../pages/api/service/Home-StudentService"

export default function RoomDetailSection({checkCondition}) {

    const [personalInfo, setPersionalInfo] = useState({})
    const [contractInfo, setContractInfo] = useState({})
    // const contractInfoDefault={

    // }
    useEffect(()=>{
        // True: Chưa đăng ký KTX, chưa có data Contract
        
        if(!checkCondition){
            StudentSerivce.getViewAfterCreatedContract().then(res=>{
                console.log(res.data)
                setPersionalInfo(res.data.student)
                setContractInfo(res.data)
            })
            .catch(error=>{
                if(error.response){
                    console.log(error.response)
                }
            })
        } 
        // False: Lấy thông tin sv
        else{
            StdService.getStudentDetails().then(res=>{
                console.log(res.data)
                setPersionalInfo(res.data)
                

            }).catch(error=>{
                if(error.response){
                    console.log(error.response.status)
                }
            })
        }
    },[])

    return (
        <section className="h-full w-full p-5">
            <div className="h-full w-full flex flex-col p-5 border-2 rounded-lg shadow-md">
                <h2 className="text-2xl text-center ">
                    Room detail dashboard
                </h2>

                <div className="h-full grid grid-cols-3 pt-10 gap-3 ">
                    <RoomSection contractInfo={contractInfo}/>
                    <PersonalSection personalInfo={personalInfo} />
                    <ActionsSection />
                </div>
            </div>
        </section>
    )
}

function AttributeSection({ title, children }) {
    return (
        <>
            <h4 className="mt-7 mb-2 text-xl font-bold first:mt-0">
                {title}
            </h4>
            <span className="font-medium">{children}</span>
        </>
    )
}

function AttributeValue({ icon, value }) {
    return (
        <p className="flex items-center gap-2 font-bold text-primary text-xl">
            <FontAwesomeIcon 
                icon={icon}
                className="w-1/12 text-2xl mr-2"
            />
            <span className="truncate">{value}</span>
        </p>
    )
}

function Button({
    title,
    onClick,
}) {
    return (
        <button className="mt-3 first:mt-0 w-full h-12 grid place-items-center rounded-md bg-ec text-lg font-bold active:bg-slate-100">
            {title}
        </button>
    )
}

function RoomSection({contractInfo}) {
    const [isShow, setIsShow] = useState(false);
    
   
    if(Object.keys(contractInfo).length === 0){
        
        contractInfo={
            hopDongKTX: {
                idPhongKTX: '',
                ngayLamDon: '',
                trangThai: '',
            },
            loaiKTX:{
                tenLoai: ''
            },
            datePayment:'',
            dateFrom:'',
            dateEnd: ''

        }
    }

    return (
        <section className="flex flex-col">
            <AttributeSection title="Room number">
                <span className="text-3xl text-primary font-bold">
                    {contractInfo.hopDongKTX.idPhongKTX}
                </span>
            </AttributeSection>

            <AttributeSection title="Room Type">
                    <AttributeValue 
                        icon={faDiamond}
                        value={contractInfo.loaiKTX.tenLoai}
                    />
                
                {/* <div className="mt-1 h-10 px-5 gap-5 flex items-center border-2 rounded-md">
                {icons.map(icon => 
                    <FontAwesomeIcon key={icon.iconName} icon={icon} className="text-2xl"  />
                )}
                </div> */}
            </AttributeSection>

            <AttributeSection title="Application date">
                
                {contractInfo.hopDongKTX.ngayLamDon}
                {/* <AttributeValue 
                    icon={faWifi}
                    value="phongJ10"
                />

                <div className="mt-3 relative">
                    <input 
                        className="h-12 w-full px-5 text-lg border-2 rounded-md bg-fa border-ec"
                        value="0943394369"
                        type={isShow ? "text" : "password"}
                        disabled
                    />

                    <button className="absolute w-10 h-10 right-5 top-1/2 -translate-y-1/2 translate-x-2 text-xl rounded-full active:bg-ec"
                        onClick={() => setIsShow(!isShow)}
                    >
                        {isShow ?
                        <FontAwesomeIcon icon={faEye} /> :
                        <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </button>
                </div> */}
            </AttributeSection>

            <AttributeSection title="Expiry date">
                
                {contractInfo.datePayment}
            </AttributeSection>

            <AttributeSection title="Payment Status">
                <AttributeValue 
                    icon={faMoneyCheck}
                    value={contractInfo.hopDongKTX.trangThai ? "Paid" : "Pending"}
                />
                {/* <span className="text-orange text-xl"></span> */}
                
                {/* <AttributeValue 
                    icon={faUsers}
                    value="Number of roomates: 1"
                />

                <Button title="Show all roomates" /> */}
            </AttributeSection>
        </section>
    )
}

function PersonalSection() {
    return (
        <section className="flex flex-col">
            <AttributeSection title="Personal Information">
                <div className="flex flex-col gap-6 px-5 py-4 border-2 rounded-lg ">
                    <AttributeValue icon={faIdCard} value="N19DCCN018" />
                    <AttributeValue icon={faSignature} value="Nguyen Dang Bac" />
                    <AttributeValue icon={faVenusMars} value="Male" />
                    <AttributeValue icon={faCakeCandles} value="01-01-2001" />
                    <AttributeValue icon={faAt} value="nguyendangbac@gmail.com.vn" />
                    <AttributeValue icon={faMobile} value="0123431456" />
                </div>
            </AttributeSection>
        </section>
    )
}

function ActionsSection() {
    return (
        <section className="flex flex-col">
            <AttributeSection title="Actions">
                <div className="flex flex-col gap-5 border-2 px-5 py-4 rounded-lg ">
                    <Button title="Request Housekeeping" />
                    <Button title="Request Room Transfer" />
                    <Button title="View Room Availability" />
                    <Button title="Request Extra Duration" />
                </div>
            </AttributeSection>
            <AttributeSection title="Move in and Move out">
                <p className="flex items-center gap-2 font-bold text-green text-xl">
                    <FontAwesomeIcon 
                        icon={faRightToBracket}
                        className="ml-5 w-1/12 text-2xl mr-2"
                    />
                    {contractInfo.dateFrom}
                </p>
                <p className="flex items-center gap-2 font-bold text-red text-xl">
                    <FontAwesomeIcon 
                        icon={faRightFromBracket}
                        className="ml-5 w-1/12 text-2xl mr-2"
                    />
                    {contractInfo.dateEnd}
                </p>
            </AttributeSection>

            
        </section>
    )
}

function PersonalSection({personalInfo}) {
    function renderGender(gender){
        if(gender){
            return "Male"
        }
        else{
            return "Female"
        }
    }
    return (
        <section className="flex flex-col">
            <AttributeSection title="Personal Information">
                <div className="flex flex-col gap-6 px-5 py-4 border-2 rounded-lg ">
                    <AttributeValue icon={faIdCard} value={personalInfo.username} />
                    <AttributeValue icon={faSignature} value={personalInfo.hoTen} />
                    <AttributeValue icon={faVenusMars} value={renderGender(personalInfo.username) } />
                    <AttributeValue icon={faCakeCandles} value={personalInfo.ngaySinh}/>
                    <AttributeValue icon={faAt} value={personalInfo.mail} />
                    <AttributeValue icon={faMobile} value={personalInfo.sdt} />
                </div>
            </AttributeSection>

            
        </section>
    )
}

function ActionsSection() {
    return (
        <section className="flex flex-col">
            <AttributeSection title="Actions">
                <div className="flex flex-col gap-5 border-2 px-5 py-4 rounded-lg ">
                    <Button title="Contract extension" />
                    <Button title="Cancellation of contract" />
                    <Button title="Request Room Transfer" />
                    <Button title="View Room Availability" />
                </div>
            </AttributeSection>
        </section>
    )
}