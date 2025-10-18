import axios from 'axios'

const baseUrl = 'http://localhost:7000/api';


const get = (url:string) => {
    return axios.get(`${baseUrl}${url}`)
}

const getById = (url:string, id:number) => {
    return axios.get(`${baseUrl}${url}${id}`)
}



export default {get,getById}
