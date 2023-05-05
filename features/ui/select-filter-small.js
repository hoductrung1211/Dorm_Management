export default function SmallFilterSelection({
    title,
    options,
    handleChangeSelection,
    defaultValue
}) {
    return (
        <div className="flex items-center h-full gap-1">
            {title}
            <select defaultValue={defaultValue}
                className="w-20 h-full text-center rounded-md outline-none cursor-pointer bg-fa"
                onChange={e => handleChangeSelection(e.target.value)}    
            >
            {options.map(option => 
                <option key={option.value} value={option.value+""}>{option.text}</option>
            )}
            </select>
        </div>
    )
}