import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InputEditing({
    icon,
    value,
    type = "text",
    handleChange,
}) {
    return (
        <label className="relative ">
            <FontAwesomeIcon icon={icon} className="absolute text-xl text-primary left-6 -translate-x-1/2 top-1/2 -translate-y-1/2" />

            <input
                type={type} 
                className="text-lg pl-12 pr-4 py-2 outline-ec bg-fa"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            />
        </label>
    )
}