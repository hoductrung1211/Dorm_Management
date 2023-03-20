import { faArrowRightFromBracket, faBell, faBook, faGear, faHammer, faReceipt, faShuttleSpace } from "@fortawesome/free-solid-svg-icons"
import {  useRef, useState } from "react"
import ActionButton from "./components/ActionButton"
import Sidebar from "./components/Sidebar"
import MyRoom from './components/MyRoom';

const initStudentNav = [
    {id: 0, type: "student", text: "My room", icon: faShuttleSpace, mainSection: MyRoom},
    {id: 1, type: "student", text: "Invoices", icon: faReceipt, mainSection: undefined},
    {id: 2, type: "student", text: "Maintenance requests", icon: faHammer, mainSection: undefined},
    {id: 3, type: "student", text: "Notifications", icon: faBell, mainSection: undefined},
    {id: 4, type: "student", text: "Resources", icon: faBook, mainSection: undefined},
    {id: 5, type: "user", text: "Settings", icon: faGear, mainSection: undefined},
    {id: 6, type: "user", text: "Log out", icon: faArrowRightFromBracket, mainSection: undefined},
]

export default function Page() {
    const user = useRef({id: "N19DCCN018", name: "Nguyen Dang Bac", role: false});
    const [navigation, setNavigation] = useState(initStudentNav);
    const [selectedIdBtn, setSelectedIdBtn] = useState(0);

    let main = navigation.find(nav => nav.id === selectedIdBtn).mainSection();

    function handleActionEvent(id) {
        setSelectedIdBtn(id);
    }

    return (
        <>
            <Sidebar
                handleActionEvent={handleActionEvent}
                user={user.current}
                selectedId={selectedIdBtn}
                userNav={navigation.filter(nav => nav.type === 'user')}>
                <StudentNav
                    studentNav={navigation.filter(nav => nav.type === 'student')}
                    handleActionEvent={handleActionEvent}
                    selectedId={selectedIdBtn} />
            </Sidebar>

            <main className="ml-20 py-10 fixed left-1/2 inset-y-0 w-4/6 h-screen -translate-x-1/2">
                {main}
            </main>
        </>
    )
}

function StudentNav({
    studentNav,
    handleActionEvent,
    selectedId,
}) {

    return (
        <nav className="">
            {studentNav.map(nav => 
                <ActionButton 
                    key={nav.id} 
                    selected={nav.id == selectedId} 
                    btn={nav}
                    handleActionEvent={handleActionEvent}
                />
            )}
        </nav>
    )
};
 