import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Input({
    input,
    onValueChange,
    children,
  }) {
    let inputClassname = 'w-full pl-4 pr-12 py-2 bg-light rounded-md outline-none border-2';
    if (input.validation)
      inputClassname += ' border-red-500'

    return (
      <label className='flex flex-col'>
        <span className="capitalize">{input.name}</span>

        <div className="relative">
          {/* Input  */}
          <input 
            className={inputClassname}
            type={input.type}
            value={input.value}
            placeholder={input.placeholder}
            onChange={e => onValueChange({
              ...input,
              value: e.target.value,
            })}
          />

          {/* Icon  */}
          <div className="absolute h-full flex items-center top-0 right-4">
            {children}
          </div>

          {/* Error message */}
          <p className="absolute top-full text-red-700 text-sm">
            {input.validation}
          </p>
        </div>
      </label>
    )
  }