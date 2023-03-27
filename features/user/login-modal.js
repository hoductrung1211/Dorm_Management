import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { url } from "../utils/links";
import InputGroup from "./input-group";

export default function LoginModal({
    handlePushPopup,
}) {
    const [inputs, setInputs] = useState(initInputs);

    function handleValueChange(nextInput) {
        setInputs(inputs.map(input => {
            if (nextInput.name == input.name)
                return nextInput;
            return input;
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let flag = false; // true if there is already an error, no need to check anymore

        setInputs(inputs.map(input => {
            if (flag)
                return input;

            let valid = input.validate(input.value);
            if (valid)
                flag = true;
            let error = valid;

            return {
                ...input,
                error,
            }
        }))
        
        if (!flag) { // There is no errors
            handlePushPopup();
        }
    }

    return (
        <form onSubmit={handleSubmit} className='relative mt-1 pt-8 flex flex-col px-4'>
            <h3 className='mb-8 text-b flex flex-col items-center text-2xl font-bold'>
                <Image 
                    src="/svg/welcome.svg"
                    width={200}
                    height={200}
                    alt='welcome pic'
                />
                Login your account
            </h3>
            {
                inputs.map(input => 
                    <InputGroup 
                        key={input.name} 
                        input={input} 
                        handleValueChange={handleValueChange} 
                    />
                )
            }

            <Link href="/new" className='mt-3 text-sm self-end underline'>Forgot password?</Link>
            
            <div className='absolute bottom-0'>
                <button 
                    className=' w-72 py-2 bg-p text-white font-bold rounded-md'>
                    Login
                </button>
                <p className='mt-1 text-center text-sm'>Don't have an account?
                    {' '}
                    <Link href={url.signup} className="underline">Sign up</Link>
                </p>
            </div>
            
        </form>
    )
}

 