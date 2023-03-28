export default function MainLayout({children}) {
    return (
        <main className="fixed ml-20 py-10 left-1/2 inset-y-0 w-4/6 h-screen -translate-x-1/2 flex flex-col">
            { children }
        </main>
    )
}