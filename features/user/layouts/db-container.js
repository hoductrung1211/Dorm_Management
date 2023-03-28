export default function Container({ children }) {
    return (
        <section className="absolute w-full bottom-0 left-0 h-full flex flex-col border-2 border-ec rounded-2xl rounded-tl-none">
            {children}
        </section>
    )
}