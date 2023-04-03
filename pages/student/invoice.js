import { useRouter } from "next/router";
import { userContext } from "../../features/user/user.context";
import StudentNav from '../../features/student/nav';
import Main from "../../features/layouts/main";
import Sidebar from "../../features/ui/sidebar";
import InvoiceDashboard from "../../features/student/dashboard-invoice";

export default function Page() {
    const user = {
        id: "N19DCCN018", 
        name: "Nguyen Dang Bac", 
        role: false, 
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
                <StudentNav
                    activeNavID={activeNavID}
                    handleNavigate={handleNavigate}
                />
            </Sidebar>

            <Main>
                <InvoiceDashboard />
            </Main>
        </userContext.Provider>
    )
}