import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { userContext } from "../user-context"

export default function GreetingUser() {
    const user = useContext(userContext);
    
    return (
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
    )
}