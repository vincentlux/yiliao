import React from 'react';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import FileEntry from './FileEntry.js';
import UserEntry from './UserEntry.js';

export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userid,
            fileList: [],
            userList: [],
            activeTab: '1',
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getUserList();
        this.getFileList();
    }

    componentDidUpdate(prevProps) {
        if(this.props.fileUpdate !== prevProps.fileUpdate) {
            this.getFileList();
        }
        if(this.props.userCreate !== prevProps.userCreate) {
            this.getUserList();
        }

    }

    getFileList() {
        fetch('http://localhost:3001/getFileList', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.userId,
            })
        })
        .then(res => res.json())
        .then(items => this.generateFileList(items))
        .catch(err => console.log(err))
    }

    generateFileList(items) {
        const fileList = items.map(item => this.generateFileEntry(item));
        this.setState({'fileList': fileList});
    }

    generateFileEntry(item) {
        return(
            <FileEntry key={item.upload_time} data={item} userrole={this.props.userrole} />
        );
    }

    getUserList() {
        fetch('http://localhost:3001/getUserList', {
            method: 'get'
        })
        .then(res => res.json())
        .then(items => this.generateUserList(items))
        .catch(err => console.log(err))
    }

    generateUserList(items) {
        const userList = items.map(item => this.generateUserEntry(item));
        this.setState({'userList': userList});
    }

    generateUserEntry(item) {
        return(
            <UserEntry key={item.username} username={item.username} create_on={item.create_on} company_name={item.company_name} />
        );
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

    render() {
        if(this.props.userrole === 'super') {
        return(
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                            用户
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                            文件
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Table>
                            <thead>
                                <tr>
                                    <th>用户名</th>
                                    <th>创建时间</th>
                                    <th>公司名称</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.userList}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="2">
                        <Table>
                            <thead>
                                <tr>
                                    <th>文件名</th>
                                    <th>上传者</th>
                                    <th>上传时间</th>
                                    <th>处理状态</th>
                                    <th>下载</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.fileList}
                            </tbody>
                        </Table>
                    </TabPane>
                </TabContent>
            </div>);
        }

        return(
            <Table>
                <thead>
                    <tr>
                        <th>文件名</th>
                        <th>上传时间</th>
                        <th>处理状态</th>
                        <th>下载</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.fileList}
                </tbody>
            </Table>
        );
    }
}


