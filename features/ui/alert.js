import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Alert({
    type, 
    message,
    isShow=true
})  {
    // const [isShow, setIsShow] = useState(isShowProp);

    let bgColor = "bg-green-100";
    let color = "text-green";
    let icon = <p className="flex items-center gap-2 font-bold text-green">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-green" />
                    Success!
                </p>


    if (type == false) {
        bgColor = "bg-red-100";
        color = 'text-red';
        icon = <p className="flex items-center gap-2 font-bold text-red">
                    <FontAwesomeIcon icon={faXmarkCircle} className="text-xl text-red" />
                    Error!
                </p>
    } 

    return (    
        <>
            {
                isShow ?
                <section 
                    className={"fixed bottom-0 inset-x-0 h-10 flex items-center justify-center gap-4  " + bgColor}>
                    {icon}
                    {message}
                </section> : 
                null
            }
        </> 
        
    )
}