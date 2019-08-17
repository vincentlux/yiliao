import React from 'react';
import { NavLink, Modal, Alert } from 'reactstrap';
import './Console.css';

export default class CreateUserButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, companyName: '', username: '', password: '',
            passwordTwo: '', alert: false, message: ''};

        this.toggle = this.toggle.bind(this);
        this.sanityCheck = this.sanityCheck.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    sanityCheck() {
        if(this.state.companyName == '' || this.state.username == '' || this.state.password == '') {
            this.setState({'message': '请输入完整信息'});
            return(false);
        }
        if(this.state.password === this.state.passwordTwo) {
            return(true);
        }
        this.setState({'message': '两次输入密码不一致'});
        return(false);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.sanityCheck() === true) {
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
                <label id="createLabel" htmlFor={this.props.id}>
                    {this.props.children}
                </label>
                <button id={this.props.id} style={{display: "none"}} onClick={this.toggle}></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <form onSubmit={this.handleSubmit}>
                        <input className="loginInput" type="text" onChange={(e) => {this.setState({"companyName": e.target.value})}} value={this.state.companyName} placeholder="公司名称"/><br />
                        <input className="loginInput" type="text" onChange={(e) => {this.setState({"username": e.target.value})}} value={this.state.username} placeholder="用户名"/><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"password": e.target.value})}} value={this.state.password} placeholder="密码"/>
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"passwordTwo": e.target.value})}} value={this.state.passwordTwo} placeholder="再次输入密码"/>
                        <button id="loginButton" onClick={this.handleSubmit}>
                        <span>创建</span>
                        </button>
                        {this.state.alert?<Alert color='danger'>{this.state.message}</Alert>:''}
                    </form>
                </Modal>
            </NavLink>
        );
    }
}
