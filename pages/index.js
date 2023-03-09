import Header from './layouts/Header'; 
import Footer from './layouts/Footer';
import { StrictMode, useState } from 'react';
import Container from './layouts/Container';
import Input from './components/Input';
import Link from 'next/link';
import Image from 'next/image';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faBullhorn, faScaleBalanced, faLandmark, faPerson, faFileLines, faUmbrella } from '@fortawesome/free-solid-svg-icons';


library.add( faUser, faKey, faBullhorn, faScaleBalanced, faLandmark, faPerson, faFileLines);

const SIGN_UP_LINK = '/';
const FG_PASS_LINK = '/';

export default function Home() { 
  return ( 
    <StrictMode>
      <Header /> 
      <Main />
      <Footer />  
    </StrictMode> 
  )
}
 

function Main({
  
}) {
  return (
    <Container>
      <MainSection />
      <RoomTypeSection />
    </Container>
  ) 
}

function MainSection({

}) {
  return (
    <>
      <main className='mt-10 grid grid-cols-9 grid-rows-3 gap-5'>
        <div className='pt-8 px-10 pb-5 col-span-3 row-span-3 bg-white shadow-md rounded-md'>
          <LoginForm />
        </div>
        <div className='pt-8 px-10 pb-5 col-span-6 row-span-2 bg-white shadow-md rounded-md'>
          <AnnoucementSection />
        </div>
        <div className='pt-4 px-10 pb-5 col-span-6 shadow-md bg-white rounded-md'>
          <Rules />
        </div>
      </main>
 
    </>
    
  )
}

function LoginForm({

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
      <h2 className='text-center text-2xl'>
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
          <Link href={FG_PASS_LINK}>Forgot your password?</Link>
        </p>
          

        <div className='absolute w-full bottom-0'>
          <Link href="/home" className='block w-full mt-8 py-2 rounded-md bg-primary text-white text-2xl text-center hover:bg-prim-opa'>
            Log in
          </Link>
          <p className='mt-2 text-center'>
            Don't have an account? <Link className='text-primary underline' href={SIGN_UP_LINK}>Sign up</Link>
          </p>
        </div>
      </form>  
    </div>
  )
}

function AnnoucementSection({

}) {
  const ancmList = [
    {text: "Announcement of interviewees for dormitory work scholarship of interviewees for dormitory work scholarship of interviewees for dormitory work scholarship ", date: "10 Feb 2023"},
    {text: "Secure Your Spot in Our Affordable On-Campus Housing Today", date: "10 Feb 2023"},
    {text: "Limited Availability: Reserve Your Room in Our Newly Constructed Dormitory and Enjoy State-of-the-Art Facilities and Amenities", date: "10 Feb 2023"},
    {text: "Experience Comfort and Convenience in Our Modern Dormitory, Located Just Steps Away from Campus", date: "10 Feb 2023"},
  ]


  return (
    <section className='divide-y-2'> 
      <h2 className='text-2xl'>
        Login to your account
        {" "}
        <FontAwesomeIcon icon={faBullhorn} />
      </h2>
      <ul className=''>
        {
          ancmList.map(ancm => 
            <li>
              <Announcement
                ancm={ancm}
              
              />
            </li>  
          )
        }
      </ul>
    </section>
  )
}

function Announcement({
  ancm
}) {
  return (
    <p className='grid grid-cols-10 py-3'>
      <Link className='col-span-8 text-stone-600 hover:text-stone-400 truncate ' href="/">{ancm.text}</Link>
      
      <span className='col-span-2 text-stone-400 text-sm text-end'>
        {ancm.date}
      </span>
    </p>
  )
}

function Rules({

}) {
  const ruleList = [
    {text: "Dorm rules", icon: faLandmark},
    {text: "Life rules", icon: faPerson},
    {text: "Guides", icon: faFileLines},
  ]

  return (
    <section className='flex flex-col h-full'>
      <h2 className='text-2xl'>
        Dormitory Rules
        {" "}
        <FontAwesomeIcon icon={faScaleBalanced} />
      </h2>

      <div className='flex h-full justify-between items-center gap-2'>
        {ruleList.map(rule => 
            <Rule 
              rule={rule}
            />
        )}
      </div>

    </section>
  )
}

function Rule({
  rule,
}) {
  return (
    <Link className='flex justify-center gap-4 items-center h-full w-full text-xl rounded-sm hover:bg-light' href="/">
      <FontAwesomeIcon className='text-3xl' icon={rule.icon} />
      {rule.text}
    </Link>
  )
}

function RoomTypeSection({

}) {
  const roomTypes = [
    {text: "Basic", desc: "This system provides basic amenities for students, including a shared bedroom, bathroom, and common areas such as a kitchen and living room. The system may have limited access to Wi-Fi, laundry facilities, and recreational areas.", images: ['/rooms/basic/8.jfif', '/rooms/basic/13.jfif']},
    {text: "Medium", desc: "This system provides students with more amenities than a basic system, including private or semi-private bedrooms, shared or private bathrooms, access to Wi-Fi, laundry facilities, and recreational areas such as a gym or lounge.", images: ['/rooms/medium/8.jfif', '/rooms/medium/12.jfif']},
    {text: "High end", desc: "This system offers students a luxury living experience, with private bedrooms and bathrooms, high-speed internet access, laundry facilities, recreational areas such as a pool or movie theater, and on-site services such as a 24-hour front desk, cleaning services, and on-site dining options.", images: ['/rooms/highend/4.jfif', '/rooms/highend/5.jfif']},
  ]

  return (
    <section className='mt-10'>
      {
        roomTypes.map(rt =>
          <RoomType
            rt={rt}/>
        )
      }
    </section>
  )
}

function RoomType({
  rt,
}) {
  return (
    <div className='mt-10 px-10 py-6 bg-white rounded-md shadow-md'>
      <h3 className='text-2xl'>
        {rt.text} Dormitory
      </h3>
      <div className='grid grid-cols-3 gap-5'>
        <p className='flex items-center leading-10 italic'>
          "
          {rt.desc}
          "
        </p>
        
        { 
          rt.images.slice(0, 2).map( image =>
            <div className='w-full h-96 relative overflow-hidden'>
            {/* <img 
              className='w-full absolute bottom-0 object-scale-down'
              src={image}
              /> */}
              <Image 
                src={image}
                fill
                alt={rt.text}
              />
          </div>
          )
        }
      </div>
    </div>
  )
}
 