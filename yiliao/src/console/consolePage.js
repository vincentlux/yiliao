import React from 'react';
import { Button } from 'reactstrap';
import Header from './Header.js';
import { Alert, Spinner } from 'reactstrap';

export default class ConsolePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user,
            userid: this.props.location.state.userid,
            isUploading: false,
            uploadSuccess: ''
        };
    }

    isUploading() {
        this.setState({'isUploading': true});
    }

    uploadStatus(items) {
        if(items.upload === 'success') {
            this.setState({'isUploading': false, 'uploadSuccess': 'yes'});
        } else {
            this.setState({'isUploading': false, 'uploadSuccess': 'no'});
        }
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} userid={this.state.userid} console={this}/>
                我们成功了！！！
                {this.state.isUploading?<Spinner color="secondary" />:''}
                {this.state.uploadSuccess==='yes'?<Alert color='primary'>上传成功</Alert>:
                    this.state.uploadSuccess==='no'?<Alert color='danger'>上传失败</Alert>:''}
            </div>
        )
    }
}
