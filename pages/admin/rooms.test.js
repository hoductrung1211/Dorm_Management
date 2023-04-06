import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user.context";
import AdminNav from '../../features/admin/nav';
import Main from "../../features/layouts/main";
import { useRouter } from "next/router";
import RoomsDashboard from "../../features/admin/dashboard-rooms/index.test";


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

    return (
        <userContext.Provider value={user}>
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
        </userContext.Provider>
    )
}

 