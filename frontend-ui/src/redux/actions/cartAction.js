// import Axios from 'axios'
// import {APIURL} from '../../support/ApiUrl'

export const TambahCart =(movies)=>{
    return {
        type:'Tambah_Cart',
        payload:movies
    }   
}