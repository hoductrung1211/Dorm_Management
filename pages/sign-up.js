import Navigation from '../features/user/layouts/navigation';
import Illustration from '../features/user/components/illustration';
import Header from '../features/ui/header';
import Container from '../features/user/layouts/container';
import SignupModal from '../features/user/layouts/signup-modal';

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


 