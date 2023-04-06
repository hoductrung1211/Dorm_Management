
export default function HeaderSection({
    children,
}) {
    return (
        <header className="relative h-16 py-2 flex gap-2 items-center w-full shrink-0 ">
            {children}
        </header>
    )
}