import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user.context";
import AdminNav from '../../features/admin/nav';
import Main from "../../features/layouts/main";
import { useRouter } from "next/router";
import RoomsDashboard from "../../features/admin/rooms.dashboard";
import {alertContext} from "../../features/utils/alert.context";
import Alert from "../../features/ui/alert";
import { useState } from "react";

export default function Page() {
    const user = {
        id: "N19DCCN018", 
        name: "Ho Duc Trung", 
        role: true, 
        gender: true,
        dateOfBirth: '01-01-2001',
    };
    const router = useRouter();
    const activeNavID = 1;
    
    function handleNavigate(nextURL) {
        router.push(nextURL); 
    }

    
    const [alert, setAlert] = useState({
        type: true,
        message: "Add successfully",
        isShow: false,
    });

    function showAlert(type, message) {
        setAlert({
            type: type,
            message: message,
            isShow: true
        });

        setTimeout(() => {
            setAlert({
                ...alert,
                isShow: false,
            })
        }, 3000);
    }
    return (
        <userContext.Provider value={user}>
        <alertContext.Provider value={showAlert}>
        
            <Sidebar
                activeNavID={activeNavID}
                handleNavigate={handleNavigate}
            >
                <AdminNav
                    activeNavID={activeNavID}
                    handleNavigate={handleNavigate}
                />
            </Sidebar>

            <Main>
                <RoomsDashboard />
            </Main>

            <Alert
                type={alert.type}
                message={alert.message}
                isShow={alert.isShow}
            />
        </alertContext.Provider>
        </userContext.Provider>
    )
}

 