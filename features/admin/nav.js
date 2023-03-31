import NavButton from '../ui/nav-button';
import { faReceipt, faBook, faUser, faDoorOpen, faPenNib } from '@fortawesome/free-solid-svg-icons';
import {managerURL} from '../utils/links';

const navs = [
    {id: 0, text: "Students", icon: faUser, url: managerURL.index},
    {id: 1, text: "Rooms", icon: faDoorOpen, url: null},
    {id: 2, text: "Bill & Invoices", icon: faReceipt, url: null},
    {id: 3, text: "Contracts", icon: faPenNib, url: undefined},
    {id: 4, text: "Terms", icon: faBook, url: undefined}
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