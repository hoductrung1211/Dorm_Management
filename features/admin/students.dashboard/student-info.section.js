import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faIdCard,
    faSignature,
    faCakeCandles,
    faAt,
    faMobile, 
    faMars,
    faVenus,
    faInfo,
    faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import AttributeText from '../../ui/attribute-text';
import AttributeValue from '../../ui/attribute-value';
import ActionButton from "../../ui/button-action";
import SectionInfoHeader from "../../layouts/info-header.section";

export default function SectionStudentInfo({
    studentInfo,
    setSectionId,
}) {
    return (
        <> 
            <SectionInfoHeader 
                title="Student's Information" 
                handleOut={() => setSectionId(0)} />

            <main className="flex flex-col h-full min-h-min gap-5 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
                <section className="w-full flex gap-3"> 
                    <SectionImage />
                    <SectionPersonalInformation
                        studentInfo={studentInfo} />
                    <SectionActions>
                        <ActionButton title="Room History" />
                        <ActionButton title="View all contracts" />
                        <ActionButton title="Report" bgRed={true} />
                    </SectionActions>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <SectionAnalysis />
                </section>
            </main>
        </>
    )
}

function SectionImage({

}) {
    return (
        <section className="w-full">
            <AttributeText title="Student Image" />
            <div className="flex justify-center items-center w-full aspect-square">
                <div className="w-10/12 aspect-square bg-ec rounded-md" />
            </div> 
        </section>
    )
}

function SectionPersonalInformation({
    studentInfo,
}) {
    return (
        <section className="flex flex-col w-full ">
            <AttributeText title="Personal Information">
                <div className="max-w-xs h-full flex flex-col justify-between gap-6 p-4 border-2 rounded-lg ">
                    <AttributeValue icon={faIdCard} value={studentInfo.username} />
                    <AttributeValue icon={faSignature} value={studentInfo.hoTen} />
                    <AttributeValue icon={studentInfo.gioiTinh ? faMars : faVenus} value={studentInfo.gioiTinh ? "Male" : "Female"} />
                    <AttributeValue icon={faCakeCandles} value={studentInfo.ngaySinh} />
                    <AttributeValue icon={faAt} value={studentInfo.mail} />
                    <AttributeValue icon={faMobile} value={studentInfo.sdt} />
                </div>
            </AttributeText>
        </section>
    )
}

function SectionActions({
    children,
}) {
    return (
        <section className="flex flex-col w-full ">
            <AttributeText title="Actions">
                <div className="flex flex-col h-full gap-3 p-3 border-2 border-ec rounded-md">
                    {children}
                </div>
            </AttributeText>
        </section>
    )
}

function SectionAnalysis({

}) {
    return (
        <>
        <div className="col-span-1 flex flex-col">
            <AttributeText title="Analysis" />
            <div className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                <AnalysisField text="Status" icon={faInfo} content="In dorm" />
                <AnalysisField text="Date in" icon={faRightFromBracket} content="01/01/2023" />
                <AnalysisField text="Date out" icon={faRightFromBracket} content="06/06/2023" />
            </div>
        </div>
        </>
    )
}

function AnalysisField({
    text,
    icon,
    content,
}) {
    return (
        <div className="h-full grid grid-flow-col items-center">
            <h6 className="col-span-6 w-1/2 font-bold"><FontAwesomeIcon icon={icon} className="text-lg mr-2" />{text}:</h6>
            <p className="col-span-1">{content}</p>
        </div>
    )
}