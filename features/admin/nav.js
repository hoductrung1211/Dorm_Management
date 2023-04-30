import NavButton from '../ui/nav-button';
import { faReceipt, faBook, faUser, faDoorOpen, faPenNib, faUserTie } from '@fortawesome/free-solid-svg-icons';
import {managerURL} from '../utils/links';

const navs = [
    {id: 0, text: "Students", icon: faUser, url: managerURL.index},
    {id: 1, text: "Rooms", icon: faDoorOpen, url: managerURL.rooms},
    {id: 2, text: "Bill & Invoices", icon: faReceipt, url: managerURL.invoices},
    {id: 3, text: "Contracts", icon: faPenNib, url: managerURL.contracts},
    {id: 4, text: "Terms", icon: faBook, url: managerURL.terms},
    {id: 5, text: "Admins", icon: faUserTie, url: managerURL.admins}
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