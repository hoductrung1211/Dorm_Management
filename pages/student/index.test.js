import { faArrowRightFromBracket, faBell, faBook, faGear, faHammer, faReceipt, faShuttleSpace } from "@fortawesome/free-solid-svg-icons"
import {  useState } from "react"
import ActionButton from "../components/ActionButton"
import Sidebar from "../../features/ui/sidebar";
import MyRoom from '../layouts/MyRoom'; 
import { useRouter } from "next/router";
import { userContext } from "../../features/user/user-context";

import StudentNav from '../../features/student/nav';


export default function Page() {
    const user = {id: "N19DCCN018", name: "Nguyen Dang Bac", role: false};
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

            {/* <main className="ml-20 py-10 fixed left-1/2 inset-y-0 w-4/6 h-screen -translate-x-1/2">
                {main}
            </main> */}
        </userContext.Provider>
    )
}

 