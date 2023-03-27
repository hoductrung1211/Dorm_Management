import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionButton({
    btn,
    selected,
    handleActionEvent,
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

    function handleClick() {
        if (btn.action == 'layout')
            handleActionEvent(btn.id);
        else btn.handleAction();
    }

    return (
        <div className={divClassname} onClick={handleClick}>
            <FontAwesomeIcon icon={btn.icon} className={iconClassname} />
            <p className={textClassname}>
                {btn.text}
            </p>
        </div>
    )
}   