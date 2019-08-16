import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Spinner } from 'reactstrap';
import './Login.css'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            username: '',
            userrole: '',
            password: '',
            loading: false,
            login: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({"login": '' ,"loading": true})
        fetch('http://localhost:3001/auth', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then(res => res.json())
        .then(items => this.props.app.authenticate(items,res=>this.setState({"login": res.login, "loading": false, userid: res.userid, userrole: res.userrole})))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div id="loginBox">
                <form onSubmit={this.handleSubmit} className="login">
                    <h1 id="loginTitle">用户登录</h1>
                    <label className="loginLabel">用户名</label><br />
                    <input className="loginInput" type="text" onChange={(e) => {this.setState({"username": e.target.value})}} value={this.state.username}/><br />
                    <label className="loginLabel">密码</label><br />
                    <input className="loginInput" type="password" onChange={(e) => {this.setState({"password": e.target.value})}} value={this.state.password} />
                    <button id="loginButton">
                        <span>登录</span>
                    </button>
                </form>
                {this.state.loading?<Spinner color="secondary" />:''}
                {this.state.login==='failure'?<Alert color='danger'>用户名或密码不正确</Alert>:
                    this.state.login==='success'?<Redirect push to={{ pathname: "/user", search: "?name="+this.state.username, state: {user: this.state.username, userid: this.state.userid, userrole: this.state.userrole}}} />:''}
            </div>

        );

    }

}
