import React, {Component} from 'react';
import {Navbar, NavItem, Nav, Image} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Question from './Pages/Question'
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
                                <LinkContainer to="/question">
                                    <NavItem eventKey={1}>
                                        問題
                                    </NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem eventKey={2}>
                                        登入
                                    </NavItem>
                                </LinkContainer>

                                <LinkContainer to="/register">
                                    <NavItem eventKey={3}>
                                        註冊
                                    </NavItem>
                                </LinkContainer>
                            </Nav>

                        </Navbar.Collapse>

                    </Navbar>

                    <Route exact path="/" render={() => <LandingPage/>}/>
                    <Route path="/question" component={Question}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>


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
