import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SucessfullyBlock({
    title,
    desc,
}) {
    return (
        <section className="w-full h-full flex justify-center items-center">
            <FontAwesomeIcon 
                icon={faCheckCircle}
                className="text-green text-4xl"
            />
            <h3 className="">{title}</h3>
            <p className="">{desc}</p>
        </section>
    )
}