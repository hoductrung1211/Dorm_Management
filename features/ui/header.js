import Logo from "./logo"

export default function Header({
    children,
}) {
    return (
        <header className="fixed w-screen bg-fa shadow-md z-30">
            <div className="container h-16 flex items-center">
                <Logo /> 
                {children} 
            </div>
        </header>
    )
}

 