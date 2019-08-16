import React from 'react';
import { NavLink, Modal, Alert } from 'reactstrap';

export default class CreateUserButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, companyName: '', username: '', password: '',
            passwordTwo: '', alert: false}

        this.toggle = this.toggle.bind(this);
        this.samePassword = this.samePassword.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    samePassword() {
        if(this.state.password === this.state.passwordTwo) {
            return(true);
        }
        return(false);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.samePassword() === true) {
            this.setState({'modal': false, 'alert': false});
            this.props.console.isCreating();
            fetch('http://localhost:3001/createUser', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_name: this.state.companyName,
                    username: this.state.username,
                    password: this.state.password,
                })
            })
            .then(res => res.json())
            .then(items => this.props.console.createStatus(items))
            .catch(err => console.log(err));
        }
        else {
            this.setState({'alert': true});
        }
    }

    render() {
        return(
            <NavLink>
                <label htmlFor={this.props.id}>
                    {this.props.children}
                </label>
                <button id={this.props.id} style={{display: "none"}} onClick={this.toggle}></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <form onSubmit={this.handleSubmit}>
                        <label className="loginLabel">公司名称</label><br />
                        <input className="loginInput" type="text" onChange={(e) => {this.setState({"companyName": e.target.value})}} value={this.state.companyName}/><br />
                        <label className="loginLabel">用户名</label><br />
                        <input className="loginInput" type="text" onChange={(e) => {this.setState({"username": e.target.value})}} value={this.state.username}/><br />
                        <label className="loginLabel">密码</label><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"password": e.target.value})}} value={this.state.password} />
                        <label className="loginLabel">再次输入密码</label><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"passwordTwo": e.target.value})}} value={this.state.passwordTwo} />
                        <button id="loginButton" onClick={this.handleSubmit}>
                        <span>创建</span>
                        </button>
                        {this.state.alert?<Alert color='danger'>两次输入密码不一致</Alert>:''}
                    </form>
                </Modal>
            </NavLink>
        );
    }
}
