import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Input({
    input,
    onValueChange,
    children,
  }) {
    return (
      <label className='flex flex-col'>
        <span className="capitalize">{input.name}</span>
        <div className="relative">
          <input 
            className='w-full pl-4 pr-12 py-2 bg-light rounded-md outline-none'
            type={input.type}
            value={input.value}
            placeholder={input.placeholder}
            onChange={e => onValueChange({
              ...input,
              value: e.target.value,
            })}
          />
          <div className="absolute h-full flex items-center top-0 right-4">
            {children}
          </div>
        </div>
      </label>
    )
  }