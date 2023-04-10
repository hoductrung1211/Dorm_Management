export default function TextareaEditing({
    value,
    handleChange,
}) {
    return (
        <textarea
            className="h-full flex flex-col gap-2 border-2 rounded-md p-2 resize-none outline-none bg-fa border-fa focus:border-ec"
            onChange={(e) => handleChange(e.target.value)}
        >
            {value}
        </textarea>
    )
}