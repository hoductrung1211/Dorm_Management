import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Error from '../ui/error';

export default function InputGroup({
    name,
    type,
    placeholder,
    value,
    icon,
    handleChange,
    error,
}) {
    let inputClassName = 'w-72 pl-4 pr-10 py-2 rounded-md bg-ec outline-none border-2'
    if (error)
        inputClassName += ' border-red'

    return (
        <label className='mt-3 flex flex-col capitalize'>
            {name}
            <div className='relative'>
                <input 
                    className={inputClassName}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => handleChange(e.target.value)}
                />
                <FontAwesomeIcon className='absolute right-4 top-1/2 -translate-y-1/2' icon={icon} />
            </div>

            <div className='relative normal-case left-0 top-0'>
                {/* {error && (Array.isArray(error) 
                    ? error.map(err => <Error error={err} />)
                    : <Error error={error} />)} */}
                {error && <Error error={error} />}
            </div>
        </label>
    )
}