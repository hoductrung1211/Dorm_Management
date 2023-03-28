import { useState } from "react";
import Link from "next/link";
import { url } from "../../utils/links";
import Image from "next/image";
import InputGroup from "../components/input-group";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons"

export default function SignupForm() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <form className='relative mt-1 pt-8 flex flex-col px-4'>
            <h3 className='mb-8 w-72 text-b flex flex-col items-center text-2xl font-bold'>
                <Image 
                    src="/svg/ID.svg"
                    width={80}
                    height={80}
                    alt='welcome pic'
                />
                Sign up
            </h3>
            
            <InputGroup  
                name="identifier"
                type="text"
                placeholder="N19DCCN001"
                value={id}
                icon={faUser}
                handleChange={nextID => setId(nextID)}
            />
            <InputGroup  
                name="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                icon={faKey}
                handleChange={nextPassword => setPassword(nextPassword)}
            />
            <InputGroup  
                name="confirm password"
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                icon={faKey}
                handleChange={nextPassword => setConfirmPassword(nextPassword)}
            /> 

            <div className='absolute bottom-0'>
                <button 
                    className='w-72 py-2 bg-p text-white font-bold rounded-md'>
                    Create account
                </button>
                <p className='mt-1 text-center text-sm'>Already have an account?
                    {' '}
                    <Link href={url.login} className="underline">Login</Link>
                </p>
            </div>  
        </form>
    )
}