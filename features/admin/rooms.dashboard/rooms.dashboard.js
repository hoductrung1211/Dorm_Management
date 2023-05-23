import { useContext, useState, useEffect } from "react";
import OrderButtoon from "../../ui/button-order";
import { FilterValuesContext } from "../filterValues.context";
import DataColumn from "../../ui/data.column";
import SectionRoomInfo from "./room-info.section";
import SectionRoomAdding from "./room-adding.section";
import SectionRoomEditing from "./room-editing.section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus, faSortDown, faUnsorted, faSort, faSortUp } from "@fortawesome/free-solid-svg-icons";
import MGMTService from "../../../pages/api/service/MGMT-RoomService"
import { alertContext } from "../../utils/alert.context";

const sortingButtons = [
  {id: 0,text: "ID" },
  {id: 1,text: "Type name"},
  {id: 2,text: "For gender"},
  {id: 3,text: "Number of beds"},
  {id: 4,text: "Current Students"},
  {id: 5,text: "Status"},
];



export default function SectionRooms({roomTypes, filtering}) {
  // const [status, setStatus] = useState(status)
  const showAlert = useContext(alertContext);
  const [rooms, setRooms] = useState([]);
  const [sortByType, setSortByType] = useState(false)
  const [roomAlert, setRoomAlert] = useState({
    type: true,
    desc: 'Add Successfully'
  })
  function getListRoom(){   
    MGMTService.listAllRoom(filtering.status, filtering.gender, filtering.roomType, filtering.id, sortByType).then(res=>{
      setRooms(res.data)
    }).catch((error)=>{
      if(error.response){
          console.log(error.response.data)
      }
    })
    
  }
  
  useEffect(()=>{
    getListRoom()  
  },[filtering, sortByType])
  
  
 
  const [sectionId, setSectionId] = useState(0);
  const filterValues = useContext(FilterValuesContext);
  const [roomId, setRoomId] = useState(null);
  
  // Room Info display on info dashboard
  const roomInfo = rooms.find((room) => room.phongKTX.id == roomId);
 

  // Call API with PUT status, after that update the state
  function handleUpdateRoom(roomId, typeId) {
    MGMTService.updateRoom(roomId,typeId).then(res=>{
      showAlert(true, res.data)
      
      getListRoom()
    }).catch((error)=>{
      if(error.response){
        showAlert(false, error.response.data)
          
        console.log(error.response.data)
      }
    })
  }

  function handleDeleteRoom(roomId) {
    MGMTService.deleteRoom(roomId).then(res=>{
      
      showAlert(true, res.data)
      getListRoom()
      setSectionId(0)
    }).catch((error)=>{
     if(error.response){
        
        showAlert(false, error.response.data)
         console.log(error.response.data)
     }
   })
  }


  function handleAddRoom(typeId) {
     MGMTService.addRoom(typeId, true).then(res=>{
        getListRoom()
        showAlert(true, 'Add Successfully')
     }).catch((error)=>{
      if(error.response){
        
        showAlert(false, "Add Room Failed")
          console.log(error.response.data)
      }
    })
  }

  function handleShowMore() {
    
  }
  function handleClickType(){
    setSortByType(!sortByType)
  }

  const displaySections = [
    {
      id: 0,
      section: (
        <SectionRoomList 
          rooms={rooms}
          setRoomId={setRoomId}
          setSectionId={setSectionId}
          sortByType={sortByType}
          handleClickType={handleClickType}
          // checkInRoom={getAmountContract}
        />
      ),
    },
    {
      id: 1,
      section: (
        <SectionRoomInfo
          roomInfo={roomInfo}
          setViewedId={setRoomId}
          setSectionId={setSectionId}
          handleDeleteRoom={handleDeleteRoom}
        />
      ),
    },
    {
      id: 2,
      section: (
        <SectionRoomEditing
          info={roomInfo}
          setSectionId={setSectionId}
          roomTypeList={roomTypes}
          handleUpdateRoom={handleUpdateRoom}
        />
      ),
    },
    {
      id: 3,
      section: (
        <SectionRoomAdding
          setSectionId={setSectionId}
          roomTypeList={roomTypes}
          handleAddRoom={handleAddRoom}
        />
      )
    }
  ];
  const section = displaySections.find((st) => st.id == sectionId).section;

  return <div className="h-full w-full p-4 flex flex-col">{section}</div>;
}

function SectionRoomList({ 
  rooms,
  setRoomId,
  setSectionId,
  handleClickType,
  sortByType,
}) {
  
  return (
    <>
      
      
      <header className="flex-shrink-0 grid grid-flow-col grid-cols-6 w-full h-12 font-bold rounded-tl-lg rounded-tr-lg overflow-hidden shadow-sm">
        {sortingButtons.map((button) => button.id==1 ? 
        (<OrderButtoon handleClick={handleClickType}
            key={button.id}
            button={button}
            children={
              sortByType ? <></> : <FontAwesomeIcon
              icon={faSortDown}
              className="text-xl mb-2 pl-2 text-primary"
              />
            }
          />
          
           ) :
        (
          <OrderButtoon
            key={button.id}
            button={button}
          />
        )
        )}
      </header>

      <main className="h-full w-full flex flex-col overflow-auto">
        {rooms.map((room) => (
          
          <div
            key={room.phongKTX.id}
            className="flex-shrink-0 grid grid-cols-6 text-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
            onClick={() => {
              setRoomId(room.phongKTX.id);
              setSectionId(1);
            }}
          >
            <DataColumn text={room.phongKTX.id} />
            <DataColumn text={room.phongKTX.loaiKTX.tenLoai} />
            <DataColumn text={room.phongKTX.loaiKTX.gioiTinh ? "Male" : "Female"}>
              {room.phongKTX.loaiKTX.gioiTinh ? (
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
            <DataColumn text={room.phongKTX.loaiKTX.soGiuong} />
            
            <DataColumn text={
                room.currentContract
            } />
            <DataColumn
              text={
                room.phongKTX.trangThai ? 
                <span className="text-blue-500">Enable</span>
                : <span className="text-red-600">Disable</span>
              }
            />
          </div>
        ))}
      </main>

      <div className="flex-shrink-0 w-full h-14 pt-2  flex gap-3 ">
        <button 
          className="w-32 h-full rounded-lg bg-primary text-white font-bold active:opacity-90 transition"
          onClick={() => {
            setSectionId(3);
          }}
        >
          Add
        </button>

        {/* <button 
            className="ml-auto w-32 h-full rounded-lg bg-green text-white font-bold active:opacity-90 transition"
            onClick={handleShowMore}
        >
            Show more
        </button> */}
      </div>
    </>
  );
}
