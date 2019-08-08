import React from 'react';
import { Button, Collapse, Navbar, NavbarBrand, Nav, NavLink, NavbarToggler, NavItem, DropdownItem, DropdownMenu, DropdownToggle,UncontrolledDropdown } from 'reactstrap';
import UploadButton from './UploadButton.js';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: this.props.user, userid: this.props.userid};
    }

    render() {
        return (
      <div>
        <Navbar color="danger" light expand="md">
          <NavbarBrand>DGB 公司/{this.state.user}</NavbarBrand>
          <NavbarToggler />
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <UploadButton id="upload" userid={this.state.userid} console={this.props.console}>上传文件</UploadButton>
                </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  设置
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    个人信息
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    修改密码
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
        </Navbar>
      </div>
        );
    }
}
