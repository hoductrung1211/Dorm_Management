import {landingPageUrl} from "../utils//links"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Input({
    input,
    handleValueChange,
}) {
    let inputClassName = 'w-72 pl-4 pr-10 py-2 rounded-md bg-ec outline-none border-2'
    if (input.error)
        inputClassName += ' border-red'

    return (
        <label className='mt-3 flex flex-col capitalize'>
            {input.name}
            <div className='relative'>
                <input 
                    className={inputClassName}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={e => handleValueChange({
                        ...input,
                        value: e.target.value, 
                        error: undefined,
                    })}
                />
                <FontAwesomeIcon className='absolute right-4 top-1/2 -translate-y-1/2' icon={input.icon} />
            </div>
            <div className='relative normal-case left-0 top-0'>
                {input.error && (Array.isArray(input.error) 
                    ? input.error.map(err => <Error error={err} />)
                    : <Error error={input.error} />)}
            </div>
        </label>
    )
}

export function Error({error}) {
    return  (
        <p className='w-72 flex items-center gap-2 text-sm text-red'>
            <FontAwesomeIcon icon={faXmarkCircle} />
            {error}
        </p>
    )
}

export function Main({
    children,
}) {
    return (
        <main className='w-screen'>
            <div className='container h-screen grid items-center'>
            <section className='py-10 px-8 flex justify-around  shadow-md rounded-2xl'>
                {children}
            </section>
            </div>
        </main>
    )
}

export function Nav() {
    return (
        <nav>
            <ul className="flex gap-12">
                {landingPageUrl.map(url => 
                    <li key={url.text}>
                        <Link href={url.href} className="capitalize cursor-pointer">
                            {url.text}
                        </Link>
                    </li>   
                )}
            </ul>
        </nav>
    )
}

export function OTPForm({

}) {
    const [text, setText] = useState("");

    function handleValueChange(nextText) {
        setText(nextText);
    }

    function handleSubmit() {

    }

    function handleResendOTPCode() {
        
    }
 

    return (
        <form onSubmit={handleSubmit} className='relative mt-1 pt-8 flex flex-col px-4'>
            <h3 className='mb-8 text-b flex flex-col items-center text-2xl font-bold'>
                <Image 
                    src="/svg/OTP.svg"
                    width={80}
                    height={80}
                    alt='welcome pic'
                />
                OTP Verification
            </h3>
            
            <p className="flex flex-col items-center">
                Enter OTP code sent to
                <span className="font-bold">
                    nguyendangbac@gmail.com
                </span>
            </p>

            <input 
                className='mt-10 w-72 pl-4 pr-10 py-4 rounded-md bg-ec outline-none border-2 text-2xl font-extrabold text-center tracking-widest'
                value={text}
                onChange={e => handleValueChange(e.target.value)}
            />

            <div className='absolute bottom-0'>
                <p className="mb-8 flex flex-col text-center">
                    Didn't receive the code?
                    <span className="font-bold cursor-pointer"
                        onClick={handleResendOTPCode}
                    >
                        Resend code
                    </span>
                </p>

                <button 
                    className=' w-72 py-2 bg-p text-white font-bold rounded-md'>
                    Verify OTP code
                </button>
                
            </div>
            
        </form>
    )
}
