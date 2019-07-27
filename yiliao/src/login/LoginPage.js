import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Login extends React.Component {
    constructor(props) {
      super(props); 
    }

    render() {
        return (
            <Form className="login">
                <FormGroup>
                    <Label>Username</Label>
                    <Input />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="psssword" />
                </FormGroup>
                <Button className="loginButton">
                    <span>Login</span>
                </Button>
            </Form>
        );
    }

}