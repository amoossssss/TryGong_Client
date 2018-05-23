/**
 * Created by amos_mac on 2018/5/8.
 */

import React, {Component} from 'react';
import {FormControl, Form, Button, FormGroup, Grid, Row, Col, ControlLabel, Image} from 'react-bootstrap'
import '../PageStyle/Login.css'
import trygong from '../Static/TryGong.png'

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.loginTryGong = this.loginTryGong.bind(this);
        this.accountChange = this.accountChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);

        this.state = {
            account: '',
            password: '',
        };
    }

    accountChange(e) {
        this.setState({account: e.target.value});
    }

    passwordChange(e) {
        this.setState({password: e.target.value});
    }

    loginTryGong(event) {
        event.preventDefault();

        let Account = this.state.account;
        let Password = this.state.password;

        // TODO 串接API
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: Account,
                password: Password,
            })
        })
    }

    render() {
        return (
            <div className="Login-box">
                <h2 className="Login-title">登入<Image src={trygong} style={{width: "150px"}}/></h2>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={8} xsOffset={2} sm={8} smOffset={2} md={8} mdOffset={2}>
                            <Form name="loginForm" id="loginForm" onSubmit={this.loginTryGong}>
                                <FormGroup role="form" style={{marginTop: "40px"}}>
                                    <ControlLabel>帳號</ControlLabel>
                                    <FormControl type="text"
                                                 id="account"
                                                 name="account"
                                                 onChange={this.accountChange}
                                                 placeholder="請輸入帳號"/>
                                    <ControlLabel className="Login-password">密碼</ControlLabel>
                                    <FormControl type="password"
                                                 id="password"
                                                 name="password"
                                                 onChange={this.passwordChange}
                                                 placeholder="請輸入帳號"/>
                                    <Button bsSize="large"
                                            className="Login-button"
                                            type="submit">踹共！</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Login;