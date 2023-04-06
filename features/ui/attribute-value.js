import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function AttributeValue({ icon, value }) {
    return (
        <p className="flex items-center gap-2 font-bold text-primary text-xl">
            <FontAwesomeIcon 
                icon={icon}
                className="w-1/12 text-2xl mr-2"
            />
            <span className="truncate">{value}</span>
        </p>
    )
}