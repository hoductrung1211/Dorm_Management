import { faBed, faBox, faFaucetDrip, faBolt, faTv } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import {userURL, landingPageUrl} from "../features/utils/links"
import { forwardRef, useRef } from "react" 
import Header from "../features/ui/header"
import Footer from "../features/ui/footer"

export default function LandingPage() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const optionsRef = useRef(null);
    const faqRef = useRef(null);

    return (
        <>
            <Header>
                <div className="w-full ml-20 flex justify-between">
                    <Nav 
                        homeRef={homeRef}
                        aboutRef={aboutRef}
                        optionsRef={optionsRef}
                        faqRef={faqRef} 
                    />
                    <div className="flex gap-12">
                        <Link href={userURL.login}>
                            Login
                        </Link>
                        <Link href={userURL.signup}>
                            Sign up                
                        </Link>
                    </div>
                </div>
            </Header>
           
            <main className="w-screen"> 
                <HeroSection ref={homeRef} />
                <AboutSection ref={aboutRef} />
                <RoomOptionsSection ref={optionsRef} />
                <FAQSection ref={faqRef} />
            </main>
            <Footer>
                <Nav 
                    homeRef={homeRef}
                    aboutRef={aboutRef}
                    optionsRef={optionsRef}
                    faqRef={faqRef} 
                />
            </Footer>
        </>
    )
}

function Nav({
    homeRef,
    aboutRef,
    optionsRef,
    faqRef,
}) { 
    function handleScroll(index) {
        let ref = null;

        if (index == 0)
            ref = homeRef.current;
        else if (index == 1)
            ref = aboutRef.current;
        else if (index == 2)
            ref = optionsRef.current;
        else if (index == 3) 
            ref = faqRef.current;
        else return;

        ref.scrollIntoView({
            behavior: 'smooth',
            block: 'start', 
        })
    }

    return (
        <nav>
            <ul className="flex gap-12">
                {landingPageUrl.map((url, index) => 
                    <li key={url.text}>
                        <button onClick={() => handleScroll(index)} className="capitalize cursor-pointer">
                            {url.text}
                        </button>
                    </li>   
                )}
            </ul>
        </nav>
    )
}

const HeroSection = forwardRef((props, ref) => {
    return (
        <section ref={ref} id="home" className="pt-28 pb-10">
            <div className="container flex justify-between">
                <div className="flex flex-col justify-center w-3/5">
                    <h3 className="capitalize text-4xl font-bold">
                        live <span className="text-p">Better</span>, learn <span className="text-p">Better</span>:
                    </h3>
                    <h3 className="text-4xl font-bold">
                        Welcome to Your New Home
                    </h3>
                    <p className="mt-5">Experience the Ultimate College Lifestyle at Our Modern and Affordable Dormitory. Enjoy 24/7 Security, On-Site Dining, Free Wi-Fi, and Spacious Rooms with Stunning Views. Join a Thriving Community of Students and Make Lifelong Memories in Your Home Away from Home.</p>
                    <div className="mt-5 flex gap-10">
                        <button className="px-5 py-3 bg-slate-200 hover:opacity-90 rounded-lg font-bold text-xl">
                            Contact Us
                        </button>
                        <button className="px-5 py-3 bg-p text-white rounded-lg font-bold text-xl hover:opacity-90">
                            Book a room
                        </button>
                    </div>
                </div>
                <div className="relative overflow-hidden z-0">
                    <Image 
                        className="object-cover z-0"
                        src="/pics/herosection.jpg"
                        width={384}
                        height={575}
                        alt="hero-section-picture"
                    />
                </div>
            </div>
        </section>
    )
}) 

