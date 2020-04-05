import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import {Redirect} from 'react-router-dom'
import Axios from 'axios'
import {APIURL} from './../support/ApiUrl'
import {BukanHome,IniHome} from './../redux/actions/HeaderAction'
import {Link} from 'react-router-dom'
import ProductItem from "./ProductItem"

class Home extends Component {
    state = {
        photos:[
            './image/totoro.jpg',
            './image/profile3.jpg',
            './image/42622.jpg'
        ],
        products:[],
        searchProducts:[],
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${APIURL}/products?_expand=kategori&_limit=21`)
        .then((res)=>{
            this.setState({products:res.data, searchProducts:res.data})
        }).catch(()=>{
        })
    }

    renderphoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div style={{width:'100%',height:500,display:'flex'}}>
                            <img
                                src={val}
                                alt="First slide"
                                width='100%'
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }


    onSearchClick=()=>{
        let inputtitle=this.title.value
        let inputgenre=this.genre.value

        let hasilFilter=this.state.products.filter((product)=>{
            return (
            product.title.toLowerCase().includes(inputtitle.toLowerCase())&&
            product.genre.toLowerCase().includes(inputgenre.toLowerCase()) 
            )
        })

        this.setState({searchProducts:hasilFilter})
    }

    onResetClick=()=>{
        this.title.value=''
        this.genre.value=''
        this.min.value=''
        this.max.value=''
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products
            }
        })
    }

    renderList=()=>{
        return this.state.searchProducts.map((product)=>{
            return(
                <ProductItem barang={product} key={product.id}/>
            )
            
        })  
    }


    render() {
        return (
            <div>
                <MDBCarousel
                    activeItem={1}
                    length={this.state.photos.length}
                    interval={2000}
                    showIndicators={false}
                    showControls={false}
                >
                    <MDBCarouselInner>
                        {this.renderphoto()}
                    </MDBCarouselInner>
                </MDBCarousel>
        
                <div className="container">
                        <div className="row">
                        {/* div untuk search  */}
                            <div className="col-3">
                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-dark">
                                        <center><h3 className="">Search</h3></center>
                                    </div>
                                    <form className="form-group mb-0 mx-2">
                                        <h5>Title :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.title=input}} 
                                        className="form-control my-3 btn-light" placeholder="movie..." type="text" name="" title=""/>
        
                                        <h5>Genre :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.genre=input}} 
                                        className="form-control my-3 btn-light" placeholder="genre..." type="text" name="" genre=""/>
        
                                    </form>
                                    <div className="d-inline-block align-bottom text-right">
                                        <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
                                    </div>
                                </div>
                            </div>
        
                        {/* div untuk list */}
                            <div className="col-9 row mt-5 p-0" style={{height:"30px"}}>
                                <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">Movies List</div>
                                    {this.renderList()}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{BukanHome,IniHome}) (Home);