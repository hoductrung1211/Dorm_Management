export default function SelectTypeBlock({
    types,
    handleChangeSelectedID,
}) {
    return (
        <p className="flex items-center gap-2">
            Discover our room options:
            <select className="w-40 h-12 bg-ec rounded-md outline-none text-center cursor-pointer" onChange={e => {handleChangeSelectedID(e.target.value)}}>
            {types.map(type =>
                <option  key={type.id} value={type.id}>
                    {type.name}
                </option>
            )}
            </select>
        </p>
    )
}