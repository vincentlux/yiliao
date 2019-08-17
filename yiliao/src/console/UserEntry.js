import React from 'react';

export default class UserEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            createOn: this.props.create_on.split('.')[0].replace('T',' '),
            companyName: this.props.company_name,
        }
    }

    render() {
        return(
            <tr>
                <td>{this.state.username}</td>
                <td>{this.state.createOn}</td>
                <td>{this.state.companyName}</td>
            </tr>
        );
    }
}
