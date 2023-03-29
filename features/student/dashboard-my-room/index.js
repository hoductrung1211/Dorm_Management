import { useContext, useState } from "react";
import Container from "../../user/layouts/db-container";
import RegisterSection from "./section-register"; 
import RegisterFormSection from "./section-register-form"; 
import {SectionContext} from './section.context';
import SucessfullyBlock from "../../user/layouts/block-sucessfully";

const menus = [
    {
        id: 0,
        text: "Room detail", 
        section: <SucessfullyBlock title="Register sucessfully" desc="Please check your bill in your invoices section" />,
    }, 
    {
        id: 1,
        text: "Register", 
        section: <RegisterSection />,
    }
]

export default function MyRoomDashboard() {
    const [menuID, setMenuID] = useState(1);
    const [section, setSection] = useState(<RegisterSection />)


    function handleChangeMenu(nextID) {
        setMenuID(nextID);
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
                handleChangeSection(btn.section);
            }}>
            {btn.text}
        </div> 
    )  
}