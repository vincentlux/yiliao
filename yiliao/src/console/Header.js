import React from 'react';
import { Button, Collapse, Navbar, NavbarBrand, Nav, NavLink, NavbarToggler, NavItem, DropdownItem, DropdownMenu, DropdownToggle,UncontrolledDropdown } from 'reactstrap';
import UploadButton from './UploadButton.js';
import CreateUserButton from './CreateUserButton.js';
import ChangePasswordButton from './ChangePasswordButton.js';
import './Console.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: this.props.user, userid: this.props.userid, userrole: this.props.userrole};
    }

    render() {
        console.log(this.state.userrole);
        return (
      <div>
        <Navbar light style={{backgroundColor: '#71c7ec'}} expand="md">
          <NavbarBrand>XXX 公司</NavbarBrand>
            <Nav className="ml-auto" navbar>
              { this.state.userrole === 'super'?
                <NavItem>
                    <CreateUserButton id="create" userid={this.state.userid} console={this.props.console}>新建用户</CreateUserButton>
                </NavItem>
                :
                  <NavItem>
                    <UploadButton id="upload" userid={this.state.userid} console={this.props.console}>上传文件</UploadButton>
                  </NavItem>
              }
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.state.user}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <ChangePasswordButton id="change" username={this.state.user} console={this.props.console}>修改密码</ChangePasswordButton>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
        </Navbar>
      </div>
        );
    }
}
