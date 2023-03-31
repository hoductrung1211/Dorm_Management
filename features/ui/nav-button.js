import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    btn,
    isActive, 
    handleNavigate, 
}) {
    let textClassname = "col-span-5 text-left";
    let divClassname = "w-full h-14 grid grid-cols-7 items-center rounded-md cursor-pointer";
    let iconClassname = "col-span-2 justify-self-center text-2xl";

    if (isActive) {
        textClassname += " text-white font-bold";
        iconClassname += " text-white"
        divClassname += " bg-p";
    } else {
        divClassname += " hover:bg-ec"
    }

    return (
        <button className={divClassname}
            onClick={() => handleNavigate(btn.url)}
        >
            <FontAwesomeIcon icon={btn.icon} className={iconClassname} />
            <p className={textClassname}>
                {btn.text}
            </p>
        </button>
    )
}   