import { faArrowDownWideShort, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderButtoon({
    button,
    sortingButton,
    handleClick,
}) {
    let icon = sortingButton.isAsc ? faArrowDownWideShort : faArrowUpWideShort;
    let className = "flex items-center justify-center col-span-1 ";
    if (sortingButton.id == button.id) className += " bg-fa text-primary";
    else className += "bg-ec hover:opacity-80";

    return (
        <button
            className={className}
            onClick={() => handleClick(button.id)}
        >
            {button.text}

            {sortingButton.id == button.id && <FontAwesomeIcon icon={icon} className="ml-4 text-xl" />}
        </button>

        
    )
}   