import { faAngleLeft, faAngleRight, faBed, faBolt, faBox, faFaucetDrip, faMoneyBill, faMoon, faRocket, faTv, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRef, useState } from "react";
import Dashboard from "./Dashboard";


export default function MyRoom() {
    const tabs = useRef([
        {id: 0, text: "Room detail", mainSection: RegisterSection},
        {id: 1, text: "Register", mainSection: RegisterSection},
    ]);

    const [selectedId, setSelectedId] = useState(1);

    let mainSection = tabs.current.find(tab => tab.id === selectedId).mainSection();

    function handleChangeTab(nextId) {
        setSelectedId(nextId);
    }
    
    return (
        <Dashboard
            tabs={tabs.current}
            selectedId={selectedId}
            handleChangeTab={handleChangeTab}
        >
            {mainSection}
        </Dashboard>
    )
}

function RegisterSection() {
    const roomTypes = useRef(roomTypeJSON);
    const [selectedID, setSelectedID] = useState(0);

    const roomTypeInfo = roomTypes.current.find(roomType => 
            roomType.id == selectedID);

    function handleChangeSelectedID(nextID) {
        setSelectedID(nextID);
    }

    return (
        <div className="h-full flex flex-col">
            <RoomTypeInfo roomTypeInfo={roomTypeInfo}>
                <SelectRoomType 
                    roomTypes={roomTypes.current}
                    handleChangeSelectedID={handleChangeSelectedID}
                />
            </RoomTypeInfo>

            <CardSection rooms={roomTypeInfo.rooms} roomTypeInfo={roomTypeInfo} />
        </div>
    )
}

function RoomTypeInfo({
    roomTypeInfo,
    children
}) {
    if (roomTypeInfo === undefined) {
        console.log( "huhuhuhu ", undefined);
        return null;
    }

    return (
        <>
            <div className="flex flex-col p-5 border-b-2 border-ec">
                <div className="flex items-center justify-between">
                    {children}
                    <div className="flex items-center gap-5 w-72 h-12 px-5 border-2 border-ec rounded-md">
                    {roomTypeInfo.icons.map((icon, index) =>
                        <FontAwesomeIcon key={index} className="text-2xl" icon={icon} />
                    )}
                    </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <p className="w-3/5 italic">
                        {roomTypeInfo.desc}
                    </p>

                    <div className="gap-4 px-5 flex items-center">
                        <div className="flex items-center gap-2 text-p">
                            <FontAwesomeIcon className="text-2xl" icon={faBed} />
                            <span className="font-bold">{roomTypeInfo.beds}</span> beds
                        </div>

                        <div className="flex items-center gap-2 text-p ">
                            <FontAwesomeIcon className="text-2xl" icon={faMoneyBill} />
                            <span className="font-bold">{roomTypeInfo.cost}</span> đ/month
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SelectRoomType({
    roomTypes,
    handleChangeSelectedID,
}) {
    return (
        <p className="flex items-center gap-2">
            Discover our room options:
            <select className="w-40 h-12 bg-ec rounded-md outline-none text-center" onChange={e => {handleChangeSelectedID(e.target.value)}}>
            {roomTypes.map(rtInfo =>
                <option  key={rtInfo.id} value={rtInfo.id}>
                    {rtInfo.name}
                </option>
            )}
            </select>
        </p>
    )
}

function CardSection({
    rooms,
    roomTypeInfo,
}) {
    const cardsRef = useRef(null);
    const cardViewId = useRef(0);

    function scrollToId(id) {
        const map = getMap();
        const node = map.get(id);

        node.scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
        })
    }

    function getMap() {
        if (!cardsRef.current)
            cardsRef.current = new Map();
        return cardsRef.current;
    }

    function handlePreviousView() {
        let size = getMap().size;
        cardViewId.current -= 2;

        if (cardViewId.current < 1)
            cardViewId.current = size - 1;
        
        scrollToId(cardViewId.current);
    }

    function handleNextView() {
        let size = getMap().size;
        cardViewId.current += 2;

        if (cardViewId.current >= size)
            cardViewId.current = 1;
        
        scrollToId(cardViewId.current);
    }

    return (
        <section className="relative h-full p-2">
            <h4 className="absolute top-6 left-1/2 -translate-x-1/2 text-xl">Available rooms</h4>

            <ul className="h-full flex items-center gap-5 overflow-x-hidden">
            {rooms.map(room =>
                // Card 
                <li 
                    key={room.id} 
                    className="shrink-0 w-80 min-h-min h-5/6 max-h-96 p-2 bg-fa rounded-xl cursor-pointer shadow-md hover:shadow-sm hover:scale-95 hover:bg-ec transition-all overflow-hidden"
                    ref={node => {
                        const map = getMap();

                        if (node)
                            map.set(room.id, node);
                        else map.delete(room.id);
                    }}>
                    <div className="relative h-4/5 w-full rounded-lg overflow-hidden">
                        <Image
                            className="object-cover  "
                            src={room.imgSrc}
                            fill
                            alt="room iamge"
                        />
                    </div>
                    <div className="mt-2 px-2 flex justify-between items-center">
                            <p>Room <span className="font-bold">#{room.id}</span></p>
                            <p>{roomTypeInfo.name}</p>
                    </div>
                    <div className="mt-2 px-2 flex justify-between items-center">
                            <p className="text-zinc-500"><span className="font-bold text-b">{room.available}</span> beds left</p>
                            <p><span className="font-bold">{roomTypeInfo.cost}</span> đ/month</p>
                    </div>
                </li>
            )}
            </ul>

            <button 
                className="absolute grid place-items-center top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 h-16 w-16 bg-fa rounded-full active:bg-ec shadow-md active:scale-90 transition"
                onClick={handlePreviousView}>
                <FontAwesomeIcon className="text-xl" icon={faAngleLeft} />
            </button>
            <button 
                className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-0 translate-x-1/2 h-16 w-16 bg-fa rounded-full active:bg-ec shadow-md active:scale-90 transition"
                onClick={handleNextView}>
                <FontAwesomeIcon className="text-xl" icon={faAngleRight} />
            </button>

            <p className="absolute right-6 bottom-4">© 2023 Cube Dormitory. All rights reserved</p>
        </section>
    )
}


