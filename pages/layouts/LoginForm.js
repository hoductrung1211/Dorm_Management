import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faCalendar, faLocationDot, faMobile, faUser, faEnvelope, faKey, faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
import Link from "next/link";
import { useRouter } from "next/router";
import Authen from '../api/service/AuthService'

export default function LoginForm({
  children,
}) {
  const [inputs, setInputs] = useState([
    {name: 'identifier', type: 'text', value: '', placeholder: 'N19DCCNxxx', icon: faUser},
    {name: 'password', type: 'password', value: '', placeholder: 'xxxxxx', icon: faKey},
  ])
  const [error, setError]=useState("")

  function handleValueChange(nextInput) {
    setInputs(inputs.map(i => 
      nextInput.name === i.name ? nextInput : i  
    ))
  }
  const router=useRouter()
  const handleSubmitLogin=(e)=>{
    e.preventDefault()
    Authen.login(inputs[0].value,inputs[1].value).then((res) => {
          router.push('/home')
      }
    ).catch((error)=>{
      if( error.response ){
        console.log(error.response.data); // => the response payload 
        setError('Username or password incorrect')
      }
    })
    
  }

  return (
    <div className='relative h-full'>
      <h2 className='text-center font-bold text-2xl'>
        Login to your account
      </h2>
      
      <form onSubmit={handleSubmitLogin} className='mt-10'>
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
        <strong className='text-red-500'>{error}</strong>
        {children}

        <div className='absolute w-full bottom-0'>
        <button type='submit' className='block w-full mt-8 py-2 rounded-md bg-primary text-white text-2xl text-center hover:bg-prim-opa'>
            Log in
          </button>
          <p className='mt-2 text-center'>
            Don't have an account? <Link className='text-primary underline' href={'/'}>Sign up</Link>
          </p>
        </div>
      </form>  
    </div>
  )
}
