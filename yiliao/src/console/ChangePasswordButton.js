import React from 'react';
import { NavLink, Modal, Alert } from 'reactstrap';

export default class ChangePasswordButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, oldpassword: '', password: '',
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
            this.props.console.isChanging();
            fetch('http://localhost:3001/changePassword', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.props.username,
                    oldpassword: this.state.oldpassword,
                    newpassword: this.state.password,
                })
            })
            .then(res => res.json())
            .then(items => this.props.console.changeStatus(items))
            .catch(err => console.log(err));
        }
        else {
            this.setState({'alert': true});
        }
    }

    render() {
        return(
            <div>
                <label htmlFor={this.props.id}>
                    {this.props.children}
                </label>
                <button id={this.props.id} style={{display: "none"}} onClick={this.toggle}></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <form onSubmit={this.handleSubmit}>
                        <label className="loginLabel">旧密码</label><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"oldpassword": e.target.value})}} value={this.state.oldpassword}/><br />
                        <label className="loginLabel">新密码</label><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"password": e.target.value})}} value={this.state.password} />
                        <label className="loginLabel">再次输入新密码</label><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"passwordTwo": e.target.value})}} value={this.state.passwordTwo} />
                        <button id="loginButton" onClick={this.handleSubmit}>
                        <span>修改</span>
                        </button>
                        {this.state.alert?<Alert color='danger'>两次输入密码不一致</Alert>:''}
                    </form>
                </Modal>
            </div>
        );
    }
}
