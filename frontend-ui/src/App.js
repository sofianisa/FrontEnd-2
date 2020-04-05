import React, { Component } from 'react';
import Header from './components/header'
import Home from './pages/home';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/manageadmin';
import MovieDetail from './pages/moviedetail';
import Login from './pages/login';
import Register from "./pages/register";
import Pagenotfound from './pages/pagenotfound'
import UserSetting from './pages/usersetting'
import {connect} from 'react-redux'
import {LoginSuccessAction,countCart} from './redux/actions'
import Profile from './pages/profile'
import Axios from 'axios';
import { APIURL } from './support/ApiUrl';

class App extends Component {
  state = {
	  loading: false
  };

  componentDidMount() {
	var id = localStorage.getItem("dino");
	Axios.get(`${APIURL}/users/${id}`)
	  .then(res => {
		this.props.LoginSuccessAction(res.data);
    this.setState({ loading: true });
      Axios.get(`${APIURL}/orders?userId=${id}`)
      .then(res1=>{
        this.props.countCart(res1.data.length)
        console.log(res1.data.length);
      }).catch(err1 => {
        console.log(err1);
      })
	  })
	  .catch(err => {
		  console.log(err);
	  }).finally(()=>{
      this.setState({loading:false})
    })
  }

  render() {
	if (this.state.loading) {
	  return <div>Loading... Please Wait...</div>;
	}
	return (
    <div>
      <Header />
      <Switch>
        <Route exact path={"/"}> <Home /> </Route>
        <Route exact path={"/home"}> <Home /> </Route>
        <Route exact path={"/manageadmin"}> <ManageAdmin /> </Route>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/moviedetail/:id"} component={MovieDetail} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path='/settings' component={UserSetting} />
        <Route exact path='/pagenotfound' component={Pagenotfound} />

        <Route path='/*' component={Pagenotfound} />
      </Switch>
    </div>
  );
  }
}

const MapStateToProps=(state)=>{
  return{
	AuthLog:state.Auth.login
  }
}

export default connect(MapStateToProps, {LoginSuccessAction,countCart}) (App);
