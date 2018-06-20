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
            schoolNum: '',
            password: '',
        };
    }

    accountChange(e) {
        this.setState({schoolNum: e.target.value});
    }

    passwordChange(e) {
        this.setState({password: e.target.value});
    }

    loginTryGong(event) {
        event.preventDefault();

        let SchoolNum = this.state.schoolNum;
        let Password = this.state.password;

        fetch('http://192.168.43.215:5000/users/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schoolNum: SchoolNum,
                password: Password,
            })
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            if (json.logined) {
                localStorage.setItem('cookie', JSON.stringify(json));
                window.location.replace('/question');
            }
            else {
                alert("請重新確認帳號密碼是否正確！");
            }
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