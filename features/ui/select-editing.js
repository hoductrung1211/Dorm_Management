import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SelectEditing({
    icon,
    options,
    handleChange,
    value,
}) {
    return (
        <div className="relative ">

        <select 
            className="text-lg pl-12 w-64 pr-4 py-2 outline-ec bg-fa"
            onChange={e => {
                handleChange(e.target.value);
            }}
        >
            {
                options.map(option => 
                    <option value={option.value} selected={option.value == value}>{option.text}</option>                    
                    )
                }
        </select>
        <FontAwesomeIcon icon={icon} className="absolute text-xl text-primary left-6 -translate-x-1/2 top-1/2 -translate-y-1/2" />
        </div>

    )
}