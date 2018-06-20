import React, {Component} from 'react';
import {Navbar, NavItem, Nav, Image} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login'
import Logout from './Pages/Logout'
import Register from './Pages/Register'
import Question from './Pages/Question'
import Detail from './Pages/Detail'
import Transfer from './Pages/Transfer'
import trygong from './Static/Tg.png'
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <Navbar inverse staticTop collapseOnSelect>

                        <Navbar.Header>
                            <Navbar.Brand>
                                <LinkContainer to="/">
                                    <a><Image src={trygong} style={{height: "100%"}}/></a>
                                </LinkContainer>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>

                        <Navbar.Collapse>

                            <Nav pullRight>

                                {localStorage.getItem("cookie") === null ?
                                    null :
                                    <LinkContainer to="/transfer">
                                        <NavItem eventKey={5}>
                                            交易
                                        </NavItem>
                                    </LinkContainer>
                                }

                                {localStorage.getItem("cookie") === null ?
                                    null :
                                    <LinkContainer to="/question">
                                        <NavItem eventKey={1}>
                                            問題
                                        </NavItem>
                                    </LinkContainer>
                                }

                                {localStorage.getItem("cookie") === null ?
                                    <LinkContainer to="/login">
                                        <NavItem eventKey={2}>
                                            登入
                                        </NavItem>
                                    </LinkContainer>
                                    :
                                    <LinkContainer to="/logout">
                                        <NavItem eventKey={4}>
                                            登出
                                        </NavItem>
                                    </LinkContainer>
                                }

                                {localStorage.getItem("cookie") === null ?
                                    <LinkContainer to="/register">
                                        <NavItem eventKey={3}>
                                            註冊
                                        </NavItem>
                                    </LinkContainer>
                                    :
                                    null
                                }
                            </Nav>

                        </Navbar.Collapse>

                    </Navbar>

                    <Route exact path="/" render={() => <LandingPage/>}/>
                    <Route path="/question" component={Question}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/transfer" component={Transfer}/>


                    <Navbar inverse fixedBottom>
                        <Nav pullRight>
                            <NavItem>
                                政治大學數位金融實務課程 第一組期末專案
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>

            </Router>
        );
    }
}

export default App;
