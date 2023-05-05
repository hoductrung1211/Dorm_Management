import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"

export default function InputFilter({
    placeholder,
    handleTextChange,
    textValue,
}) {
    return (
        <div className="relative h-full w-full">
            <input 
                className="h-full w-full pl-4 pr-12 outline-none bg-fa rounded-md"
                placeholder={placeholder}
                onChange={e => handleTextChange(e.target.value)}
                value={textValue}
            />
            {
                textValue =="" ? 
                <FontAwesomeIcon
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    icon={faMagnifyingGlass}
                /> :
                <FontAwesomeIcon
                    className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-red"
                    icon={faXmarkCircle}
                    onClick={() =>handleTextChange("")}
                />
            }
            
        </div>
    )
}

