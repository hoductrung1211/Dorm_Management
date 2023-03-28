import { useState } from "react";
import Container from "../../user/layouts/db-container";
import RegisterSection from "./section-register"; 

const menus = [
    {
        id: 0,
        text: "Room detail",
        section: RegisterSection,
    }, 
    {
        id: 1,
        text: "Register",
        section: RegisterSection,
    }
]

export default function MyRoomDashboard() {
    const [selectedID, setSelectedID] = useState(1);
    const  section = menus.find(menu => menu.id == selectedID).section();

    function handleChangeSection(nextID) {
        setSelectedID(nextID);
    }

    return (
        <>
            <nav className="translate-y-0.5 flex z-10">
            {menus.map(menu =>
                <MenuButton
                    key={menu.id}
                    btn={menu}
                    selected={menu.id == selectedID}
                    handleChangeSection={handleChangeSection}
                />
            )}
            </nav>
            <div className="my-room-dashboard relative h-full flex flex-col">
                <Container>
                    {section}
                </Container>
            </div>
            
        </>
    )
}

function MenuButton({
    btn,
    selected,
    handleChangeSection,
}) {
    let classname = "w-40 h-14 grid place-items-center border-ec  border-2 rounded-tl-xl rounded-tr-xl bg-ec cursor-pointer";
    if (selected) 
        classname += " bg-white border-b-white"
    
    return (
        <div 
            className={classname}
            onClick={() => handleChangeSection(btn.id)}>
            {btn.text}
        </div> 
    )  
}