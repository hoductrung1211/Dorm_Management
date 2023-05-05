export default function OrderButtoon({
    button,
    handleClick,
    children
}) {
    let className = "flex items-center justify-center col-span-1 bg-ec   hover:opacity-80";


    return (
        <button onClick={handleClick} className={className} >
            {button.text}
            {children}
        </button>
        
    )
}   