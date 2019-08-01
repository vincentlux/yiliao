import React from 'react';
import { Button } from 'reactstrap';
import Header from './Header.js';

export default class ConsolePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header username={this.props.location.state.username} />
                我们成功了！！！
            </div>
        )
    }
}
