import {  useState } from "react"
import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user-context";
import StudentNav from '../../features/student/nav';
import Dashboard from "../../features/student/dashboard-my-room/index";
import Main from "../../features/ui/main";

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

            <Main>
                <Dashboard />
            </Main>
        </userContext.Provider>
    )
}

 