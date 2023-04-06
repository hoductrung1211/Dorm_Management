export default function DataColumn({
    text,
    className
}) {
    let classname = "col-span-1 p-4 " + className;
    return (
        <div className={classname}>
            {text}
        </div>
    )
}