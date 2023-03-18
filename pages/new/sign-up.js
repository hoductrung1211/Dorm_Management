import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {validateUsername, validatePassword} from './utils/validation';
import { url } from './utils/links';
import { Input, Main, Nav} from  './components/form';


const initInputs = [
    {name: "identifier", type: "text", value: "", placeholder: "N19DCCN001", icon: faUser, error: undefined, validate: validateUsername},
    {name: "password", type: "password", value: "", placeholder: "At least 6 characters", icon: faKey, error: undefined, validate: validatePassword},
    {name: "confirm password", type: "password", value: "", placeholder: "Enter your password again", icon: faKey, error: undefined, validate: validatePassword},
]

export default function Page() {
    return (
        <>
            <Header>
                <Nav />
            </Header>
            <Main>
                <Illustration />
                <SignUpForm />
            </Main>
        </>
    )
}

function SignUpForm() {
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
        let nextInputs = [];

        inputs.slice(0, 2).map(input => {
            let valid = input.validate(input.value);
            let error = valid;

            nextInputs.push({
                ...input,
                error,
            });
        })
        
        // Confirm password
        if (!(inputs[1].value == inputs[2].value))
            nextInputs.push({
                ...inputs[2],
                error: "The confirm password is not the same"
            })
        else nextInputs.push(inputs[2]);

        setInputs(nextInputs);
    }

    return (
        <form onSubmit={handleSubmit} className='relative mt-1 pt-8 flex flex-col px-4'>
            <h3 className='mb-8 text-b flex flex-col items-center text-2xl font-bold'>
                <Image 
                    src="/svg/ID.svg"
                    width={80}
                    height={80}
                    alt='welcome pic'
                />
                Sign up
            </h3>
            {
                inputs.map(input => 
                    <Input 
                        key={input.name} 
                        input={input} 
                        handleValueChange={handleValueChange} 
                    />
                )
            }

            <div className='absolute bottom-0'>
                <button 
                    className=' w-72 py-2 bg-p text-white font-bold rounded-md'>
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

function Illustration() {
    return (
        <div className='relative flex'>
            <Image
                className='object-fit'
                src="/pics/signup_2.jpg"
                alt='dorm illustration'
                width={350}
                height={525}
            />
            <Image
                src="/pics/signup.jpg"
                alt='dorm illustration'
                width={350}
                height={525}
            />
            
        </div>
    )
}
