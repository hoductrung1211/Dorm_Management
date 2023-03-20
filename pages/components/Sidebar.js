import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "../components/ActionButton"


export default function Sidebar({
    handleActionEvent,
    selectedId,
    userNav,
    user,
    children,
}) {
    return (
        <aside className="fixed inset-y-0 left-0 py-10 px-5 bg-ec">
            <div className="w-64 h-full relative">
                {/* User Information */}
                <section className="h-14 grid grid-cols-7 items-center">
                    <FontAwesomeIcon className="col-span-2 justify-self-center text-4xl" icon={faUserCircle} />

                    <div className="flex flex-col justify-between col-span-5 h-full">
                        <p className="text-lg font-bold">
                            {user.name}
                        </p>
                        <p className="">
                            {user.role ? "Manager Account" : "Student Account"}
                        </p>
                    </div>
                </section>

                {/* Navigation Section */}
                <section className="mt-10">
                    <p className="text-sm">General</p>
                    {children}
                </section>

                {/* User Actions  */}
                <section className="absolute inset-x-0 bottom-0">
                    <p className="text-sm">User</p>
                    {userNav.map(nav => 
                        <ActionButton 
                            key={nav.id} 
                            selected={nav.id == selectedId} 
                            btn={nav}
                            handleActionEvent={handleActionEvent}
                        /> 
                    )}
                    
                </section>
            </div>
        </aside>
    )
}