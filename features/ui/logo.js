import { faDiceD20 } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import {userURL} from "../utils/links"


export default function Logo() {
    return (
        <Link 
            href={userURL.index}
            className="flex items-center gap-1 font-bold">
            <FontAwesomeIcon className="text-2xl" icon={faDiceD20} />
            Dormitory
        </Link>
    )
}