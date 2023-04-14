import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import {studentURL} from '../../utils/links'
import Authentication from "../../../pages/api/student-auth/AuthService"
import Error from '../../ui/error';


export default function OTPModal({
    inputOTP, redirect
}) {
    const router = useRouter();
    const [text, setText] = useState('');
    const [errorOTP, setErrorOTP]=useState(undefined)
    function handleValueChange(nextText) {
        setText(nextText);
    }

    function handleSubmit(e) {
        e.preventDefault();
        Authentication.verify(inputOTP.id, inputOTP.password, text).then(e=>{
            router.push(redirect)
        })
        .catch((error)=>{
            if( error.response ){
                setErrorOTP(error.response.data)
            }
        })
        
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
                    {inputOTP.id+"@student.ptithcm.edu.vn"}
                </span>
            </p>

            <input 
                className='mt-10 w-72 pl-4 pr-10 py-4 rounded-md bg-ec outline-none border-2 text-2xl font-extrabold text-center tracking-widest'
                value={text}
                onChange={e => handleValueChange(e.target.value)}
            />
            <div className="w-72 flex items-center gap-2 text-sm text-red">{errorOTP}</div>
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