import React from 'react';
import { NavLink, Modal, Alert } from 'reactstrap';

export default class ChangePasswordButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, oldpassword: '', password: '',
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
        if(this.state.oldpassword == '' || this.state.password == '') {
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
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"oldpassword": e.target.value})}} value={this.state.oldpassword} placeholder="旧密码"/><br />
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"password": e.target.value})}} value={this.state.password} placeholder="新密码"/>
                        <input className="loginInput" type="password" onChange={(e) => {this.setState({"passwordTwo": e.target.value})}} value={this.state.passwordTwo} placeholder="再次输入新密码"/>
                        <button id="loginButton" onClick={this.handleSubmit}>
                        <span>修改</span>
                        </button>
                        {this.state.alert?<Alert color='danger'>{this.state.message}</Alert>:''}
                    </form>
                </Modal>
            </div>
        );
    }
}
