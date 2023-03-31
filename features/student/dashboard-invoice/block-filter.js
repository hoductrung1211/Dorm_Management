import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterBlock({
    textValue,
    category,
    date,
    status,
    setTextFilter,
    setCategory,
    setStatus,
}) {
    return (
        <section className="grid grid-cols-4 gap-2 place-items-center w-full h-16 py-2 shrink-0 ">
            <div className="relative h-full w-full">
                <input 
                    className="h-full w-full pl-4 pr-12 outline-none bg-fa rounded-md"
                    placeholder="Type your invoice ID..."
                    onChange={e => setTextFilter(e.target.value)}
                    value={textValue}
                />
                <FontAwesomeIcon
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    icon={faMagnifyingGlass}
                />
            </div>
            <FilterSelection
                title="Category"
                options={[
                    {text: "All", value: "all"},
                    {text: "Room", value: "Room"},
                    {text: "Water", value: "Water"},
                    {text: "Electricity", value: "Electricity"},
                ]}
                handleChangeSelection={setCategory}
                value={category}
            />
            <FilterSelection
                title="Date"
                options={[
                    {text: "All", value: 'all'},
                    {text: "Room", value: "1"},
                    {text: "Water", value: "2"},
                    {text: "Electricity", value: "3"},
                ]}
            />
            <FilterSelection
                title="Status"
                options={[
                    {text: "All", value: 'all'},
                    {text: "Paid", value: true},
                    {text: "Unpaid", value: false},
                ]}
                handleChangeSelection={setStatus}
                value={status}
            />
        </section>
    )
}


function FilterSelection({
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
                <option key={option.value} value={option.value}>{option.text}</option>
            )}
            </select>
        </div>
    )
}