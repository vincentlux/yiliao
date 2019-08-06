import React from 'react';
import { NavLink } from 'reactstrap';

//import axios from 'axios';

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    onUploadFileChange(e) {
        const file = e.target.files[0];
        console.log(file);
        const filename = file.name;
        const filetype = file.type || filename.substring(filename.lastIndexOf('.'));

        var formData = new FormData();
        formData.append('file', file)
        //formData.append('name', 'temp')
        if (filetype === "application/zip") {
            const options = {
                method: 'POST',
                body: formData,
            };
            fetch('http://localhost:3001/upload', options)
            // .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));


            // axios.post( 'http://localhost:3001/upload',
            //     formData,
            //     {
            //       headers: {
            //         'Content-Type': 'multipart/form-data'
            //       }
            //     },

            // ).then((res)=> console.log(res))
            // .catch(err => console.log(err));

        } else {
            throw new Error("Unknown file type\'" + filetype + "\'");
        }

    }

    render() {
        return (
            <NavLink>
                <form>
                    <input type="file" id={this.props.id} style={{display: "none"}} onChange={this.onUploadFileChange} accept="application/zip" />
                    <label htmlFor={this.props.id}>
                        {this.props.children}
                    </label>
                </form>
            </NavLink>
        );
    }
}
