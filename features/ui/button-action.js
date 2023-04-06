export default function ActionButton({
    title,
    onClick,
    bgRed = false,
}) {
    let bgColor = "bg-ec text-dark active:bg-slate-100";
    if (bgRed) bgColor = "bg-red text-white active:bg-red-700"

    return (
        <button className={bgColor + " w-full h-12 grid place-items-center rounded-md  text-lg font-bold "}>
            {title}
        </button>
    )
}