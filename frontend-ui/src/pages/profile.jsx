import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
// import Axios from 'axios'
// import {APIURL} from './../support/ApiUrl'
import founder from '../support/img/founder.jpg'
import founder2 from '../support/img/founder2.jpg'
import founder3 from '../support/img/founder3.jpg'

class Profile extends Component {
    state = {
        
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

    render() {
        return (
            // <div>
            //     <MDBCarousel
            //         activeItem={1}
            //         length={this.state.photos.length}
            //         interval={2000}
            //         showIndicators={false}
            //         showControls={false}
            //     >
            //         <MDBCarouselInner>
            //             {this.renderphoto()}
            //         </MDBCarouselInner>
            //     </MDBCarousel>

                <div className="container">
                        <div className="row">
                        {/* div untuk search  */}
                            <div className="col-3">
                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                <div className="card-title border-dark">
                                        <center><h3 className="d-inline">Founder</h3></center>
                                    </div>
                                    <img src={founder} alt="" style={{ height: '100%', width: '100%' }}/>
                                    <div className="d-inline-block align-bottom text-right">
                                        <div className="btn btn-block btn-sm btn-primary">Hayao Miyazaki</div>
                                    </div>
                                </div>

                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <img src={founder2} alt="" style={{ height: '100%', width: '100%' }}/>
                                    <div className="d-inline-block align-bottom text-right">
                                        <div className="btn btn-block btn-sm btn-primary">Toshio Suzuki</div>
                                    </div>
                                </div>

                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <img src={founder3} alt="" style={{ height: '100%', width: '100%' }}/>
                                    <div className="d-inline-block align-bottom text-right">
                                        <div className="btn btn-block btn-sm btn-primary">Isao Takahata</div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="col-9 row mt-5 p-0" style={{height:"100px"}}>
                                <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">About Studio Ghibli</div>
                                <div className="col-12 mb- shadow-sm p-2">
                                <div><h4>Didirikan pada tahun 1985, Studio Ghibli dipimpin sutradara ternama Hayao Miyazaki (宮崎 駿 Miyazaki Hayao) bersama dengan rekannya yang juga pembimbingnya, Isao Takahata (高畑 勲 Takahata Isao). 
                                </h4></div>
                                </div>

                                <div className="col-12 mb- shadow-sm p-2">
                                <div><h4>
                                    Asal mula Studio Ghibli dapat dibilang berawal pada tahun 1983, dengan film Nausicaä of the Valley of the Wind (風の谷のナウシカ Kaze no tani no Naushika, 1984), 
                                    yang mulanya merupakan manga bersambung yang diterbitkan majalah manga terbitan Tokuma Shoten (徳間書店). 
                                </h4></div>
                                </div>

                                <div className="col-12 mb- shadow-sm p-2">
                                <div><h4>
                                    Tokuma adalah perusahaan induk Studio Ghibli, dan telah memberikan pada Disney hak-hak video untuk delapan filmnya serta hak distribusi dunia untuk Princess Mononoke (もののけ姫 Mononoke Hime, 1997) dan Spirited Away (千と千尋の神隠し Sen to Chihiro no Kamikakushi, 2001). Film terbaru Miyazaki, Howl's Moving Castle, (ハウルの動く城 Hauru no Ugoku Shiro, 2004) sebenarnya merupakan adaptasi sebuah buku karya penulis Britania, Diana Wynne Jones, yang diterbitkan di beberapa negara termasuk Amerika Serikat dan Kanada. Komponis Joe Hisaishi telah menyediakan soundtrack bagi beberapa film Ghibli.
                                </h4></div>
                                </div>

                                <div className="col-12 mb- shadow-sm p-2"></div>
                                <div><h4>
                                    Sebagian besar film Studio Ghibli yang banyak menerima penghargaan adalah film-film yang disutradarai oleh Hayao Miyazaki. Film Ghibli yang bukan merupakan hasil arahan Miyazaki yang paling terkenal dan dipuji adalah. Grave of the Fireflies (火垂るの墓 Hotaru no Haka, 1988), yang disutradarai Isao Takahata, sebuah film sedih yang terfokus pada kehidupan dua anak yatim piatu pada zaman pasca-Perang Dunia II di Jepang.
                                    Film-film hasil garapan Studio Ghibli sangat diminati bukan hanya di dalam negeri saja, tetapi hingga ke mancanegara. Pada tanggal 1 Oktober 2001, didirikanlah Museum Ghibli, yang menjadi salah satu destinasi wisata paling banyak dikunjungi di Jepang.
                                </h4></div>
                                </div>
                   
                        {/* </div> */}
                    </div>
            </div>
            
            )
        }
}
        
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}

export default connect(MapstatetoProps) (Profile);