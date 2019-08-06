import React from 'react';
import { NavLink } from 'reactstrap';

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    onUploadFileChange(e) {
        const file = e.target.files[0];
        console.log(file);
        const filename = file.name;
        const filetype = file.type || filename.substring(filename.lastIndexOf('.'));

        if (filetype === "application/zip") {
            const options = {
                method: 'POST',
                file: file,
            };
            fetch('http://localhost:3001/upload', options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));

        } else {
            throw new Error("Unknown file type\'" + filetype + "\'");
        }

    }

    render() {
        return (
            <NavLink>
                <input type="file" id={this.props.id} style={{display: "none"}} onChange={this.onUploadFileChange} accept="application/zip" />
                <label htmlFor={this.props.id}>
                    {this.props.children}
                </label>
            </NavLink>
        );
    }
}
