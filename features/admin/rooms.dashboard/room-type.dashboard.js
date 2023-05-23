import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderButtoon from "../../ui/button-order";
import DataColumn from "../../ui/data.column";
import { moneyConverter } from "../../utils/convert";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import SectionRoomTypeEditing from "./room-type-editing.section";
import SectionRoomTypeInfo from "./room-type-info.section";
import SectionAddingRoom from "./room-type-adding.section";
import MGMTService from "../../../pages/api/service/MGMT-RoomService"
import { useContext } from "react";
import { alertContext } from "../../utils/alert.context";

const sortingButtons = [
  {id: 0,text: "ID" },
  {id: 1,text: "Type name" },
  {id: 2,text: "For gender" },
  {id: 3,text: "Number of beds" },
  {id: 4,text: "Cost per month" },
];


export default function SectionRoomTypes({roomTypes, setRoomTypes}) {
  // const [roomTypes, setRoomTypes] = useState(initRoomTypes);
  const [sectionId, setSectionId] = useState(0);
  const [roomTypeInfoId, setRoomTypeInfoId] = useState(0);
  const [roomTypeAlert, setRoomTypeAlert]= useState({})
  const showAlert = useContext(alertContext);


  function loadListTypeRoom(){
    MGMTService.getListTypeRooms().then(res=>{
      setRoomTypes(res.data)
      setSectionId(0);
    })
    .catch((error)=>{
    if(error.response){
        console.log(error.response.data)
    } 
    })
  }
  
  const roomTypeInfo = roomTypes.find(
    (roomType) => roomType.id == roomTypeInfoId
  );
 


  async function handleUpdateInfo(updatedInfo) {
    try{
      const response= await MGMTService.updateTypeRoom(updatedInfo.id, updatedInfo)
      showAlert(true, 'Update Successfully')
      setSectionId(1)
      return response.data
    }catch(error){
      if (error.response) { 
        
        showAlert(false, error.response.data)
        console.log(error.response.data);
       } else { // Something wrong in setting up the request
        console.log('Error', error.message);
      }
      console.log(error.config); 
      return null
    }    

  }
  function handleDeleteRoomType(roomTypeId) {
    MGMTService.deleteTypeRoom(roomTypeId).then(res=>{
      showAlert(true, 'Delete Successfully')
      loadListTypeRoom()
    }).catch((error)=>{
        if(error.response){
          showAlert(false, error.response.data)
          console.log(error.response.data)
    }
    })
  }

  function handleShowMore() {
    
  }
  async function handleAddingRoomType(data){
    // console.log(data)
    try{
      const response= await MGMTService.createNewTypeRoom(data)
      loadListTypeRoom()
      showAlert(true, 'Add Successfully')
      return response.data
    }catch(error){
      if (error.response) { 
        console.log(error.response.data);
        showAlert(false, error.response.data)
      } else { // Something wrong in setting up the request
        console.log('Error', error.message);
      }
      console.log(error.config); 
      return null
    }    
  }


  const displaySections = [
    {
      id: 0,
      section: (
        <SectionRoomTypeList 
          roomTypes={roomTypes}
          setRoomTypeInfoId={setRoomTypeInfoId}
          setSectionId={setSectionId}
          handleShowMore={handleShowMore}
        />
      ),
    },
    {
      id: 1,
      section: (
        <SectionRoomTypeInfo
          info={roomTypeInfo}
          setSectionId={setSectionId}
          handleDeleteRoomType={handleDeleteRoomType}
          roomTypeAlert={roomTypeAlert}
        />
      ),
    },
    {
      id: 2,
      section: (
        <SectionRoomTypeEditing
          info={roomTypeInfo}
          handleUpdateInfo={handleUpdateInfo}
          setSectionId={setSectionId}
          roomTypeAlert={roomTypeAlert}
        />
      ),
    },
    {
      id: 3,
      section: (
        <SectionAddingRoom
          info={roomTypeInfo}
          handleAddingRoomType={handleAddingRoomType}
          setSectionId={setSectionId}
          roomTypeAlert={roomTypeAlert}
        />
      ),
    },
  ];
  const section = displaySections.find((st) => st.id == sectionId).section;

  return <div className="h-full w-full p-4 flex flex-col">{section}</div>;
}

function SectionRoomTypeList({ 
  roomTypes,
  setRoomTypeInfoId,
  setSectionId,
  handleShowMore,
}) {
  return (
    <>
      <header className="flex-shrink-0 grid grid-flow-col grid-cols-5 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {sortingButtons.map((button) => (
          <OrderButtoon
            key={button.id}
            button={button}
          />
        ))}
      </header>

      <main className="h-full w-full flex flex-col  overflow-auto">
        {roomTypes.map((roomType) => (
          <div
            key={roomType.id}
            className="flex-shrink-0 grid grid-cols-5 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
            onClick={() => {
              setRoomTypeInfoId(roomType.id);
              setSectionId(1);
            }}
          >
            <DataColumn text={roomType.id} />
            <DataColumn text={roomType.tenLoai} />
            <DataColumn text={roomType.gioiTinh ? "Male" : "Female"}>
              {roomType.gioiTinh ? (
                <FontAwesomeIcon
                  icon={faMars}
                  className=" text-xl mr-1 text-primary"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faVenus}
                  className="text-xl mr-1 text-pink-500"
                />
              )}
            </DataColumn>
            <DataColumn text={roomType.soGiuong} />
            <DataColumn
              text={moneyConverter(roomType.giaPhong)}
              className="font-bold"
            />
          </div>
        ))}
      </main>

      <div className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
          <button 
            className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
            onClick={() => setSectionId(3)}
          >
              Add
          </button>

          <button 
              className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
              onClick={handleShowMore}
          >
              Show more
          </button>
      </div>
    </>
  );
}
