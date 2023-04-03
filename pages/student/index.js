import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user.context";
import StudentNav from '../../features/student/nav';
import MyRoomDashboard from "../../features/student/dashboard-my-room/index";
import Main from "../../features/layouts/main";
import { useRouter } from "next/router";


export default function Page() {
    const user = {
        id: "N19DCCN018", 
        name: "Nguyen Dang Bac", 
        role: false, 
        gender: true,
        dateOfBirth: '01-01-2001',
    };
    const router = useRouter();
    const activeNavID = 0;
    
    function handleNavigate(nextURL) {
        router.push(nextURL); 
    }

    return (
        <userContext.Provider value={user}>
            <Sidebar
                activeNavID={activeNavID}
                handleNavigate={handleNavigate}
            >
                <StudentNav
                    activeNavID={activeNavID}
                    handleNavigate={handleNavigate}
                />
            </Sidebar>

            <Main>
                <MyRoomDashboard />
            </Main>
        </userContext.Provider>
    )
}

 