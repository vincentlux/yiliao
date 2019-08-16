import React from 'react';

export default class FileEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: this.props.data.file_location.split('/')[1],
            uploadTime: this.props.data.upload_time.split('.')[0].replace('T',' ')}
    }

    render() {
        return(
            <tr>
                <td>{this.state.fileName}</td>
                {this.props.userrole==='super'?<td>{this.props.data.username}</td>:''}
                <td>{this.state.uploadTime}</td>
                <td>正在处理</td>
                <td>下载按钮</td>
            </tr>
        );
    }
}
