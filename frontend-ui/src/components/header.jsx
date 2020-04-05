import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import Logo from '../support/img/Logo.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { URL } from '../support/Url';

// import Axios from 'axios'

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    <img src={Logo} alt="" style={{ height: '50px', width: '150px' }}/>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {props.Auth.role!=="admin"?
                            null
                            :
                        <NavItem className='mr-2 pt-2'>
                            <Link to={"/manageadmin/"}>Manage Movies</Link>
                        </NavItem>
                        }
                        {props.Auth.role === 'user' ?
                            ''
                            :
                            null
                        }
                        {props.Auth.role === 'user' ?
                            ''
                            :
                            null
                        }
                        {props.namauser === '' ?
                            <NavItem className='mr-4 '>
                                <Button href="/profile" variant="contained" color="dark">ABOUT US</Button>
                            </NavItem>
                            :
                            null
                        }
                        {props.namauser===''?
                            <NavItem className='mr-4 '>
                                <Button href="/login" variant="contained" color="primary">
                                    Login
                                </Button>
                            </NavItem>
                            :
                            null
                        }
                        {props.namauser === '' ?
                            <NavItem className='mr-2 '>
                                <Button href="/register" variant="contained" color="secondary">Register</Button>
                            </NavItem>
                            :
                            null
                        }
                
                        {props.AuthLog === false?
                            null
                            :
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Halo, {props.namauser}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem >
                                        <Link to='/settings' >User Settings</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem  onClick={()=>onSignOutClick()}>
                                        <Link to='/login' onClick={()=>onSignOutClick()} >Logout</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                        
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

const onSignOutClick=()=>{
    localStorage.clear()
    window.location.reload()
    window.location.assign(`${URL}/`)
}
const mapStateToProps=(state)=>{
    return{
        namauser:state.Auth.username,
        AuthLog:state.Auth.login,
        Auth:state.Auth,
        cart:state.Auth.cart
    }
}

export default connect(mapStateToProps) (Header);