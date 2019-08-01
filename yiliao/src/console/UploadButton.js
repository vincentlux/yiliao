import React from 'react';
import { NavLink } from 'reactstrap';

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    onUploadFileChange(e) {

    }

    render() {
        return (
            <NavLink>
                <input type="file" id={this.props.id} style={{display: "none"}} onChange={this.onUploadFileChange} accept=".zip" />
                <label htmlFor={this.props.id}>
                    {this.props.children}
                </label>
            </NavLink>
        );
    }
}
