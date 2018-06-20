/**
 * Created by amos_mac on 2018/5/8.
 */

import React, {Component} from 'react';
import {FormControl, Button, FormGroup, Grid, Row, Col, ControlLabel, Form, Image} from 'react-bootstrap'
import '../PageStyle/Register.css'
import trygong from '../Static/TryGong.png'

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.eth.getAccounts().then(console.log);

// web3.eth.getBalance("0xB152C7ee10096D254EfDE999a8838eA6Fd52c542").then(console.log);

// let decAccount;
let passwordState = 0;

class Register extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleSchoolNumChange = this.handleSchoolNumChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCheckPasswordChange = this.handleCheckPasswordChange.bind(this);
        this.checkPasswordValidationState = this.checkPasswordValidationState.bind(this);
        this.createAccount = this.createAccount.bind(this);

        this.state = {
            schoolNum: '',
            name: '',
            email: '',
            schoolNumStatus: null,
            nameStatus: null,
            emailStatus: null,
            password: '',
            checkPassword: '',
            // address: '',
            // privateKey: '',
        };
    }

    passwordValidationState() {
        const passwordPattern = /[a-zA-Z0-9]/;
        const length = this.state.password.length;
        if (length > 16) return 'error';
        else if (length > 5 && passwordPattern.test(this.state.password)) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    checkPasswordValidationState() {
        const passwordPattern = /[a-zA-Z0-9]/;
        const length = this.state.checkPassword.length;
        if (length > 16) {
            passwordState = 0;
            return 'error';
        }
        else if (length > 5 && this.state.checkPassword === this.state.password && passwordPattern.test(this.state.checkPassword)) {
            passwordState = 1;
            return 'success';
        }
        else if (length > 0) {
            passwordState = 0;
            return 'error';
        }
        return null;
    }

    handleSchoolNumChange(e) {
        this.setState({schoolNum: e.target.value});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleCheckPasswordChange(e) {
        this.setState({checkPassword: e.target.value});
    }

    createAccount(event) {
        event.preventDefault();
        if (this.state.schoolNum === "" || this.state.name === "" || this.state.email === "" || passwordState === 0) {
            console.log("Wrong Submit!")
            if (this.state.schoolNum === "") {
                this.setState({schoolNumStatus: 'error'});
            } else {
                this.setState({schoolNumStatus: 'success'});
            }
            if (this.state.name === "") {
                this.setState({nameStatus: 'error'});
            } else {
                this.setState({nameStatus: 'success'});
            }
            if (this.state.email === "") {
                this.setState({emailStatus: 'error'});
            } else {
                this.setState({emailStatus: 'success'});
            }
        }
        else {
            this.setState({schoolNumStatus: 'success'});
            this.setState({nameStatus: 'success'});
            this.setState({emailStatus: 'success'});
            // console.log("Create Account!");
            // decAccount = web3.eth.accounts.create();
            // console.log(decAccount);
            // this.setState({address: decAccount.address});
            // this.setState({privateKey: decAccount.privateKey});

            let SchoolNum = this.state.schoolNum;
            let Name = this.state.name;
            let Email = this.state.email;
            let Password = this.state.password;
            // let Address = this.state.address;
            // let PrivateKey = this.state.privateKey;
            // let Address = decAccount.address;
            // let PrivateKey = decAccount.privateKey;

            // console.log(decAccount.address);
            // console.log(decAccount.privateKey);

            // TODO 串接API
            fetch('http://192.168.43.215:5000/users/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    schoolNum: SchoolNum,
                    name: Name,
                    email: Email,
                    password: Password,
                    // address: Address,
                    // privateKey: PrivateKey,
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);
                window.location.replace("/login");
            })
        }
    }

    render() {
        return (
            <div className="Register-box">
                <h2 className="Register-title">加入<Image src={trygong} style={{width: "150px"}}/></h2>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={8} xsOffset={2} sm={8} smOffset={2} md={8} mdOffset={2}>
                            <Form name="registerForm" id="registerForm" onSubmit={this.createAccount}>

                                <FormGroup validationState={this.state.schoolNumStatus}>
                                    <ControlLabel className="Register-input">學號</ControlLabel>
                                    <FormControl type="text"
                                                 id="schoolNum"
                                                 name="schoolNum"
                                                 onChange={this.handleSchoolNumChange}
                                                 placeholder="請輸入學校學號"/>
                                    <FormControl.Feedback className="Register-input"/>
                                </FormGroup>

                                <FormGroup validationState={this.state.nameStatus}>
                                    <ControlLabel className="Register-input">姓名</ControlLabel>
                                    <FormControl type="text"
                                                 id="name"
                                                 name="name"
                                                 onChange={this.handleNameChange}
                                                 placeholder="請輸入真實姓名"/>
                                    <FormControl.Feedback className="Register-input"/>
                                </FormGroup>

                                <FormGroup validationState={this.state.emailStatus}>
                                    <ControlLabel className="Register-input">E-mail</ControlLabel>
                                    <FormControl type="email"
                                                 id="email"
                                                 name="email"
                                                 onChange={this.handleEmailChange}
                                                 placeholder="請輸入學校信箱"/>
                                    <FormControl.Feedback className="Register-input"/>
                                </FormGroup>

                                <FormGroup validationState={this.passwordValidationState()}>
                                    <ControlLabel className="Register-input">設定密碼</ControlLabel>
                                    <FormControl type="password"
                                                 id="password"
                                                 name="password"
                                                 value={this.state.password}
                                                 onChange={this.handlePasswordChange}
                                                 placeholder=""/>
                                    <FormControl.Feedback className="Register-input"/>
                                    <FormControl.Static className="warnings">*密碼長度在
                                        6-16字元內，只能包含數字、英文字</FormControl.Static>
                                </FormGroup>

                                <FormGroup validationState={this.checkPasswordValidationState()}>
                                    <ControlLabel className="Register-input">確認密碼</ControlLabel>
                                    <FormControl type="password"
                                                 id="checkPassword"
                                                 name="checkPassword"
                                                 value={this.state.checkPassword}
                                                 onChange={this.handleCheckPasswordChange}
                                                 placeholder=""/>
                                    <FormControl.Feedback className="Register-input"/>
                                </FormGroup>

                                <FormGroup >
                                    <Button className="Register-button"
                                            bsSize="large"
                                            type="submit">註冊</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default Register;