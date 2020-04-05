import React, { Component } from 'react';
import {APIURL} from '../support/ApiUrl';
import { Button} from 'react-bootstrap';
import Axios from 'axios';
import {Modal,ModalBody, ModalFooter} from 'reactstrap';
import play from '../img/play.png';
import imgdirector from '../img/Download-Clapperboard-PNG-Picture.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


class MovieDetail extends Component {
    state = { 
        detaildatamovie:{},
        modaltrailer:false,
        notloginyet: false,
        kelogin: false,
        keregister:false,
        belitiketok: false
    
     }

    componentDidMount(){
       
        Axios.get(`${APIURL}/products/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({detaildatamovie:res.data});
        }).catch((err)=>{
            console.log(err)
        })
    }

   
    render() { 
        if (this.state.kelogin) {
            return <Redirect to={'/login'} />
        } 
        if (this.state.keregister) {
            return <Redirect to={'/register'} />
        } 
        if (this.state.belitiketok) {
            return <Redirect to={{ pathname: '/cart', state: this.state.detaildatamovie }} />
        }

        return ( 

            
            <div>
            <Modal isOpen={this.state.notloginyet} centered toggle={() => this.setState({ notloginyet: false })}>
                <ModalBody>
                    Silahkan Login atau Register dulu untuk menambahkan ke Watchlist.
                </ModalBody>
                <ModalFooter>
                    <Button className='info' onClick={() => this.setState({ kelogin: true })}>LOGIN</Button>
                    <Button variant="danger" onClick={() => this.setState({ keregister: true })}>REGISTER</Button>


                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modaltrailer} toggle={()=>this.setState({modaltrailer:false})} size='xl' centered>
            <div>
            
            </div>
            <iframe width="100%" height="590px" src={this.state.detaildatamovie.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            </Modal>

                {/* <HeaderHome/> */}
                <div style={{
                    backgroundImage :  `APIURL (` + `${this.state.detaildatamovie.imgHeader}` + `)` ,
                    backgroundSize: 'cover',
            
                      backgroundPosition: 'center center',
                      display: 'block',
                      height: '400px',
                      width: '100%',
                      margin: '0 auto',
                      objectFit: 'cover',
                    marginBottom: '400px'
                }} className='bgheadermoviedetail darken'>
                
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 imgplay'>
                        <center><img onClick={()=>this.setState({modaltrailer:true})} src={play} height='70px'/>
                        </center>

                        </div>
                    </div>

                    <div className='row moviedetail'> 
                        <div className='col-md-4'>
                            <img src={this.state.detaildatamovie.image} height='500px'/>
                            
                        </div>
                        <div className='col-md-8 judltitle' >
                            
                            <h2>{this.state.detaildatamovie.title}</h2>
                            
                            <h4>{this.state.detaildatamovie.genre}</h4>
                            <div>
                                <h3><u>Sinopsis :</u></h3>
                                <p>{this.state.detaildatamovie.sinopsis}</p>
                                <p className="card-title text-primary">{this.state.detaildatamovie.genre}</p>
                                <p><i>{this.state.detaildatamovie.durasi} Minutes</i></p>
                                <p className="card-title text-secondary">Tahun {this.state.detaildatamovie.tahun}</p>
                            </div>

                            <div className=' director'>
                            <img src={imgdirector} height='40px'></img>
                            <h6>{this.state.detaildatamovie.sutradara}</h6>
                                
                            </div>
                            
                            {this.props.roleUser==='user'?
                            ''
                            :
                            null
                            } 
                            {this.props.roleUser==='admin'?
                            null
                            :
                            ''
                            }
                           

                        </div>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
const MapstatetoProps = ({Auth}) => {
    return {
        AuthLog: Auth.login,
        roleUser: Auth.role,
        islogin:Auth.islogin
    }
}
export default connect(MapstatetoProps)(MovieDetail)