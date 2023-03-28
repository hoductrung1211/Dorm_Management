import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    btn,
    selected, 
    handleNavigate,
}) {
    let textClassname = "col-span-5";
    let divClassname = "h-14 grid grid-cols-7 items-center rounded-md cursor-pointer";
    let iconClassname = "col-span-2 justify-self-center text-2xl";

    if (selected) {
        textClassname += " text-white font-bold";
        iconClassname += " text-white"
        divClassname += " bg-p";
    } else {
        divClassname += " hover:bg-ec"
    }

    return (
        <div className={divClassname}
            onClick={() => handleNavigate(btn.id)}
        >
            <FontAwesomeIcon icon={btn.icon} className={iconClassname} />
            <p className={textClassname}>
                {btn.text}
            </p>
        </div>
    )
}   