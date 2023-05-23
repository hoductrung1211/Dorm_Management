import NavButton from '../ui/nav-button';
import { faReceipt, faBook, faUser, faDoorOpen, faPenNib, faUserTie, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import {managerURL} from '../utils/links';
import { useEffect, useState } from 'react';
import Authorities from "../../pages/api/admin-auth/AuthRoles"
import { useRouter } from 'next/router';
 
const adminNavs = [
    {id: 0, text: "Students", icon: faUser, url: managerURL.index, roles: ["admin", "censor", "owner"]},
    {id: 1, text: "Rooms", icon: faDoorOpen, url: managerURL.rooms, roles: ["admin", "owner"]},
    {id: 2, text: "Bill & Invoices", icon: faReceipt, url: managerURL.invoices, roles: ["admin", "censor", "owner"]},
    {id: 3, text: "Contracts", icon: faPenNib, url: managerURL.contracts, roles: ["admin", "censor", "owner"]},
    {id: 4, text: "Terms", icon: faBook, url: managerURL.terms, roles: ["admin", "owner"]},
    {id: 5, text: "Admins", icon: faUserTie, url: managerURL.admins, roles: ["owner"]}
]

export default function Nav({
    activeNavID,
    handleNavigate, 
    authority
}) {  
    const [navs, setNavs] = useState([]);

    useEffect(()=>{ 
        const tempNav = adminNavs.reduce((res, nav) => {
            if (nav.roles.includes(authority)) {
                res.push(nav);
            }
            return res;
        }, []);
        console.log('authority: ', authority)
        console.log("tempNAV", tempNav);
        setNavs(tempNav)
         
    }, [])

    return (
        <nav className=""
            key={activeNavID}
        >
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