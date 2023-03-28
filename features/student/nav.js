import { useRef, useState } from 'react';
import NavButton from '../ui/nav-button';
import { faShuttleSpace, faReceipt, faHammer, faBell, faBook } from '@fortawesome/free-solid-svg-icons';

const navs = [
    {id: 0, text: "My room", icon: faShuttleSpace, url: null},
    {id: 1, text: "Invoices", icon: faReceipt, url: null},
    {id: 2, text: "Maintenance requests", icon: faHammer, url: null},
    {id: 3, text: "Notifications", icon: faBell, url: undefined},
    {id: 4, text: "Resources", icon: faBook, url: undefined}
]

export default function Nav({
    selectedId,
    handleNavigate,
}) { 

    return (
        <nav className="">
            {navs.map(nav => 
                <NavButton 
                    key={nav.id} 
                    selected={nav.id == selectedId} 
                    btn={nav} 
                    handleNavigate={handleNavigate}
                />
            )}
        </nav>
    )
}