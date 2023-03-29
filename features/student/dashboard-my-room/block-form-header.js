import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import RegisterSection from "./section-register";
import { SectionContext } from "./section.context";

export default function FormHeader() {
    const setSection = useContext(SectionContext);

    return (
        <header className="relative flex justify-center items-center w-full h-10 text-2xl">
            <button 
                className="absolute left-0 h-12 w-12 rounded-full active:bg-ec transition text-3xl"
                onClick={() => setSection(<RegisterSection />)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            Register Form
        </header>
    )
}