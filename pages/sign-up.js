import { useState } from 'react';
import Navigation from '../features/user/layouts/navigation';
import Illustration from '../features/user/components/illustration';
import Header from '../features/ui/header';
import Container from '../features/user/layouts/container';
import SignupModal from '../features/user/layouts/signup-modal';
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
                <Illustration imgUrls={["/pics/signup_2.jpg", "/pics/signup.jpg"]} />
                {
                    isPopup ? 
                    <OTPModal 
                        inputOTP={inputOTP}
                        redirect={redirect}
                    /> : 
                    <SignupModal 
                        handlePushPopup={handlePushPopup} 
                        inputOTP={setInputOTP}
                        redirect={setRedirect}
                        />
                }
            </Container>
        </>
    )
}


 