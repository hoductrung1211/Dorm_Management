import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/manage/";

const getListContract=(numPage, idPhongKTX, idTerm, status)=>{
    return axios.get(API_URL+"contract/list/"+ numPage,{
        params:{
            idPhongKTX: idPhongKTX,
            idTerm: idTerm,
            status: status
        },
        headers: authHeader() 
    }
    
    )
}

const getListIdRoom=(status)=>{
    return axios.get(API_URL+"room/combobox",{
        params:{
            statusContract: status
        },
        headers: authHeader() 
    }
   
    )
}

const searchListContract=(id)=>{
    return axios.get(API_URL+"contract/search",{
        params:{
            id: id
        },
        headers: authHeader() 
    
    }
    )
}

const getListTerm=()=>{
    return axios.get(API_URL+ "term/",
    {
      headers: authHeader() 
    }
    )
}

const updateStatusContract=(idContract)=>{
    return axios.get(API_URL+"contract/update",
        {
            params:{
                idContract: idContract
        },
        headers: authHeader() 
    
    }
   
    )
}
const MGMTService={
    getListContract,
    getListIdRoom,
    getListTerm,
    searchListContract,
    updateStatusContract
}

export default MGMTService