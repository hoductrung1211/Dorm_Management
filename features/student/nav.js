import NavButton from '../ui/nav-button';
import { faShuttleSpace, faReceipt, faHammer, faBell, faBook } from '@fortawesome/free-solid-svg-icons';

const navs = [
    {id: 0, text: "My room", icon: faShuttleSpace, url: '/student'},
    {id: 1, text: "Invoices", icon: faReceipt, url: '/student/invoice'},
    {id: 2, text: "Maintenance requests", icon: faHammer, url: null},
    {id: 3, text: "Notifications", icon: faBell, url: undefined},
    {id: 4, text: "Resources", icon: faBook, url: undefined}
]

export default function Nav({
    activeNavID,
    handleNavigate, 
}) { 

    return (
        <nav className="">
            {navs.map(nav => 
                <NavButton 
                    key={nav.id} 
                    isActive={nav.id == activeNavID} 
                    btn={nav} 
                    handleNavigate={handleNavigate}
                />
            )}
        </nav>
    )
}