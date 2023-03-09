import { useState } from "react"

export default function Test({

}) {
    const [roomTypes, setRoomTypes] = useState(roomType);
    const [typeId, setTypeId] = useState(0)

    function handleOnSelect() {

    }

    return ( 
        <main>
            <PickType
                roomTypes={roomTypes}

            />
            
        </main>
    )
}

function PickType({
    roomTypes,

}) {
    return (
        <>
            <p>Your favourite dormitory is</p>
            <select>
                {   
                    roomTypes.map(type =>
                        <option value={type.id}>{type.name}</option>
                    )
                }
            </select>
        </>
    )
}

function RoomTypeInfo({

}) {

}

function RoomList({

}) {

}

var roomType = [
    {id: 0, name: "basic", beds: 6, cost: 240000, desc: "This system provides basic amenities for students, including a shared bedroom, bathroom, and common areas such as a kitchen and living room. The system may have limited access to Wi-Fi, laundry facilities, and recreational areas.", image: '/rooms/basic/8.jfif'},
    {id: 1, name: "medium", beds: 4, cost: 360000, desc: "This system provides students with more amenities than a basic system, including private or semi-private bedrooms, shared or private bathrooms, access to Wi-Fi, laundry facilities, and recreational areas such as a gym or lounge.", image: '/rooms/medium/12.jfif'},
    {id: 2, name: "high end", beds: 2, cost: 480000, desc: "This system offers students a luxury living experience, with private bedrooms and bathrooms, high-speed internet access, laundry facilities, recreational areas such as a pool or movie theater, and on-site services such as a 24-hour front desk, cleaning services, and on-site dining options.", image: '/rooms/highend/4.jfif'},
]