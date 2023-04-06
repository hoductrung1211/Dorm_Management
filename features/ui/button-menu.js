
export default function MenuButton({
    menu,
    isActive,
    handleChangeActiveMenu,
}) {
    let buttonClassName = "relative h-full w-40  border-2 border-b-0 border-ec rounded-tl-lg rounded-tr-lg";
    let lineClassName = "absolute -bottom-0.5 w-full h-0.5 ";

    if (isActive) {
        buttonClassName += " bg-white";
        lineClassName += " bg-white";
    } else {
        buttonClassName += " bg-ec";
        lineClassName += " bg-ec";         
    }

    return (
        <button 
            className={buttonClassName}
            onClick={() => handleChangeActiveMenu(menu.id)}    
        >
            {menu.text}
            <div className={lineClassName} />
        </button>
    )
}