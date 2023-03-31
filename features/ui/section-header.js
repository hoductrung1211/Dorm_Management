
export default function HeaderSection({
    children,
}) {
    return (
        <header className=" h-16 py-2 flex gap-2 items-center w-full shrink-0 ">
            {children}
        </header>
    )
}