import React, { useState } from 'react';
import {connect} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const MyHeader = ({set_Token}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const Logout = () => {
    // We are removing token from localStorage + redux Store
    localStorage.removeItem('state');
    set_Token('delete_token');
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Main menu</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/add">Add Card</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText onClick={Logout}>Log Out</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

const setProps = dispatch => {
    return {
      set_Token: (payload) => {
        dispatch({type: "SET_TOKEN", payload });
      },
    }
  };  
  export default connect(null, setProps)(MyHeader);