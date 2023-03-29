import {  useState } from "react"
import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user.context";
import StudentNav from '../../features/student/nav';
import MyRoomDashboard from "../../features/student/dashboard-my-room/index";
import Main from "../../features/ui/main";

const menus = [
    {
        id: 0,
        text: "Room detail",
        active: true,
        url: 'student/room-detail',
    }, 
    {
        id: 1,
        text: "Register",
        active: false,
        url: 'student/room-register',
    }
]
 

export default function Page() {
    const user = {
        id: "N19DCCN018", 
        name: "Nguyen Dang Bac", 
        role: false, 
        gender: true,
        dateOfBirth: '01-01-2001',
    };
    const [selectedId, setSelectedId] = useState(0);
    
    function handleNavigate(nextSelectedId) {
        setSelectedId(nextSelectedId);
    }

    return (
        <userContext.Provider value={user}>
            <Sidebar
                selectedId={selectedId}
                handleNavigate={handleNavigate}
            >
                <StudentNav
                    selectedId={selectedId}
                    handleNavigate={handleNavigate}
                />
            </Sidebar>

            <Main>
                <nav className="translate-y-0.5 flex z-10">
                {menus.map(menu =>
                    <MenuButton
                        key={menu.id}
                        btn={menu}
                        selected={menu.id == menuID}
                        handleChangeMenu={handleChangeMenu}
                    />
                )}
                </nav>
                <div className="my-room-dashboard relative h-full flex flex-col">
                    <Container>
                        {section}
                    </Container>
                </div>
            </Main>
        </userContext.Provider>
    )
}

function MenuButton({
    btn,
    selected,
    handleChangeMenu,
}) {
    let classname = "w-40 h-14 grid place-items-center border-ec  border-2 rounded-tl-xl rounded-tr-xl bg-ec cursor-pointer";
    if (selected) 
        classname += " bg-white border-b-white"
    
    return (
        <div 
            className={classname}
            onClick={() => handleChangeMenu(btn.id)}>
            {btn.text}
        </div> 
    )  
}
 