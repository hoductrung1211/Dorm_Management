import { useState } from 'react';
import Illustration from '../features/user/components/illustration';
import Header from '../features/ui/header';
import LoginModal from '../features/user/login-modal.test';
import Container from '../features/user/components/container';
import Navigation from '../features/user/navigation';
import OTPModal from '../features/user/otp-modal';

export default function Page() {
    const [isPopup, setIsPopup] = useState(false);
    const [OTPcode, setOTPcode] = useState(546213);

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
                    <OTPModal OTPcode={OTPcode} /> : 
                    <LoginModal
                        handlePushPopup={handlePushPopup} 
                    />
                }
            </Container>
        </>
    )
}