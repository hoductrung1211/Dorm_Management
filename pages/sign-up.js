import {validateUsername, validatePassword} from './utils/validation'; 
import Navigation from '../features/user/navigation';
import Illustration from '../features/user/components/illustration';
import Header from '../features/ui/header';


const initInputs = [
    {name: "identifier", type: "text", value: "", placeholder: "N19DCCN001", icon: faUser, error: undefined, validate: validateUsername},
    {name: "password", type: "password", value: "", placeholder: "At least 6 characters", icon: faKey, error: undefined, validate: validatePassword},
    {name: "confirm password", type: "password", value: "", placeholder: "Enter your password again", icon: faKey, error: undefined, validate: validatePassword},
]

export default function Page() {
    return (
        <>
            <Header>
                <Navigation />
            </Header>
            {/* <Main>
                <Illustration />
                <SignUpForm
                    imgUrls={["/pics/signup_2.jpg", "/pics/signup.jpg"]}
                />
            </Main> */}
        </>
    )
}


 