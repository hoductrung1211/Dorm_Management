export default function OrderButtoon({
    button,
}) {
    let className = "flex items-center justify-center col-span-1 bg-ec   hover:opacity-80";

    return (
        <button className={className} >
            {button.text}
        </button>
    )
}   