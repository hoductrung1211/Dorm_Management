import Logo from "../components/Logo"
import Link from "next/link"
import {url} from "../utils/links"

export default function Header({
    children,
}) {
    return (
        <header className="fixed w-screen bg-fa shadow-md z-20">
            <div className="container h-16 flex items-center">
                <Logo />
                <div className="ml-20">
                    {children}
                </div>
                <ActionButtons />
            </div>
        </header>
    )
}

function ActionButtons() {
    return (
        <div className="ml-auto flex gap-12">
            <Link href={url.login}>
                Login
            </Link>
            <Link href={url.signup}>
                Sign up                
            </Link>
        </div>
    )
}