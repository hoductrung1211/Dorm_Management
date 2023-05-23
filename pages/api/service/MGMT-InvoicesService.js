import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/manage/";


const getListWater=(numPage, month, year, status)=>{
    return axios.get(API_URL + "invoices/water",
    
    {
        params:{
            numPage: numPage,
            months: month,
            years: year,
            status: status
        },
        headers: authHeader()
    }
    )
}

const getListElectric=(numPage, month, year, status)=>{
    return axios.get(API_URL + "invoices/electric",
    
    {
        params:{
            numPage: numPage,
            months: month,
            years: year,
            status: status
        },
        headers: authHeader()
    }
    )
}

const updateElectric=async(id)=>{
    const response= await axios.patch(API_URL + `invoices/electric/update/${id}`,
    
    {
        headers: authHeader()
    }
    )
    return response
}


const updateWater=async(id)=>{
    const response= await axios.patch(API_URL + `invoices/water/update/${id}`,
    {
        headers: authHeader()
    }
    )
    return response
}

const listWaterPrice=(year)=>{
    return axios.get(API_URL+"price/water",
    {
        params:{
            year : year
        },
        headers: authHeader()
    }
    )
}

const listElectricPrice=(year)=>{
    return axios.get(API_URL+"price/electric",
    {
        params:{
            year : year
        },
        headers: authHeader()
    }
    )
}

const updateCostElectricity= async(id, cost)=>{
    const response= await axios.patch(API_URL+ `price/electric/update/${id}?cost=${cost}`, 
    {
        // params:{
        //     cost: parseFloat(cost)
        // }
        headers: authHeader()
    }
    )
    return response
}



const updateCostWater= async(id, cost)=>{
    
    const response= await axios.patch(API_URL+ "price/water/update/"+id, null, 
    {
        params:{
            cost: parseFloat(cost)
        },
        headers: authHeader()
            
    }
    )
    return response
}

const MGMTService={
    getListElectric,
    getListWater,
    updateElectric,
    updateWater,
    listWaterPrice,
    listElectricPrice,
    updateCostElectricity,
    updateCostWater
}

export default MGMTService