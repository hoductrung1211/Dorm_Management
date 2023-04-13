import TypeInfoBlock from "./block-type-info"
import { faBed, faFaucetDrip, faBolt, faBox, faTv } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import SelectTypeBlock from "./block-select-type";
import ShowRoomsBlock from "./block-show-room"; 
import StudentSerivce from "../../../pages/api/service/Home-StudentService"

export default function RegisterSection({}) {
    
    const [typeInfo, setTypeInfo]= useState({})
    const [roomTypes, setRoomTypes] = useState([])
    const [roomDetails, setRoomDetails]= useState([])
    // const [studentDetails, setStudentDetails] = useState({})
    useEffect(()=>{
        StudentSerivce.getListTypeRoom().then(res=>{
            // List Type room in combobox   
            setRoomTypes(res.data)
        })
        StudentSerivce.getListRoomDetailsById(5).then(res=>{
            // List card 
            setRoomDetails(res.data)
        })
        StudentSerivce.getTypeRoom(5).then(res=>{
           // Desc, cost, num beds
            setTypeInfo(res.data)
        })
        
    },[])
    

    function eventSelection(id){
        
        StudentSerivce.getListRoomDetailsById(id).then(res=>{
            
            setRoomDetails(res.data)
        })
        StudentSerivce.getTypeRoom(id).then(res=>{
            setTypeInfo(res.data)
        })

    }

    return (
        <>
            <TypeInfoBlock typeInfo={typeInfo}>
                <SelectTypeBlock
                    types={roomTypes}
                    // handleChangeSelectedID={nextID => setSelectedTypeID(nextID)}
                    handleChangeSelectedID={nextID => {eventSelection(nextID)}}
                />
            </TypeInfoBlock>
            <ShowRoomsBlock  roomDetails={roomDetails} />

        </>
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