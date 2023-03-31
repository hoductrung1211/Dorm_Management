import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";


export default function FitlerSection({
    filterValues,
    setFilterValues,
}) {
    return (
        <>
            <section className="grid grid-cols-4 h-full gap-4 grow">
                <InputFilter
                    textValue={filterValues.studentID}
                    handleTextChange={nextText => {
                        setFilterValues({
                            ...filterValues,
                            studentID: nextText,
                        })
                    }}
                    placeholder="Type student ID here.."
                />

                <FilterSelection
                    title="Status"
                    options={[
                        {text: "All", value: "all"},
                        {text: "In Dormitory", value: "in"},
                        {text: "Out Dormitory", value: "out"},
                    ]}
                    handleChangeSelection={nextStatus => {
                        setFilterValues({
                            ...filterValues,
                            status: nextStatus,
                        })
                    }}
                />
            </section>

            <button className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition">
                Sync
            </button>
        </>
    )
}