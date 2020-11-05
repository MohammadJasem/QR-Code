import React,{useState} from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    DropdownToggle,
    DropdownItem,
    UncontrolledDropdown,
    DropdownMenu,
    Collapse,
    NavbarToggler
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import './sidebar.style.css';

function Sidebar(props){

    const[isOpen, setNavbar] = useState(false);

    const toggleNavbar = () => {
        setNavbar(!isOpen);
    }

    return(
        <Navbar dark color="primary" className="p-2 justify-content-center shadow-lg">
            <Nav navbar style={{
                height: window.innerHeight
            }} vertical>
                <NavItem>
                    <NavLink id="link-profile" className='link-hover' to={props.space.baseName.concat('/profile')}>
                        <div className="text-center">
                            <img
                                src={props.profilePhoto}
                                alt="John Doe"
                                width="60"
                                height="60"
                                className="rounded-circle"
                            />
                            <div className="m-1" />
                            <strong className="text-white">
                                Hello {localStorage.getItem('username')}
                            </strong>
                        </div>
                        <div className="m-2" />
                    </NavLink>
                </NavItem>
                <div className="m-2" />
                {props.space.links.map((link,index) => {
                    if(link.dropDown){
                        return(
                            <UncontrolledDropdown key={index} nav inNavbar>
                                <DropdownToggle nav caret className='text-center text-white'>
                                        {link.title}
                                </DropdownToggle>
                                <DropdownMenu className="bg-primary text-center border-0">
                                    {link.sublinks.map((sublink, index) =>
                                        <DropdownItem
                                            className="text-white"
                                            key={index}
                                            href={props.space.baseName.concat(`/${link.subdir}/${sublink.endpoint}`)}>
                                            {sublink.title}
                                        </DropdownItem>
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        );
                    }
                    return(
                        <NavItem key={index}>
                            <NavLink
                                className="nav-link p-3"
                                to={props.space.baseName.concat(`/${link.title}`)}>
                                <div className="text-center text-white">
                                    <strong>
                                        {link.title}
                                    </strong>
                                </div>
                            </NavLink>
                        </NavItem>
                    );
                })}
                <NavItem>
                    <NavLink className="nav-link p-3" to="/signout" onClick={() => props.signOut()}>
                        <div className="text-center">
                            <strong className="text-center text-white">
                                Sign Out
                            </strong>
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default Sidebar;
