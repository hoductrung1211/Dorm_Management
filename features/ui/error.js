import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Error({error}) {
    return  (
        <p className='w-72 flex items-center gap-2 text-sm text-red'>
            <FontAwesomeIcon icon={faXmarkCircle} />
            {error}
        </p>
    )
}