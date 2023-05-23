import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/manage/";

const listAllRoom=(status, gender, idTypeRoom, id, sortByType)=>{
    return axios.get(API_URL + "room/",
    {
        params:{
            status: status,
            gender: gender,
            idTypeRoom: idTypeRoom,
            id: id,
            sortByType: sortByType
        },
        headers: authHeader() 
    
    }
   
    )
}

const getListHaveStudent=(status)=>{
    return axios.get(API_URL+"room/combobox",{
        params:{
            statusContract: status
        },
        headers: authHeader() 
    }
   
    )
}

const getListTypeRooms=()=>{
    return axios.get(API_URL+"room-type/",
        
    {
      headers: authHeader() 
    }
    )
}

const updateRoom=(idRoom, idTypeRoom)=>{
    return axios.patch(API_URL+"room/update/"+idRoom+"/"+idTypeRoom,
    {
      headers: authHeader() 
    }
    )
}
const addRoom=(idLoaiKTX, trangThai)=>{
    return axios.post(API_URL+"room/add",
    {
        idLoaiKTX, trangThai
    },
    {
      headers: authHeader() 
    }
    )
}

const deleteRoom=(idRoom)=>{
    return axios.get(API_URL + "room/remove/"+idRoom,
    {
      headers: authHeader() 
    }
    )
}

const createNewTypeRoom = (roomTypeModel)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    // if (user && user.token){
        return axios.post(API_URL + "room-type/add", roomTypeModel,{
            headers: {
                "Content-Type": "multipart/form-data",
                // 'Authorization': user.token
              }
        })
    // }
    // return null
}

const updateTypeRoom = (idType, roomTypeModel)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    // if (user && user.token){
        return axios.put(API_URL + "room-type/update/"+idType, roomTypeModel,{
            headers: {
                "Content-Type": "multipart/form-data",
                // 'Authorization': user.token
              }
        })
    // }
    // return null
}

const deleteTypeRoom = (idType)=>{
    return axios.delete(API_URL + "room-type/remove/"+idType,
    {
        headers: authHeader()
    }
    )
    // }
    // return null
}


const RoomService={ 
    listAllRoom,
    getListHaveStudent,
    getListTypeRooms,
    updateRoom,
    addRoom,
    deleteRoom,
    createNewTypeRoom,
    updateTypeRoom,
    deleteTypeRoom
}

export default RoomService