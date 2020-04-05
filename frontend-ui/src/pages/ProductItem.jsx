import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap';


class ProductItem extends Component{

    state={
        selectedId:"",
        selectedJumlah:0,
    }

    onAddClick=(id)=>{
        let jumlahInput=parseInt(this.jumlah.value) 
            if (this.jumlah.value==""){
                jumlahInput=1
            }
        this.setState({selectedJumlah:jumlahInput})
        axios.get(
            `http://localhost:2000/products`,
            {
                param:{
                    id:id
                }
            }
           
        ).then((res)=>{
            this.setState({selectedId:res.data[id-1].id})
            var jenis=this.state.selectedId
            var jumlah=this.state.selectedJumlah
            var newCart={
                jenis,jumlah
            }
            
            var oldCart=JSON.parse(localStorage.getItem('userCart')) || []
            oldCart.push(newCart)
            localStorage.setItem('userCart', JSON.stringify(oldCart))
            

            
            
        }).catch((err)=>{

        })
    }

    
    render(){
        let {id, title, image, genre} = this.props.barang
        
        return(
            <div className="card col-4 mb-2 shadow-sm p-2"> 
                
                <Link to={`/moviedetail/${id}`}>
                    <div className="text-center" style={{height:"300px"}}>
                        <img className="card-img-top kartu gambar" src={image} style={{width:"250px"}}/>
                    </div>
                    <div className="card-body">
                        <div style={{height:"60px"}}></div>
                        <center><h5 className="card-title text-dark" style={{height:"50px"}} >{title}</h5></center>
                        <center><h6 className="card-title text-primary" style={{height:"10px"}} >{genre}</h6></center>
                    </div>
                </Link >
                    <div className='col-md-12'>
                        <Link to={'/moviedetail/' + id}><Button block variant="danger">Show Detail</Button></Link>
                    </div>
                    {/* <div className="text-right">    
                        <center><h5 className="card-text text-right text-success d-inline" style={{height:"20px"}} >Rp. {harga}</h5></center>
                    </div> */}
            </div>
           
        )
            
    }
}

export default connect(null)(ProductItem)