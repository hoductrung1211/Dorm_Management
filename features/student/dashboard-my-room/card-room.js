import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {SectionContext} from '../../utils/section.context';  

import RegisterFormSection from './section-register-form';
import StudentSerivce from "../../../pages/api/service/Contract-StudentService"

export default function RoomCard({ 
    room, 
    typeName, 
    cost, 
    getMap, 
    // studentDetails
}) {
    const setSection = useContext(SectionContext);
    
    
    const handleChooseRoomCard=()=>{
        StudentSerivce.getViewBeforeCreateContract(room.id).then(res=>{
            setSection(<RegisterFormSection dataContract={res.data} />)
            
        })
        
        
    }

    return (
        <li 
            key={room.id} 
            className="shrink-0 w-80 min-h-min h-5/6 max-h-96 p-2 bg-fa rounded-xl cursor-pointer shadow-md hover:shadow-sm hover:scale-95 hover:bg-ec transition-all overflow-hidden"
            onClick={handleChooseRoomCard }
            ref={node => {
                const map = getMap();

                if (node)
                    map.set(room.id, node);
                else map.delete(room.id);
            }}>
            <div className="relative h-4/5 w-full rounded-lg overflow-hidden">
                <img className="object-cover  " src={room.image} alt="room iamge"/>
                {/* <Image
                    className="object-cover  "
                    src={room.imgSrc}
                    fill
                    alt="room iamge"
                /> */}
            </div>
            <div className="mt-2 px-2 flex justify-between items-center">
                    <p>Room <span className="font-bold">#{room.id}</span></p>
                    <p>{typeName}</p>
            </div>
            <div className="mt-2 px-2 flex justify-between items-center">
                    <p className="text-zinc-500"><span className="font-bold text-b">{room.emptyBed}</span> beds left</p>
                    <p><span className="font-bold">{cost}</span> đ/month</p>
            </div>
        </li>
    )
}