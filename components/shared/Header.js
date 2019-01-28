
import Link from 'next/link';
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import auth0 from '../../services/auth0';

const BsNavLink = (props) => {

	const { route, title } = props;
	return (
		<Link href={route}>
			<a className='nav-link port-navbar-link'> {title} </a>
	 	</Link>
	)
}

const Login = () => {
  return (
    <span onClick={auth0.login} className='nav-link port-navbar-link clickable'> Log in </span>
  )
}

const Logout = () => {
  return (
    <span onClick={auth0.logout} className='nav-link port-navbar-link clickable'> Log out </span>
  )
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        <Navbar className='port-navbar port-default absolute' color="transparent" light expand="md">
          <NavbarBrand className='port-navbar-brand' href="/">Jason He</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className='port-navbar-item'>
								<BsNavLink route='/' title='Home' />
              </NavItem>

              <NavItem className='port-navbar-item'>
								<BsNavLink route='/about' title='About' />
              </NavItem>

              <NavItem className='port-navbar-item'>
								<BsNavLink route='/portfolios' title='Portfolio' />
              </NavItem>

              <NavItem className='port-navbar-item'>
								<BsNavLink route='/blogs' title='Blog' />
              </NavItem>

              <NavItem className='port-navbar-item'>
								<BsNavLink route='/cv' title='CV' />
              </NavItem>

              <NavItem className='port-navbar-item'>
                <Link href='https://github.com/Jsonghh/'>
			            <a className='nav-link port-navbar-link'> GitHub </a>
	 	            </Link>
                
              </NavItem>

              { !isAuthenticated &&
                <NavItem className='port-navbar-item'>
								  <Login />
                </NavItem>
              }
              
              { isAuthenticated &&
                <NavItem className='port-navbar-item'>
								  <Logout />
                </NavItem>
              }
              

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}