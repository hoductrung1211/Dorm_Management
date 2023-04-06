export default function DataColumn({
    text,
    className,
    children,
}) {
    let classname = "col-span-1 p-4 " + className;
    return (
        <div className={classname}>
            {children} 
            {text}
        </div>
    )
}