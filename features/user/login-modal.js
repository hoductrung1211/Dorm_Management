import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons"
import { url } from "../utils/links";
import InputGroup from "./input-group";
import { authenticate } from "./auth-user";

export default function LoginModal({
    handlePushPopup,
}) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [idError, setIdError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);

    function handleSubmit(e) {
        e.preventDefault();

        // Authentication

        handlePushPopup()
    }

    return (
        <form onSubmit={handleSubmit} className='relative mt-1 pt-8 flex flex-col px-4'>
            <h3 className='mb-8 w-72 text-b flex flex-col items-center text-2xl font-bold'>
                <Image 
                    src="/svg/welcome.svg"
                    width={200}
                    height={200}
                    alt='welcome pic'
                />
                Login your account
            </h3>
             
            <InputGroup  
                name="identifier"
                type="text"
                placeholder="N19DCCN001"
                value={id}
                icon={faUser}
                handleChange={nextID => setId(nextID)}
                error={idError}
            />
            <InputGroup  
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                icon={faKey}
                handleChange={nextPassword => setPassword(nextPassword)}
                error={passwordError}
            />
            
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

 