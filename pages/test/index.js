import { useState } from "react"

export default function App() {
    const [value, setValue] = useState(0);

    return (
        <>
            <div>value: {value}</div>
            <select onChange={(e) => {
                setValue(e.target.value)
            }}>
                <option value={1}>First</option>
                <option value={2}>Second</option>
                <option value={3}>Third</option>
            </select>
        </>
    )
}