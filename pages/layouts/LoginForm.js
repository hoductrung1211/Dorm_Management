import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faCalendar, faLocationDot, faMobile, faUser, faEnvelope, faKey, faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
import Link from "next/link";

export default function LoginForm({
  children,
}) {
  const [inputs, setInputs] = useState([
    {name: 'identifier', type: 'text', value: '', placeholder: 'N19DCCNxxx', icon: faUser},
    {name: 'password', type: 'password', value: '', placeholder: 'xxxxxx', icon: faKey},
  ])

  function handleValueChange(nextInput) {
    setInputs(inputs.map(i => 
      nextInput.name === i.name ? nextInput : i  
    ))
  }

  return (
    <div className='relative h-full'>
      <h2 className='text-center font-bold text-2xl'>
        Login to your account
      </h2>
      
      <form className='mt-10'>
        <ul>
          {
            inputs.map(input => 
              <li className='mt-5'
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
        <p className='mt-2 underline text-right'>
          <Link href="/">Forgot your password?</Link>
        </p>
          
        {children}

        <div className='absolute w-full bottom-0'>
          <Link href="/home" className='block w-full mt-8 py-2 rounded-md bg-primary text-white text-2xl text-center hover:bg-prim-opa'>
            Log in
          </Link>
          <p className='mt-2 text-center'>
            Don't have an account? <Link className='text-primary underline' href={'/'}>Sign up</Link>
          </p>
        </div>
      </form>  
    </div>
  )
}
