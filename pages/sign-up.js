import Navigation from '../features/user/navigation';
import Illustration from '../features/user/components/illustration';
import Header from '../features/ui/header';
import Container from '../features/user/components/container';
import SignupModal from '../features/user/signup-modal';

export default function Page() {
    return (
        <>
            <Header>
                <Navigation />
            </Header>
            <Container>
                <Illustration imgUrls={["/pics/signup_2.jpg", "/pics/signup.jpg"]} />
                <SignupModal />
            </Container>
        </>
    )
}


 