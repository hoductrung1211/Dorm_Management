import Image from 'next/image';
import Container from './layouts/Container'
import Header from './layouts/Header'
import LoginForm from './layouts/LoginForm';

export default function Login({

}) {
    return (
        <>
            <Header />
            <Main />
        </>
    )
}

function Main() {
    return (
        <Container>
            <section className='flex bg-white'>
                <div className='w-2/3 flex justify-center px-20 py-4 bg-zinc-100'>
                    <Illustration />
                </div>

                <div className='mx-auto py-20  flex flex-col w-72'>
                    <LoginForm>
                        <div className='h-48' />
                    </LoginForm>

                </div>
            </section>
        </Container>
    )
}

function Illustration() {
    return (
        <div className='relative w-96'>
            <Image 
                className='object-cover'
                src="/pics/login.jpg"
                fill 
            />
        </div>
    )
}
