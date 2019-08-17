import React from 'react';
import { Button } from 'reactstrap';
import { Alert, Spinner } from 'reactstrap';
import Header from './Header.js';
import FileTable from './FileTable.js';

export default class ConsolePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            userid: this.props.location.state.userid,
            userrole: this.props.location.state.userrole,
            isUploading: false,
            isCreating: false,
            isChanging: false,
            uploadSuccess: '',
            fileUpdate: false,
            userCreate: false,
            createSuccess: '',
            changeSuccess: '',
        };
    }

    isUploading() {
        this.setState({'isUploading': true});
    }

    isCreating() {
        this.setState({'isCreating': true});
    }

    isChanging() {
        this.setState({'isChanging': true});
    }


    uploadStatus(items) {
        if(items.upload === 'success') {
            this.setState({'isUploading': false, 'uploadSuccess': 'yes', 'fileUpdate': !this.state.fileUpdate});
        } else if(items.upload === 'duplicate') {
            this.setState({'isUploading': false, 'uploadSuccess': 'duplicate'});
        } else {
            this.setState({'isUploading': false, 'uploadSuccess': 'no'});
        }
    }

    createStatus(items) {
        if(items.create === 'success') {
            this.setState({'isCreating': false, 'createSuccess': 'yes', 'userCreate': !this.state.userCreate});
        } else {
            this.setState({'isCreating': false, 'createSuccess': 'duplicate'});
        }
    }

    changeStatus(items) {
        if(items.change === 'success') {
            this.setState({'isChanging': false, 'changeSuccess': 'yes'});
        } else {
            this.setState({'isChanging': false, 'changeSuccess': 'no'});
        }
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} userid={this.state.userid} userrole={this.state.userrole} console={this}/>
                真牛！
                {this.state.isUploading?<Spinner color="secondary" />:''}
                {this.state.uploadSuccess==='yes'?<Alert color='primary'>上传成功</Alert>:
                    this.state.uploadSuccess==='duplicate'?<Alert color='danger'>同名文件已存在</Alert>:
                    this.state.uploadSuccess==='no'?<Alert color='danger'>上传失败</Alert>:''}
                {this.state.isCreating?<Spinner color="secondary" />:''}
                {this.state.createSuccess==='yes'?<Alert color='primary'>创建成功</Alert>:
                    this.state.createSuccess==='duplicate'?<Alert color='danger'>用户已存在</Alert>:''}
                {this.state.isChanging?<Spinner color="secondary" />:''}
                {this.state.changeSuccess==='yes'?<Alert color='primary'>修改成功</Alert>:
                    this.state.changeSuccess==='no'?<Alert color='danger'>旧密码错误</Alert>:''}
                <FileTable userid={this.state.userid} userrole={this.state.userrole} fileUpdate={this.state.fileUpdate} userCreate={this.state.userCreate} />
            </div>
        );
    }
}
