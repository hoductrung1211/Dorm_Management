import { useRef } from "react"

export default function RootComponent() {
    const alertRef = useRef(null);


    function handleToast() {
        alertRef.current.classList.remove('hidden');

        setTimeout(() => {
            alertRef.current.classList.add('hidden')
        }, 3000);
    }

    return (
        <>
            <button onClick={handleToast}>
                Click me
            </button>

            <div 
                id="alert" 
                className="flex items-center gap-2 p-2 mt-10 bg-green-100"
                ref={alertRef} 
            >
                <i className="fa-solid fa-circle-check text-xl text-green"></i>
                <span className="type font-bold text-green">Successful</span>
                <span className="message text-green">Add successfully</span>
            </div>
        </>
    )
}

