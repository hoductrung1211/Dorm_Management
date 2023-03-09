import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Logo({

}) {
    return ( 
        <Link className="flex items-center gap-x-1 text-2xl" href='/'>
            <FontAwesomeIcon icon={faDiceD20} /> 
            Dormitory
        </Link> 
    )
}