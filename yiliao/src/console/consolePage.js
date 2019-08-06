import React from 'react';
import { Button } from 'reactstrap';
import Header from './Header.js';

export default class ConsolePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: this.props.location.state.user};
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} />
                我们成功了！！！
            </div>
        )
    }
}
