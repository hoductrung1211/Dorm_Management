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
            <section className='flex bg-white rounded-lg shadow-md'>
                <div className='w-2/3 flex justify-center py-4 bg-zinc-100'>
                    <Illustration />
                </div>

                <div className='mx-auto pt-24 pb-10  flex flex-col w-72'>
                    <div className='relative h-28'>
                        <Image 
                            className='object-fill'
                            src="/svg/welcome.svg"
                            fill 
                        />
                    </div>

                    <LoginForm>
                        <div className='h-24' />
                    </LoginForm>

                </div>
            </section>
        </Container>
    )
}

function Illustration() {
    return (
        <div className='flex'>
            <div className='relative w-96'>
                <Image 
                    className='object-cover'
                    src="/pics/login2.jpg"
                    fill 
                />
            </div>
            <div className='relative w-96'>
                <Image 
                    className='object-cover'
                    src="/pics/login3.jpg"
                    fill 
                />
            </div>
        </div>
    )
}
