import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterSelection from "../../ui/select-filter";

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


