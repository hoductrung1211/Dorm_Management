import Link from "next/link";

export default function NavigationList({
    navList,
}) {
    return (
        <nav><ul className="flex items-center">
            {
                navList.map(nav => 
                    <Navigation key={nav.text} nav={nav} />
                )
            }
        </ul></nav>
    )
}

function Navigation({
    nav
}) {
    return (
        <li>
            <Link className="flex items-center h-16 px-8 hover:bg-white " href={nav.href}>{nav.text}</Link>
        </li>
    )
}

