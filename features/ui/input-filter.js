import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function InputFilter({
    placeholder,
    handleTextChange,
    textValue,
}) {
    return (
        <placeholder className="relative h-full w-full">
            <input 
                className="h-full w-full pl-4 pr-12 outline-none bg-fa rounded-md"
                placeholder={placeholder}
                onChange={e => handleTextChange(e.target.value)}
                value={textValue}
            />
            <FontAwesomeIcon
                className="absolute right-4 top-1/2 -translate-y-1/2"
                icon={faMagnifyingGlass}
            />
        </placeholder>
    )
}

