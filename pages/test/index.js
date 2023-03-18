import Link from "next/link"

export default function App() {
    return (
        <> 
            <Header />
            <A />
            <B />
            <C />
        </>
    )
}

function A() {
    return (
        <div id="a" className="h-screen bg-slate-600"></div>
    )
}

function B() {
    return (
        <div id="b" className="h-screen bg-zinc-900"></div>
    )
}

function C() {
    return (
        <div id="c" className="h-screen bg-yellow-600"></div>
    )
}

function Header() {
    return (
        <header className="flex gap-10">
            <Link href="/test#a">Link to A</Link>
            <Link href="/test#b">Link to B</Link>
            <Link href="/test#c">Link to C</Link>
        </header>
    )
}