const AboutSection = forwardRef((props, ref) => {
    return (
        <section ref={ref} id="about" className="bg-fa py-10">
            <div className="container">
                <Title text="about us" />
                <div className="pt-10 flex justify-around">
                    <div className="w-80 relative">
                        <Image
                            className="object-cover"
                            src="/pics/aboutus.jpg"
                            width={304}
                            height={456}
                            alt="CEO of cube dormitory"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-center">
                        <p className="italic">
                        “At Cube Dormitory , we are dedicated to providing a safe, affordable, and comfortable living environment for college students. Our mission is to create a welcoming and inclusive community that supports academic success, personal growth, and lifelong friendships. With modern facilities and a wide range of amenities, including on-site dining, fitness facilities, study spaces, and 24/7 security, we strive to make our dormitory a home away from home for all residents. Our committed and experienced leadership team is passionate about providing exceptional service and support to all residents, and we are proud to be a trusted and respected provider of student housing.”
                        </p>
                        <p className="mt-10 text-end">CEO of Cube Dormitory</p>
                    </div>
                </div>
            </div>
        </section>
    )
}) 

function Title({ text }) {
    return (
        <h3 className="uppercase">
            #{text}
        </h3>
    )
}

const RoomOptionsSection = forwardRef((props, ref) => {
    return (
        <section ref={ref} id="options" className="py-10">
            <div className="container">
                <Title text="room options" />
                <ul className="mt-10">
                {roomOptions.map(option => 
                    <li key={option.name}>
                        <RoomOption option={option} />
                    </li>
                )}
                </ul>
            </div>
        </section>
    )
}) 

function RoomOption({option}) {
    return (
        <div className="mt-10 pl-16 flex gap-20">
            <div className="relative w-96 h-96">
                <Image
                    src={option.src}
                    alt={option.name + " pic"}
                    fill 
                />
            </div>
            <div className="w-1/2 flex flex-col gap-12">
                <h3 className="text-3xl capitalize">
                    {option.name + " room"}
                </h3>
                <ul className="flex gap-5">
                    {option.icons.map((icon, index) => 
                        <li key={index}>
                            <FontAwesomeIcon className="text-3xl" icon={icon} />
                        </li>    
                    )}
                </ul>
                <p>{option.paragaph}</p>
                <Link 
                    className="w-fit mt-5 px-5 py-3 text-white font-bold bg-p rounded-md"
                    href={userURL.login}
                >Pick a room</Link>
            </div>
        </div>
    )
}

const FAQSection = forwardRef((props, ref) => {
    return (
        <section ref={ref} id="faq" className="bg-fa py-10">
            <div className="container">
                <Title text="FAQ" />
                <div className="mt-20 flex justify-between">
                    <h3 className="w-2/5 text-5xl">
                        Frequently asked questions
                    </h3>
                    <ul className="w-3/5 flex flex-col items-start gap-4">
                        {faq.map((q, index) => 
                            <li className="cursor-pointer underline text-lg" key={index}>
                                {index + 1}. {q}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    )
});

const roomOptions = [
    {name: "standard", src: "/rooms/basic/8.jfif", icons: [faBed, faFaucetDrip, faBolt] ,paragaph: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces."},
    {name: "deluxe", src: "/rooms/medium/12.jfif", icons: [faBed, faBox, faFaucetDrip, faBolt] ,paragaph: "A deluxe room is a more spacious and well-appointed dormitory room that may include additional amenities such as a private bathroom, mini-fridge, and air conditioning. This option is typically priced higher than a standard room but offers more comfort and convenience."},
    {name: "premium", src: "/rooms/highend/5.jfif", icons: [faBed, faBox, faFaucetDrip, faBolt, faTv] ,paragaph: "A premium room is a top-tier dormitory room that offers the most luxurious amenities and furnishings, such as premium bedding, a flat-screen TV, and a private balcony. This option is typically the most expensive but offers the highest level of comfort and luxury."},
]

const faq = [
    "What is included in the dormitory fee?",
    "What types of rooms are available, and what are their prices?",
    "What amenities and facilities are available in the dormitory?",
    "Is the dormitory co-ed or single-gender?",
    "What are the dormitory's policies on noise, visitors, and alcohol?:",
    "What is the dormitory's policy on roommates, and can I request a specific roommate?",
    "What types of meal plans are available, and how much do they cost?",
    "Is the dormitory located near public transportation or within walking distance of campus?",
    "What types of security measures are in place to ensure resident safety?",
    "What is the process for applying to live in the dormitory, and when are applications due?",
]

 