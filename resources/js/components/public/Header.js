import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse,
    NavbarBrand
} from 'reactstrap';
import {NavLink} from 'react-router-dom';

export default class Header extends React.Component{

    constructor(props){

        super(props);
        this.state={
            isNavOpen: false
        }
    }

    toggleNav(){
        this.setState((prevState)=>({
            isNavOpen: !prevState.isNavOpen
        }));
    }

    render(){
        return(
            <Navbar dark color='primary' expand="md">
                <div className="container">
                    <NavbarToggler onClick={() => this.toggleNav()} />
                    <NavbarBrand className="mr-auto" href="/">
                        QR Code
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/">
                                    <span className="fa fa-home fa-lg"></span>&nbsp;Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/about">
                                    <span className="fa fa-info fa-lg"></span>&nbsp;About
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contact">
                                    <span className="fa fa-address-card fa-lg"></span>&nbsp;Contact
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}