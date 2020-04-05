import React, { Component } from 'react';
import { Table,Modal,ModalBody,ModalFooter,ModalHeader,Button } from 'reactstrap';
import Axios from 'axios';
import { APIURL } from '../support/ApiUrl';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
const MySwal = withReactContent(Swal)

class ManageAdmin extends Component {
    state = {
        products:[],
        isModaladdOpen:false,
        isModaleditopen:false,
        indexedit:0,
        indexdelete:-1,
        categories:[]
    }

    componentDidMount(){
        Axios.get(`${APIURL}/products?_expand=kategori`)
        .then((res)=>{
            Axios.get(`${APIURL}/kategoris`)
            .then((kategoris)=>{
                this.setState({products:res.data,categories:kategoris.data})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    toogleadd=()=>{
        this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    }

    toggleedit=()=>{
        this.setState({isModaleditopen:!this.state.isModaleditopen})
    }

    onSaveaddDataClick=()=>{
        var titleadd=this.refs.titleadd.value
        var imageadd=this.refs.imageadd.value
        var sinopsisadd=this.refs.sinopsisadd.value
        var sutradaraadd=this.refs.sutradaraadd.value
        var genreadd=this.refs.genreadd.value
        var durasiadd=this.refs.durasiadd.value
        var tahunadd=this.refs.tahunadd.value
        var traileredit=this.refs.traileredit.value
        var obj={
            title:titleadd,
            image:imageadd,
            sinopsis:sinopsisadd,
            sutradara:sutradaraadd,
            genre:genreadd,
            durasi:durasiadd,
            tahun:tahunadd,
            trailer:traileredit
        }
        Axios.post(`${APIURL}/products`,obj)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${APIURL}/products`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModaladdOpen:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    deleteconfirm=(index,id)=>{
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.products[index].title} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.delete(`${APIURL}/products/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                      if(result.value){
                          Axios.get(`${APIURL}/products?_expand=kategori`)
                          .then((res1)=>{
                            this.setState({products:res1.data})
                          })
                      }
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }
    onsaveEditClick=()=>{
        var titleedit=this.refs.titleedit.value
        var imageedit=this.refs.imageedit.value
        var sinopsisedit=this.refs.sinopsisedit.value
        var sutradaraedit=this.refs.sutradaraedit.value
        var genreedit=this.refs.genreedit.value
        var durasiedit=this.refs.durasiedit.value
        var tahunedit=this.refs.tahunedit.value
        var traileredit=this.refs.traileredit.value
        var obj={
            title:titleedit,
            image:imageedit,
            sinopsis:sinopsisedit,
            sutradara:sutradaraedit,
            genre:genreedit,
            durasi:durasiedit,
            tahun:tahunedit,
            trailer:traileredit
        }
        var id=this.state.products[this.state.indexedit].id
        console.log(obj,id)
        Axios.put(`${APIURL}/products/${id}`,obj)
        .then((res)=>{
            // console.log(res.data)
            Axios.get(`${APIURL}/products`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModaleditopen:false})
            }).catch((err)=>{
                console.log(err)
            })
        })

    }
    onEditClick=(index)=>{
        this.setState({indexedit:index,isModaleditopen:true})
    }
    renderProducts=()=>{
        const {products} =this.state 
        return products.map((val,index)=>{
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{val.title}</td>
                    <td><img src={val.image} alt={val.title} width='150' height='200px'/></td>
                    <td>{val.sinopsis}</td>
                    <td>{val.sutradara}</td>
                    <td>{val.genre}</td>
                    <td>{val.durasi}</td>
                    <td>{val.tahun}</td>
                    <td>{val.trailer}</td>
                    <td>
                        <button className='mr-3 btn btn-primary' onClick={()=>this.onEditClick(index)} >Edit</button>
                        <button className='mr-3 btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    rendercategprytoadd=()=>{
        return this.state.categories.map((val,index)=>{
            return <option key={index} value={val.id}>{val.nama}</option>
        })
    }
    
    render() {
        const {indexedit,products}=this.state 
        if(this.props.User.role==='admin'){
            return ( 
                <div className='pt-5'>
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.toogleadd}>
                        <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
                        <ModalBody>
                        <input type="text" ref='titleadd' placeholder='Title' className='form-control mt-2 '/>
                            <input type="text" ref='imageadd'  placeholder='Url Image' className='form-control mt-2'/>
                            <input type="text" ref='sinopsisadd'  placeholder='sipnosis' className='form-control mt-2'/>
                            <input type="text" ref='sutradaraadd'  placeholder='sutradara' className='form-control mt-2'/>
                            <input type="text" ref='genreadd'  placeholder='genre' className='form-control mt-2'/>
                            <input type="number" ref='durasiadd'  placeholder='durasi' className='form-control mt-2'/>
                            <input type="number" ref='tahunadd'  placeholder='tahun' className='form-control mt-2'/>
                            <input type="text" ref='traileradd'  placeholder='url trailer' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onSaveaddDataClick}>Save</Button>
                            <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {
                    this.state.products.length?
                    <Modal isOpen={this.state.isModaleditopen} toggle={this.toggleedit}>
                        <ModalHeader toggle={this.toggleedit}>edit data {products[indexedit].name}</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='titleedit' defaultValue={products[indexedit].title} placeholder='Title' className='form-control mt-2 '/>
                            <input type="text" ref='imageedit' defaultValue={products[indexedit].image} placeholder='Url Image' className='form-control mt-2'/>
                            <input type="text" ref='sinopsisedit' defaultValue={products[indexedit].sinopsis} placeholder='sipnosis' className='form-control mt-2'/>
                            <input type="text" ref='sutradaraedit' defaultValue={products[indexedit].sutradara} placeholder='sutradara' className='form-control mt-2'/>
                            <input type="text" ref='genreedit' defaultValue={products[indexedit].genre} placeholder='genre' className='form-control mt-2'/>
                            <input type="number" ref='durasiedit' defaultValue={products[indexedit].durasi} placeholder='durasi' className='form-control mt-2'/>
                            <input type="number" ref='tahunedit' defaultValue={products[indexedit].tahun} placeholder='tahun' className='form-control mt-2'/>
                            <input type="text" ref='traileredit' defaultValue={products[indexedit].trailer} placeholder='url trailer' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onsaveEditClick}>Save</Button>
                            <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    :
                    null
                    }
                    
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Sinopsis</th>
                                <th>Sutradara</th>
                                <th>Genre</th>
                                <th>Durasi</th>
                                <th>Tahun</th>
                                <th>Trailer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderProducts()}
                        </tbody>
                    </Table>
                    <center><button className='btn btn-primary' onClick={this.toogleadd}>Add data</button></center>
                </div>
             );
        }else{
            return <Redirect to='/notfound'/>
        }
    }
}
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}
export default connect(MapstatetoProps)(ManageAdmin);