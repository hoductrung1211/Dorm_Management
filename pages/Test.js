import { useState } from "react"



export default function App({

}) {
    const [isPopup, setIsPopup] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsPopup(true)}
            >
                Click me
            </button>
            {
                isPopup 
                && <Popup 
                        handleExitPopup={() => setTimeout(() => {
                            setIsPopup(false)
                        }, 100)}
                    />
            }


            <Wrapper />
        </>
    )
}

function Wrapper({

}) {
    return (
        <>
            <div className="bg-slate-400 h-screen"></div>
            <div className="bg-cyan-400 h-screen"></div>
        </>
    )
}

function Popup({
    handleExitPopup,
}) {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col items-center p-10 z-50 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold">OTP Verification</h2>
                <p className="mt-5 flex flex-col items-center text-slate-500">
                    Enter the OTP you received to
                    <span className="text-slate-800 text-xl">0123 456 789</span>
                </p>
                <input 
                    className="mt-10 w-72 bg-slate-200 px-5 py-2 text-3xl text-center rounded-lg"
                    min="0"
                    max="9999"
                    maxLength="4"
                    type="number"
                    value={null}
                />
                <div className="mt-10 w-full flex justify-between text-lg font-bold">
                    <button
                        className="">
                        Resend OTP
                    </button>

                    <button 
                        className="text-primary">
                            Continue
                    </button>
                </div>
            </div>
            <div 
                className="absolute z-0 h-screen w-screen bg-slate-800 opacity-70"
                onClick={handleExitPopup}
            ></div>

        </div>
    )
}