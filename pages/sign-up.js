import Image from "next/image";
import { use, useState } from "react";
import Input from './components/Input';
import Container from "./layouts/Container";
import Header from "./layouts/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faCalendar, faLocationDot, faMobile, faUser, faEnvelope, faKey, faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { validateIdentifier, validatePassword } from "./utils/validation";
import OTPpopup from './layouts/OTPpopup';

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
                <section className="flex px-8 pt-8 pb-5 gap-10 bg-white shadow-md rounded-lg">
                    <Illustration />
                    <FormSection />
                </section>
            </Container>
        </main>
    )
}

function Illustration() {
    return (
        <div className="flex">
            <div className=" w-96 relative">
                <Image 
                    className="object-fit"
                    src="/pics/signup.jpg"
                    alt=""
                    fill 
                />
            </div>
            <div className=" w-96 relative">
                <Image 
                    className="object-fit"
                    src="/pics/signup_2.jpg"
                    alt=""
                    fill 
                />
            </div>
        </div>
    )
}

function FormSection() {
    return (
        <section className="w-full flex flex-col items-center">
            <Title/>
            <Form />
        </section>
    )
}

function Title() {
    return (
        <div className="">
            <div className="relative w-20 aspect-square overflow-hidden">
                <Image  
                    src="/svg/ID.svg"
                    alt="ID illustration"
                    fill 
                />
            </div>
            <h2 className="text-2xl font-bold">Sign up</h2>
        </div>
    )
}

function Form({

}) {
    const [inputs, setInputs] = useState([
        {name: 'Identifier', type: 'text', value: '', placeholder: 'N19DCCNxxx', icon: faUser},
        {name: 'Password', type: 'password', value: '', placeholder: 'xxxx xxxx', icon: faKey},
        {name: 'Confirm Password', type: 'password', value: '', placeholder: 'xxxx xxxx', icon: faKey},
    ])
    
    const otpMessage = 1111;
    const [isPopup, setIsPopup] = useState(false);

    function handleValueChange(nextInput) {
        setInputs(inputs.map(i => 
            nextInput.name === i.name ? nextInput : i  
        ))
    }

    function handleValidate(e) {
        e.preventDefault();
        const cloneInputs = [];
        let isValid = true;

        inputs.forEach(input => {
            let validation = "";

            if (input.type === 'password') {
                if (!validatePassword(input.value)) 
                    validation = "This password is invalid!"
            } 
            else if (input.name === 'Identifier') {
                if (!validateIdentifier(input.value))
                    validation = "This identifier is invalid!"
            }
    
            if (validation)
                isValid = false;

            cloneInputs.push({
                ...input,
                validation,
            })            
        })

        setIsPopup(isValid);
        setInputs(cloneInputs);
    }

    return (
        <div className="items-center relative">
            <form>
                {/* Inputs  */}
                <ul className="mt-5 grid grid-rows-3 grid-flow-col-dense gap-x-4 ">
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

                {/* Buttons */}
                <div className="mt-5 flex items-start gap-4">
  
                    <div className="flex flex-col items-center gap-2">
                        <button onClick={handleValidate} className="mt-12 w-72 h-12 bg-primary text-white text-xl rounded-lg hover:opacity-90" >
                            Register
                        </button>

                        <p>Already have an account?
                            <Link className="text-primary underline" href="/"> Login</Link>
                        </p>
                    </div>
                </div>
            </form>

            { isPopup && 
                <OTPpopup
                    otpMessage={otpMessage}
                    phoneNumber="0123456789" />
            }
        </div>
    )
}