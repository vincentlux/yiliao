import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './login/LoginPage';
import ConsolePage from './console/ConsolePage';

function requireAuth(nextState, replace, next) {
    console.log('de')
    /**
    if(this.state.login!=='success') {
        replace({
            pathname: "/",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
    **/
}

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/user" component={ConsolePage} render={requireAuth} />
                    <Route component={LoginPage} />
                </Switch>
            </div>
        </Router>
  );
}

export default App;
