import { faDiceD20 } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import {url} from "../utils/links"


export default function Logo() {
    return (
        <Link 
            href={url.home}
            className="flex items-center gap-1 font-bold">
            <FontAwesomeIcon className="text-2xl" icon={faDiceD20} />
            Dormitory
        </Link>
    )
}