import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user.context";
import StudentNav from '../../features/student/nav';
import MyRoomDashboard from "../../features/student/dashboard-my-room/index";
import Main from "../../features/layouts/main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StdService from "../../pages/api/service/Home-StudentService"
import {studentURL,userURL} from '../../features/utils/links'
import Notification from "../../features/ui/notification-text"

export default function Page() {
    
    const router = useRouter();
    const activeNavID = 0;
    const [errorApi, setErrorApi]= useState(undefined)
    const [user, setUser] = useState({})
    useEffect(()=>{
        StdService.getStudentDetails().then(res=>{
            setErrorApi(null)
            console.log(res.data)
            setUser(res.data)
        }).catch((error)=>{
            console.log('tata')
            if( error.response ){ 
                if(error.response.status===401){
                    setErrorApi("Unauthorized")
                }
                else if(error.response.status==403){
                    router.push(userURL.login)
                }
            }
            else{
                setErrorApi("Network error")
            }
        })
    },[])
    
    // const user = {
    //     id: "N19DCCN018", 
    //     name: "Nguyen Dang Bac", 
    //     role: false, 
    //     gender: true,
    //     dateOfBirth: '01-01-2001',
    // };

    function handleNavigate(nextURL) {
        router.push(nextURL); 
    }
    if(errorApi===null){
        return(
            <userContext.Provider value={user}>
                <Sidebar
                    activeNavID={activeNavID}
                    handleNavigate={handleNavigate}
                >
                    <StudentNav
                        activeNavID={activeNavID}
                        handleNavigate={handleNavigate}
                    />
                </Sidebar>

                <Main>
                    <MyRoomDashboard />
                </Main>
            </userContext.Provider>
        )
    }
    else if(errorApi == 'Network error'){
        return(
            <Notification title='Network error' desc="Please check your network or your server!"/>
        )
    }
    else if(errorApi == "Unauthorized"){
        return(
            <Notification title='Unauthorized' desc="Login session expired, please login again!" buttonName="Login" url={userURL.login} />
        )
    }
    else{
        return(
            <></>
        )
    }

}

 