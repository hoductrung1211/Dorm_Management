import FormBlock from "./block-form"; 
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import RegisterSection from "./section-register";
import {SectionContext} from '../../utils/section.context';  
import StudentSerivce from "../../../pages/api/service/Home-StudentService"



export default function RegisterFormSection({dataContract} ) {


    return (
        <main className="p-5 h-full w-full">
            <div className="flex flex-col w-full h-full py-5 px-6  border-2 border-ec rounded-xl">
                <FormHeader />
                <FormBlock dataContract={dataContract}/>
            </div>
        </main>
    )
}


function FormHeader() {
    const setSection = useContext(SectionContext);

    return (
        <header className="relative flex justify-center items-center w-full h-10 text-2xl">
            <button 
                className="absolute left-0 h-12 w-12 rounded-full active:bg-ec transition text-3xl"
                onClick={() => setSection(<RegisterSection />)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            Register Form
        </header>
    )
}