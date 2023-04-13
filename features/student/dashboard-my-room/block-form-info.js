import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function FormInfoBlock({
    title,
    infos,
    room
}) {
    
    return (
        <section className="w-80 flex flex-col gap-5">
            <header className="text-center text-xl  mb-3">
                {title}
            </header>
            {infos.map(info => <Info key={info.id} info={info} />)}
           
        </section>
    )
}

function Info({ info }) {
    return (
        <label className="relative flex flex-col">
            {info.name}
            <div className="relative" >
                <input 
                    className="w-80 h-12 bg-fa py-2 pl-5 pr-10 rounded-md"
                    value={info.value}
                    disabled
                />
                <FontAwesomeIcon 
                    icon={info.icon}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-primary"    
                />
            </div>
        </label>
    )
}