import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            login: ''
        }
    }

    testDBConn() {
        fetch('http://localhost:3001/testDBConn')
            .then(res => res.json())
            .then(items => console.log(items))
            .catch(err => console.log(err))
    }
    componentDidMount(){
        this.testDBConn()

        // if item exists, populate the state with proper data
        // if(this.props.item){
            // const { id, first, last, email, phone, location, hobby } = this.props.item
            // this.setState({ id, first, last, email, phone, location, hobby })
        // }

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
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(items => this.props.app.authenticate(items,res=>this.setState({"login": res, "loading": false})))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login">
                    <FormGroup>
                        <Label>用户名</Label>
                        <Input onChange={(e) => {this.setState({"username": e.target.value})}} value={this.state.username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>密码</Label>
                        <Input type="password" onChange={(e) => {this.setState({"password": e.target.value})}} value={this.state.password} />
                    </FormGroup>
                    <Button className="loginButton">
                        <span>登录</span>
                    </Button>
                </Form>
                {this.state.loading?<Spinner color="primary" />:''}
                {this.state.login==='failure'?<Alert color='danger'>用户名或密码不正确</Alert>:
                    this.state.login==='success'?<Redirect to={{ pathname: "/user", search: "?name="+this.state.username, state: {username: this.state.username} }} />:''}
            </div>

        );

    }

}
