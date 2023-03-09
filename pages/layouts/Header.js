import { useState } from "react";
import Logo from "../components/Logo";
import Container from "./Container";
import NavigationList from './NavigationList';

export default function Header({

}) { 
    return (
        <>
        <header className="fixed left-0 top-0 right-0 z-10 bg-light shadow-md">
            <Container className="flex justify-between">
                <Logo />
                <NavigationList navList={navList} />
            </Container>
        </header>
        <div className="h-16"></div>
        </>
    )
}

const navList = [
    {text: "Home", href: "/"},
    {text: "About", href: "/about"},
    {text: "FAQ", href: "/faq"},
    {text: "Login", href: "/login"},
    {text: "Sign up", href: "/sign-up"},
]