import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faXmark, faInfoCircle} from "@fortawesome/free-solid-svg-icons";


export default function SectionInfoHeader({
    title,
    setViewedId,
}) {
    return (
        <header className="flex-shrink-0 flex justify-between items-center h-12 px-4 bg-primary rounded-tl-lg rounded-tr-lg">
            <div className="flex items-center gap-3 text-white font-bold">
                <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
                {title}
            </div>
            
            <button 
                className="ml-full h-10 w-10 rounded-full flex justify-center items-center hover:bg-fa text-white hover:text-b  transition"
                onClick={() => setViewedId(null)} >
                <FontAwesomeIcon icon={faXmark} className="h-6 w-6"/>
            </button>
        </header>
    )
}