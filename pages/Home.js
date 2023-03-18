<<<<<<< HEAD
import { StrictMode, useEffect, useState } from "react";
=======
import { StrictMode, useState,useEffect } from "react";
>>>>>>> 6a76b5d95cd32f39a8f449c8651a89342fc23065
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Container from "./layouts/Container";
import Image from "next/image";
import { useRouter } from "next/router";
import { faBed, faMoon, faUserAstronaut, faRocket, faMoneyBill, faClock, faMobile, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { useRouter } from "next/router";
=======
import HomeService from './api/service/HomeService'
>>>>>>> 6a76b5d95cd32f39a8f449c8651a89342fc23065

export default function Home({

}) {
    const [invisible, setInvisible]=useState(false)
    const router = useRouter();
<<<<<<< HEAD
    // useEffect(()=>{
    //     HomeService.getListTypeRoom().then(res=>{
    //         setInvisible(true)
    //         // setRoomTypes(res.data)
    //         console.log(res.data)
    //     }).catch(error=>{
    //         if (error.response) {
    //             setInvisible(false)
    //             router.push('/')
    //         }
    //     })
    // },{})
=======
    useEffect(()=>{
        HomeService.getListTypeRoom().then(res=>{
            setInvisible(true)
            // setRoomTypes(res.data)
        }).catch(error=>{
            if (error.response) {
                setInvisible(false)
                router.push('/')
            }
        })
    },{})
>>>>>>> 6a76b5d95cd32f39a8f449c8651a89342fc23065
    return (
        invisible ?
        <StrictMode >
            <Header />
            <Main />
            <Footer />
        </StrictMode>
        : <></>
    )
}

function Main({

}) {

    // const [roomTypeId, setRoomTypeId] = useState(5);
    const [roomTypes, setRoomTypes]=useState([])
    const [roomInfo, setRoomInfo]=useState({})


    useEffect(()=>{
        
        HomeService.getListTypeRoom().then(res=>{
            setRoomTypes(res.data)
            setRoomInfo(res.data[0])
            // console.log(res.data)
           
        }).catch(error=>{
            if (error.response) {
                console.log(error.response.data);
            }
        })
        
        // HomeService.getListRoomByTypeID(roomTypeId).then(res=>{
        //     setRoomInfo(res.data)
        // }).catch(error=>{
        //     if (error.response) {
        //         console.log(error.response.data);
        //     }
        // })
            
    },{})
    const handleChangeTypeRoom=(id)=>{
        setRoomInfo(roomTypes.find(obj=>obj.id==id))
    }

    return (
        <main className="pt-12">
            <Container>
                <PickRoomType>
                <Selection roomTypeData={roomTypes} handleSelect={id => handleChangeTypeRoom(id)} />
                </PickRoomType>
                <RoomTypeView
                    roomInfo={roomInfo} 
                /> 

                {/* <div className="py-20 bg-zinc-300">
                    {rooms.map(room => {
                        return <div>{room.name}</div>
                    })
                        
                    }
                </div> */}
            </Container>
        </main>
    )
}

function PickRoomType({
    children,
}) {


    return (
        <section className="flex justify-between gap-10">
            <div className="w-1/3">
                <p className="text-3xl font-bold">
                    Your favourite <span className="text-primary">dormitory</span>
                </p>
                <div className="flex gap-4 text-3xl font-bold">
                    <p className="text-primary">room is</p>
                    {children}
                </div>
            </div>
            <div className="w-2/3">
                <p className="text-2xl font-bold">
                    Enjoy Exploring Your Dream Room
                </p>
                <p className="text-md leading-tight text-stone-600">
                One of the most enjoyable aspects of this experience is designing and personalizing your living space.
                We have come to make it easier for you to find a room, we provide more than <span className="text-stone-900 font-bold">40+ rooms</span> that are ready for you to visit
                </p>
            </div>
        </section>
    )
}

function Selection({ 
    handleSelect,
    roomTypeData
}) {
    return (
        <select 
            className="px-10 rounded-lg" 
            onChange={e => handleSelect(e.target.value)}
        >
            {
                roomTypeData.map(rt =>
                    <option
                        className="text-xl"
                        key={rt.id} 
                        value={rt.id}
                    >
                        {rt.tenLoai}
                    </option>
                )
            }
        </select>
    )
}

function RoomTypeView({
    roomInfo,
}) {
    
    return (
        <section className="flex flex-col mt-10 p-10 gap-5 bg-white shadow-xl rounded-2xl">
            
                <div   div className="flex gap-10">
                    <div className="relative w-1/3 aspect-square rounded-xl bg-black overflow-hidden">
                        <Image 
                            className="absolute bottom-0 w-full object-cover"
                            src={roomInfo.image}
                            alt=""
                            fill
                        />
                    </div>
                    <div className="w-2/3 flex flex-col relative">
                        <h3 className="text-3xl font-bold capitalize text-primary">
                            {/* {rt.tenLoai} dormitory <FontAwesomeIcon icon={rt.icon} /> */}
                        </h3>

                        <div className="flex mt-10 gap-10 text-2xl">
                            <p className="">
                                <FontAwesomeIcon icon={faBed} /> {roomInfo.soGiuong} beds
                            </p>
                            <p className="">
                                <FontAwesomeIcon icon={faMoneyBill} /> {roomInfo.giaPhong}đ/month

                            </p>
                        </div>

                        <p className="mt-10 text-md italic text-stone-600 ">
                            "
                            {roomInfo.description}
                            "
                        </p>

                        <button className="absolute bottom-0 right-0 flex justify-center items-center h-16  w-48 hover:opacity-90 bg-primary text-white text-xl text-center rounded-lg">
                            Register now
                        </button>
                    </div>
                </div>
            
            <Drafts />
        </section>
    )
}

function Drafts({

}) {

    return (
        <section className="mt-10 p-10 flex gap-5 ">
            {
                drafts.map(d => 
                    <div className="w-1/3 flex flex-col items-start">
                        <FontAwesomeIcon className="text-4xl w-full text-center"  icon={d.icon} />
                        <h3 className="mt-4 text-primary text-xl">{d.title}</h3>
                        <p className="text-md text-stone-500">
                            {d.desc}
                        </p>
                    </div>
                )
            }
        </section>
    )
}






var roomTypeJSON = [
    {
        id: 0, 
        name: "basic", 
        beds: 6, 
        cost: 240000, 
        desc: "This system provides basic amenities for students, including a shared bedroom, bathroom, and common areas such as a kitchen and living room. The system may have limited access to Wi-Fi, laundry facilities, and recreational areas.", 
        image: '/rooms/basic/8.jfif',
        icon: faMoon,
        rooms: [
            {name: 'room1',},
            {name: 'room2',},
            {name: 'room3',},
        ],
    },
    {
        id: 1, 
        name: "medium", 
        beds: 4, 
        cost: 360000, 
        desc: "This system provides students with more amenities than a basic system, including private or semi-private bedrooms, shared or private bathrooms, access to Wi-Fi, laundry facilities, and recreational areas such as a gym or lounge.",
        image: '/rooms/medium/12.jfif',
        icon: faRocket,
        rooms: [
            {name: 'room4',},
            {name: 'room5',},
            {name: 'room6',},
        ],
    },
    {
        id: 2, 
        name: "high end",
        beds: 2, 
        cost: 480000, 
        desc: "This system offers students a luxury living experience, with private bedrooms and bathrooms, high-speed internet access, laundry facilities, recreational areas such as a pool or movie theater, and on-site services such as a 24-hour front desk, cleaning services, and on-site dining options.",
        image: '/rooms/highend/4.jfif',
        icon: faUserAstronaut,
        rooms: [
            {name: 'room7',},
            {name: 'room8',},
            {name: 'room9',},
        ],
    },
]

var drafts = [
    {
        icon: faMobile,
        title: "With Owner Direct you’re never alone",
        desc: "Friendly customer service coast to coast available every day of the year. We answer all of your questions quickly with our comprehensive wbe site and responsive customer service. ",
    },
    {
        icon: faClock,
        title: "We save your time and spare you the headaches!",
        desc: "Our sites have you wasting dealing with multiple property owners all at once. You wait for replies from busy home owners that don’t in a timely manner with the information you really need to make a decision.",
    },
    {
        icon: faMagnifyingGlass,
        title: "Total rent and fees up front",
        desc: "We don’t hide any fees and display all pricing info to you before inquire rather than getting a surprise later about hidden costs like other rental sites do.",
    },
]
