export default function Container({
    children,
}) {
    return (
        <main className='w-screen'>
            <div className='container h-screen grid items-center'>
            <section className='py-10 px-8 flex justify-around  shadow-md rounded-2xl'>
                {children}
            </section>
            </div>
        </main>
    )
}