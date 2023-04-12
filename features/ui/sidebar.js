import GreetingUser from "../user/components/greeting-user";
import NavButton from '../ui/nav-button';
import { faGear, faOutdent, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Authentication from "../../pages/api/student-auth/AuthService"
import { studentURL, userURL } from "../utils/links";
import { useRouter } from "next/router";


const userNavs = [
    {id: 11, text: "Settings", icon: faGear, url: null}, 
]

export default function Sidebar({
    children,
    selectedId,
    handleNavigate,
}) {
    const router = useRouter();
    function handleLogout(e){
        e.preventDefault()
        Authentication.logout()
        router.push(userURL.login)
    }

    return (
        <aside className="fixed inset-y-0 left-0 py-10 px-5 bg-fa">
            <div className="w-64 h-full relative">
                <GreetingUser />

                {/* Navigation Section */}
                <section className="mt-10">
                    <p className="text-sm">General</p>
                    {children}
                </section>

                {/* User Actions  */}
                <section className="absolute inset-x-0 bottom-0">
                    <p className="text-sm">User</p>

                    <nav className="">
                        {userNavs.map(nav => 
                            <NavButton 
                                key={nav.id} 
                                selected={nav.id == selectedId} 
                                btn={nav} 
                                handleNavigate={handleNavigate}
                            />
                        )}
                    </nav>
                    
                    <button 
                        className="w-full h-14 grid grid-cols-7 items-center rounded-md cursor-pointer text-red hover:bg-ec"
                        onClick={handleLogout}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className="col-span-2 justify-self-center text-2xl" />
                        <p onClick={handleLogout} className="col-span-5 text-left">
                            Log out
                        </p>
                    </button>
                </section>
            </div>
        </aside>
    )
}