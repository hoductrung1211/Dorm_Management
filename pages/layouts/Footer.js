import Logo from "../components/Logo";
import Container from "./Container";
import NavigationList from "./NavigationList";

export default function Footer({

}) {
    return (
        <footer className="bg-light">
            <Container className="block mt-10 flex-col items-end py-8">
                <Logo />
                
                <div className="flex justify-between items-end">
                    <NavigationList navList={navList}  />
                    <p>©2023 Dormitory. All rights reserved</p>
                </div>
                
            </Container>
        </footer>
            
    )
}

const navList = [
    {text: "Overview", href: "/"},
    {text: "Features", href: "/"},
    {text: "Help", href: "/"},
    {text: "Privacy", href: "/"},
]