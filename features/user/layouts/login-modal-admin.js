import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons"
import { userURL } from "../../utils/links";
import InputGroup from "../components/input-group";
import { authenticate } from "../auth-user";
import Authentication from "../../../pages/api/admin-auth/AuthService"
import {managerURL} from '../../utils/links'
import { useRouter } from "next/router";


export default function LoginModal({
    handlePushPopup, inputOTP, redirect
}) {
    const router = useRouter();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // const [idError, setIdError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);

    // function handleSubmit(e) {
    //     e.preventDefault();

    //     // Authentication

    //     handlePushPopup()
    // }
    
//============ Thay Data

    function handleSubmit(e) {
        e.preventDefault();
        Authentication.login(id, password).then(()=>{
            // router.push(managerURL.index)
            handlePushPopup()
            inputOTP({"id":id,"password": password})
        })
        .catch((error)=>{
            if( error.response ){
                
                if(error.response.status===401){
                    setPasswordError('Username or password incorrect')
                }
                else if(error.response.status===400){
                    setPasswordError('Account not accessible')
                }
                else{
                    
                    // redirect(managerURL.index)
                    console.log(error.response.data)
                }
                // error.response.status===403 ? handlePushPopup() : setPasswordError("aaaa")
            }
          })
        
    }
//====================== 
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
                placeholder="CB1"
                value={id}
                icon={faUser}
                handleChange={nextID => setId(nextID)}
                // error={idError}
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
                    className=' w-72 py-2 bg-p text-white font-bold rounded-md mb-12'>
                    Login
                </button>
                {/* <p className='mt-1 text-center text-sm'>Don't have an account?
                    {' '}
                    <Link href={userURL.signup} className="underline">Sign up</Link>
                </p> */}
            </div>
        </form>
    )
}

 