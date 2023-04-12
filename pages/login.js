import { useState } from 'react';
import Illustration from '../features/user/components/illustration';
import Header from '../features/ui/header';
import LoginModal from '../features/user/layouts/login-modal';
import Container from '../features/user/layouts/container';
import Navigation from '../features/user/layouts/navigation';
import OTPModal from '../features/user/layouts/otp-modal';

export default function Page() {
    const [isPopup, setIsPopup] = useState(false);
    const [inputOTP, setInputOTP]=useState(undefined)
    const [redirect, setRedirect] = useState('')
    function handlePushPopup() {
        setIsPopup(true);
    }
    

    return (
        <>
            <Header>
                <Navigation />
            </Header>
            <Container>
                <Illustration
                    imgUrls={["/pics/login4.jpg", "/pics/login2.jpg"]} 
                />
                {   isPopup ? 
                    <OTPModal 
                        inputOTP={inputOTP}
                        redirect={redirect}
                    /> : 
                    <LoginModal
                        handlePushPopup={handlePushPopup} 
                        inputOTP={setInputOTP}
                        redirect={setRedirect}
                    />
                }
            </Container>
        </>
    )
}