import Image from "next/image";
import { use, useState } from "react";
import Input from './components/Input';
import Container from "./layouts/Container";
import Header from "./layouts/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faCalendar, faLocationDot, faMobile, faUser, faEnvelope, faKey, faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export default function Signup({

}) {

    return (
        <>
            <Header />
            <Main />
        </> 
    )
}

function Main({

}) {

    return (
        <main className="">
            <Container>
                <section className="flex justify-center pt-8 pb-5 gap-10 bg-white shadow-md rounded-lg">
                    <div className="w-1/3 relative">
                        <Image 
                            className="object-fit"
                            src="/pics/signup.jpg"
                            alt=""
                            fill 
                        />
                    </div>
                    <Form />
                </section>
            </Container>
        </main>
    )
}

function Form({

}) {
    const [inputs, setInputs] = useState([
        {name: 'Full name', type: 'text', value: '', placeholder: 'Nguyen Dang A', icon: faSignature},
        {name: 'Birthday', type: 'date', value: '', placeholder: '', icon: faCalendar},
        {name: 'Address', type: 'text', value: '', placeholder: 'Dong Ngo, Qua Xoai, Binh Duong', icon: faLocationDot},
        {name: 'Phone number', type: 'number', value: '', placeholder: '0123456789', icon: faMobile},

        {name: 'Identifier', type: 'text', value: '', placeholder: 'N19DCCNxxx', icon: faUser},
        {name: 'Email', type: 'mail', value: '', placeholder: 'nguyendangbac@gmail.com', icon: faEnvelope},
        {name: 'Password', type: 'password', value: '', placeholder: 'xxxx xxxx', icon: faKey},
        {name: 'Confirm Password', type: 'password', value: '', placeholder: 'xxxx xxxx', icon: faKey},
    ])

    const [gender, setGender] = useState(true);

    function handleValueChange(nextInput) {
        setInputs(inputs.map(i => 
            nextInput.name === i.name ? nextInput : i  
        ))
    }

    return (
        <div className="items-center">
            <div className="grid grid-cols-2 place-items-center">
                <div className="relative w-20 aspect-square overflow-hidden">
                    <Image  
                        src="/svg/ID.svg"
                        alt="ID illustration"
                        fill 
                    />
                </div>
                <h2 className="text-2xl font-bold">Sign up</h2>
            </div>

            <form>
                <ul className="mt-5 grid grid-rows-4 grid-flow-col-dense gap-x-4 ">
                {
                    inputs.map(input => 
                    <li className='mt-5 w-72'
                        key={input.name}>
                        <Input 
                        input={input}
                        onValueChange={handleValueChange}
                        > 
                        <FontAwesomeIcon icon={input.icon} />
                        </Input>
                    </li>
                    )
                }
                </ul>

                <div className="mt-5 flex items-start gap-4">
                    <div className="flex flex-col w-72">
                        <p>Gender</p>
                        <div className="flex justify-between">
                            <label className="flex gap-1 items-center text-lg">
                                <input 
                                    checked={gender}
                                    className=""
                                    name="gender" 
                                    type="radio"  
                                    onChange={e => setGender(true)} />
                                Male
                                <FontAwesomeIcon icon={faMars} />
                            </label>

                            <label className="flex gap-1 items-center text-lg">
                                <input 
                                    checked={!gender}
                                    name="gender" 
                                    type="radio"  
                                    onChange={() => setGender(false)} />
                                Female
                                <FontAwesomeIcon icon={faVenus} />
                            </label>
                        </div>

                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button className="mt-12 w-72 h-12 bg-primary text-white text-xl rounded-lg hover:opacity-90" >
                            Register
                        </button>

                        <p>Already have an account?
                            <Link className="text-primary underline" href="/"> Login</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}