export default function FilterSelection({
    title,
    options,
    handleChangeSelection,
}) {
    return (
        <div className="flex items-center h-full gap-2">
            {title}
            <select
                className="w-40 h-full text-center rounded-md outline-none cursor-pointer bg-fa"
                onChange={e => handleChangeSelection(e.target.value)}    
            >
            {options.map(option => 
                <option key={option.value} value={option.value + ""}>{option.text}</option>
            )}
            </select>
        </div>
    )
}