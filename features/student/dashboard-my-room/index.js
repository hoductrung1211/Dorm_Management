import { useState, useEffect } from "react";
import Container from "../../user/layouts/db-container";
import RegisterSection from "./section-register";  
import {SectionContext} from '../../utils/section.context';  
import RoomDetailSection from "./section-room-detail";
import StudentSerivce from "../../../pages/api/service/Contract-StudentService"
import { useRouter } from "next/router";
import {studentURL,userURL} from '../../utils/links'


export default function MyRoomDashboard() {
    
    const router = useRouter();
    const [menuID, setMenuID] = useState(0);
    const [checkCondition, setCheckCondition] = useState(false)
    const [section, setSection] = useState(undefined)
    const [errorApi, setErrorApi]= useState(undefined)
    // const [studentDetails, setStudentDetails] = useState({})
    const menus = [
        {
            id: 0,
            text: "Room detail", 
            section: <RoomDetailSection checkCondition={checkCondition} />,
        }, 
        {
            id: 1,
            text: "Register", 
            section: <RegisterSection  />,
        }
    ]   
    useEffect(()=>{
        
        StudentSerivce.checkForRegistration().then(res=>{
            setErrorApi(false)
            setSection(<RoomDetailSection checkCondition={res.data} />)
            // if Time allowed for registration
            if(res.data===true){
                setCheckCondition(true)
                setMenuID(nextID);
            }
            else{
                setCheckCondition(false)
                
            }
        }).catch((error)=>{
            if( error.response ){
                
                if(error.response.status===401){
                    router.push(userURL.login)
                }
            }
            else{
                setErrorApi(true)
            }
        })

    },[])

    function handleChangeMenu(nextID) {
        // setMenuID(nextID);
        StudentSerivce.checkForRegistration().then(res=>{

            // if Time allowed for registration
            if(res.data===true){
                setCheckCondition(true)
                setMenuID(nextID);
            }
            else{
                setCheckCondition(false)
            }
        }).catch((error)=>{
            if( error.response ){
                if(error.response.status===401){
                    router.push(userURL.login)
                }
            }
        })
        
    }
    
    return (
        
        <SectionContext.Provider value={setSection}>
            
            <nav className="translate-y-0.5 flex z-10">
            {menus.map(menu =>
                <MenuButton
                    key={menu.id}
                    btn={menu}
                    selected={menu.id == menuID}
                    handleChangeMenu={handleChangeMenu}
                    checkCondition={checkCondition}
                    handleChangeSection={setSection}
                />
            )}
            
            </nav>
            <div className="my-room-dashboard relative h-full flex flex-col">
                <Container>
                    {section}
                </Container>
            </div>
            
        </SectionContext.Provider> 
    )
}

function MenuButton({
    btn,
    selected,
    handleChangeMenu,
    checkCondition,
    handleChangeSection,
}) {
    let classname = "w-40 h-14 grid place-items-center border-ec  border-2 rounded-tl-xl rounded-tr-xl bg-ec cursor-pointer";
    if (selected) 
        classname += " bg-white border-b-white"
    
    return (
        <div 
            className={classname}
            onClick={() => {
                handleChangeMenu(btn.id);
                if(checkCondition===true){
                    handleChangeSection(btn.section);
                }
                // handleChangeMenu(btn.id);
                // handleChangeSection(btn.section);
            }}>
            {btn.text}
            
        </div> 
    )  
}