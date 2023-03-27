import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function InputGroup({
    input,
    handleValueChange,
}) {
    let inputClassName = 'w-72 pl-4 pr-10 py-2 rounded-md bg-ec outline-none border-2'
    if (input.error)
        inputClassName += ' border-red'

    return (
        <label className='mt-3 flex flex-col capitalize'>
            {input.name}
            <div className='relative'>
                <input 
                    className={inputClassName}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={e => handleValueChange({
                        ...input,
                        value: e.target.value, 
                        error: undefined,
                    })}
                />
                <FontAwesomeIcon className='absolute right-4 top-1/2 -translate-y-1/2' icon={input.icon} />
            </div>
            <div className='relative normal-case left-0 top-0'>
                {input.error && (Array.isArray(input.error) 
                    ? input.error.map(err => <Error error={err} />)
                    : <Error error={input.error} />)}
            </div>
        </label>
    )
}