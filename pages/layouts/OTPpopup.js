import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function Popup({
    otpMessage,
    phoneNumber,
    handleExitPopup,
}) {
    

    return (
        <section className="fixed grid place-items-center inset-0 z-20">
            <div className="fixed flex flex-col items-center bg-white p-10 z-10 rounded-lg">
                <h3 className="text-2xl font-bold">
                    OTP Vertification
                    {/* <FontAwesomeIcon icon={fa} */}
                </h3>

                <p className="grid place-items-center mt-5 font-bold">
                    <span className="font-normal">
                        Enter the OTP you received to
                    </span>
                    {phoneNumber}
                </p>

                <PopupForm
                    otpMessage={otpMessage} 
                />
            </div>

            <div onClick={handleExitPopup} className="absolute h-screen w-screen bg-stone-600 opacity-80" />
        </section>
    )
}

function PopupForm({
    otpMessage, 
}) {
    const [input, setInput] = useState('');
    const router = useRouter();

    function handleChangeInput(e) {
        const value = e.target.value;

        if (value >= 0 && value <= 9999)
            setInput(value)
    }

    function handleSubmitOTP(e) {
        e.preventDefault();

        if (otpMessage == input)
            // alert('true')
            router.push('/')
    }

    return (
        <form className="flex flex-col space-y-5">
            <input 
                className="mt-5 w-72 px-5 py-2 text-center tracking-widest text-2xl font-bold outline-none rounded-lg leading-5 bg-zinc-200"
                value={input}
                onChange={handleChangeInput}
            />

            <div className="flex justify-between font-bold">
                <button>
                    Resend OTP
                </button>

                <button className="text-primary" onClick={handleSubmitOTP}>
                    Continue
                </button>
            </div>
        </form>
    )
}