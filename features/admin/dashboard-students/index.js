import { useState } from "react";
import HeaderSection from "../../ui/section-header";
import FitlerSection from "./section-filter";
import Container from "../../user/layouts/db-container";

export default function StudentsDashboard() {
    const [filterValues, setFilterValues] = useState({
        studentID: "",
        status: 'in',
    })

    return (
        <>
            <HeaderSection>
                <FitlerSection
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                />
            </HeaderSection>
            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                    <div className="h-full w-full p-5 flex flex-col">
                            
                    </div>
                </Container>
            </div>
        </>

        
    )
}