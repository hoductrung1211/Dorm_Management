import { useState, useEffect } from "react";
import HeaderSection from "../../layouts/section-header";
import MenuButton from "../../ui/button-menu";
import Container from "../../user/layouts/db-container";
import SectionRoomTypes from "./room-type.dashboard";
import SectionRooms from "./rooms.dashboard";
import InputFilter from "../../ui/input-filter";
import FilterSelection from "../../ui/select-filter";
import { FilterValuesContext } from "../filterValues.context";
import MGMTService from "../../../pages/api/service/MGMT-RoomService"



export default function RoomsDashboard() {
    
    const [roomTypes, setRoomTypes] = useState([])
    // seclected dropdown


    const [filtering, setFiltering] = useState({
        gender : null,
        status: true,
        roomType: "", 
        id: ""
    })
    
    function getListTypeRooms(){
        MGMTService.getListTypeRooms().then(res=>{
            setRoomTypes(res.data)
            
        })
        .catch((error)=>{
        if(error.response){
            console.log(error.response.data)
        }
        })
    }
    useEffect(()=>{
        getListTypeRooms()
    },[roomTypes])
    const menus = [
        {
            id: 0,
            text: "Rooms",
            section: <SectionRooms roomTypes={roomTypes} filtering={filtering}/>,
        },
        {
            id: 1,
            text: "Room Types",
            section: <SectionRoomTypes roomTypes={roomTypes} setRoomTypes={setRoomTypes}/>,
        },
    ]
    const [menuID, setMenuID] = useState(0);
    const section = menus.find(menu => menu.id == menuID).section;
    

    function handleChangeMenu(nextMenuID) {
        setFiltering({
            gender : null,
            status: true,
            roomType: "", 
            id: ""
        })
        setMenuID(nextMenuID);
    }

    // Just display search bar when the menu is ROOMS
    const searchBar = menuID == 0 
        && <FilterBar 
        roomTypes={roomTypes}

        setFiltering={setFiltering}
        filtering={filtering}
        />
        

    return (
        <FilterValuesContext.Provider value={filtering}>
            <HeaderSection>
                <div className="relative top-1.5 h-14 -mt-1 z-10"> 
                    {menus.map(menu => 
                        <MenuButton 
                            key={menu.id}
                            id={menu.id}
                            menu={menu} 
                            isActive={menuID == menu.id} 
                            handleChangeActiveMenu={handleChangeMenu}
                        />
                    )}
                </div>
                
                {searchBar}
            </HeaderSection>

            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                {section}
                </Container>
            </div>
        </FilterValuesContext.Provider>
    )
}

function FilterBar({
    roomTypes,
    setFiltering,
    filtering
}) {


    return (
        
        <div className="pl-2 w-20 flex-grow h-full grid grid-flow-col gap-2">
            <InputFilter
                textValue={filtering.id}
                handleTextChange={nextText => {
                    setFiltering({
                        
                        ...filtering,
                        id: nextText,
                    })
                }}
                placeholder="Search ID.."
            />
            <FilterSelection
                title="Types"
                options={[
                        {text: "All", value: ""},
                        ...roomTypes.map(roomType => ({
                            text: roomType.tenLoai,
                            value: roomType.id,
                        }))
                ]}
                handleChangeSelection={nextType => {

                    setFiltering({
                        ...filtering,
                        roomType: nextType,
                    })
                    
                }}
            />
            <FilterSelection
                title="Gender"
                options={[
                    {text: "All", value: ""},
                    {text: "Male", value: true},
                    {text: "Female", value: false},
                ]}
                handleChangeSelection={nextGender => {
                    setFiltering({
                        ...filtering,
                        gender: nextGender,
                    })
                }}
            />
            

            <FilterSelection
                title="Status"
                options={[
                    {text: "Enable", value: true},
                    {text: "Disabled", value: false},
                ]}
                handleChangeSelection={nextStatus => {        
                    setFiltering({
                        ...filtering,
                        status: nextStatus,
                    })
                }}
            />
        </div>
    )
}