var roomTypeJSON = [
    {
        id: 0, 
        name: "standard", 
        beds: 6, 
        cost: 240000, 
        desc: "A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.", 
        icons: [faBed, faFaucetDrip, faBolt],
        rooms: [
            {id: 1, imgSrc: '/rooms/basic/13.jfif', available: 2,},
            {id: 2, imgSrc: '/rooms/highend/4.jfif', available: 1,},
            {id: 3, imgSrc: '/rooms/highend/5.jfif', available: 2,},
            {id: 4, imgSrc: '/rooms/medium/8.jfif', available: 2,},
            {id: 5, imgSrc: '/rooms/medium/12.jfif', available: 1,},
            {id: 6, imgSrc: '/rooms/basic/8.jfif', available: 1,},
            {id: 7, imgSrc: '/rooms/basic/13.jfif', available: 2,},
            {id: 8, imgSrc: '/rooms/highend/4.jfif', available: 1,},
            {id: 9, imgSrc: '/rooms/highend/5.jfif', available: 2,},
        ],
    },
    {
        id: 1, 
        name: "deluxe", 
        beds: 4, 
        cost: 360000, 
        desc: "A deluxe room is a more spacious and well-appointed dormitory room that may include additional amenities such as a private bathroom, mini-fridge, and air conditioning. This option is typically priced higher than a standard room but offers more comfort and convenience.",
        icons: [faBed, faBox, faFaucetDrip, faBolt],
        rooms: [
            {id: 1, imgSrc: '/rooms/medium/12.jfif', available: 1,},
            {id: 2, imgSrc: '/rooms/basic/8.jfif', available: 1,},
            {id: 3, imgSrc: '/rooms/highend/5.jfif', available: 2,},
            {id: 4, imgSrc: '/rooms/highend/4.jfif', available: 1,},
            {id: 5, imgSrc: '/rooms/highend/5.jfif', available: 2,},
            {id: 6, imgSrc: '/rooms/basic/13.jfif', available: 2,},
            {id: 7, imgSrc: '/rooms/highend/4.jfif', available: 1,},
            {id: 8, imgSrc: '/rooms/medium/8.jfif', available: 2,},
            {id: 9, imgSrc: '/rooms/basic/13.jfif', available: 2,},
        ],
    },
    {
        id: 2, 
        name: "premium",
        beds: 2, 
        cost: 480000, 
        desc: "A premium room is a top-tier dormitory room that offers the most luxurious amenities and furnishings, such as premium bedding, a flat-screen TV, and a private balcony. This option is typically the most expensive but offers the highest level of comfort and luxury.",
        icons: [faBed, faBox, faFaucetDrip, faBolt, faTv],
        rooms: [
            {id: 1, imgSrc: '/rooms/highend/5.jfif', available: 2,},
            {id: 2, imgSrc: '/rooms/basic/13.jfif', available: 2,},
            {id: 3, imgSrc: '/rooms/highend/5.jfif', available: 2,},
            {id: 4, imgSrc: '/rooms/medium/12.jfif', available: 1,},
            {id: 5, imgSrc: '/rooms/highend/4.jfif', available: 1,},
            {id: 6, imgSrc: '/rooms/basic/13.jfif', available: 2,},
            {id: 7, imgSrc: '/rooms/highend/4.jfif', available: 1,},
            {id: 8, imgSrc: '/rooms/medium/8.jfif', available: 2,},
            {id: 9, imgSrc: '/rooms/basic/8.jfif', available: 1,},
        ],
    },
]