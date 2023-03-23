import Logo from "../components/Logo" 
import { Nav } from ".."
import { faFacebook, faInstagramSquare, faYoutubeSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const media = [
    faTwitterSquare,
    faInstagramSquare,
    faFacebook,
    faYoutubeSquare,
]

export default function Footer({
    children,
}) {
    return (
        <footer className="py-10 border-y-2">
            <div className="container">
                <div className="w-fit">
                    <Logo />
                </div>
                <div className="mt-10 pb-4 border-b-2">
                    {children}
                </div>
                <div className="py-10 flex items-center justify-between">
                    <p className="text-6">
                        © 2023 Cube Dormitory. All rights reserved
                    </p>
                    <ul className="flex gap-5">
                        {media.map((m, index) => 
                            <li key={index}>
                                <FontAwesomeIcon className="cursor-pointer text-4xl" icon={m} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

