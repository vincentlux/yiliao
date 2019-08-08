import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './login/LoginPage';
import ConsolePage from './console/ConsolePage';
import PrivateRoute from './util/PrivateRoute';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {authed: false};
    }

    authenticate(items,fun) {
        if(items.login==='success') {
            this.setState({"authed": true});
        }
        fun(items);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <PrivateRoute path="/user" component={ConsolePage} authed={this.state.authed} />
                        <Route render={(props) => <LoginPage {...props} app={this} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
