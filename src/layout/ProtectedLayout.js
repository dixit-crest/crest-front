import React from 'react'
import { Nav, Badge, Navbar, NavbarBrand, NavbarToggler, Collapse, NavbarText, UncontrolledDropdown, NavItem, NavLink, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { useSelector } from 'react-redux'
import { logout } from '../util/functions'

const ProtectedLayout = ({ children }) => {
    const user = useSelector(state => state.auth)
    return (
        <React.Fragment>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    LOGO
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >                       
                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Email {user.confirmEmailToken ? <Badge color='danger'>Not verfied</Badge> : <Badge color='success'>Verified</Badge>}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={logout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>
                        {`Welcome ${user.firstName}`}
                    </NavbarText>
                </Collapse>
            </Navbar>
            {children}
            </React.Fragment>
    )
}

export default ProtectedLayout