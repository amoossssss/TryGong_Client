import React, {Component} from 'react';
import {
    Button,
    Grid,
    Row,
    Col,
    Jumbotron,
    FormGroup,
    Form,
    FormControl,
    Glyphicon,
    ControlLabel
} from 'react-bootstrap'

let name;
let schoolNum;
let address;
let password;
let balance;

class Transfer extends Component {

    constructor(props, context) {
        super(props, context);

        this.schoolNumChange = this.schoolNumChange.bind(this);
        this.moneyChange = this.moneyChange.bind(this);
        this.transfer = this.transfer.bind(this);

        this.state = {
            balance: 0,
            toSchoolNum: '',
            money: 0,
        };
    }

    componentWillMount() {
        const self = this;

        let retrievedObject = JSON.parse(localStorage.getItem('cookie'));
        name = retrievedObject.name;
        schoolNum = retrievedObject.schoolNum;
        address = retrievedObject.address;
        password = retrievedObject.password;

        fetch('http://192.168.43.215:5000/users/getTGC', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: retrievedObject.address,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            balance = json.TGCvalue;
            self.setState({balance: balance});
        });
    }

    schoolNumChange(e) {
        this.setState({toSchoolNum: e.target.value});
    }

    moneyChange(e) {
        this.setState({money: e.target.value});
    }

    transfer(event) {
        event.preventDefault();

        let Money = this.state.money;
        let Address = address;
        let Password = password;
        let SchoolNum = this.state.toSchoolNum;

        fetch('http://192.168.43.215:5000/users/sendToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                money: Money,
                toschoolNum: SchoolNum,
                address: Address,
                password: Password,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
        })
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row style={{marginTop: "270px"}}>
                        <Col xs={5} md={5}>
                            <Jumbotron>
                                <h1>
                                    {name}
                                </h1>
                                <h2>
                                    {schoolNum}
                                </h2>
                                <h2 style={{marginTop: '30px'}}>
                                    <Glyphicon glyph="piggy-bank" style={{marginRight: '0px'}}/>：
                                    {this.state.balance} TGC
                                </h2>
                            </Jumbotron>
                        </Col>

                        <Col xs={2} md={2}>
                            <Glyphicon style={{fontSize: "80px", marginTop: "100px"}} glyph="forward"/>
                        </Col>

                        <Col xs={5} md={5}>
                            <Jumbotron>
                                <Form>
                                    <FormGroup >
                                        <ControlLabel>學號</ControlLabel>
                                        <FormControl type="text"
                                                     id="schoolNum"
                                                     name="schoolNum"
                                                     onChange={this.schoolNumChange}
                                                     placeholder="請輸入學號"/>
                                    </FormGroup>

                                    <FormGroup >
                                        <ControlLabel>金額</ControlLabel>
                                        <FormControl type="number"
                                                     id="money"
                                                     name="money"
                                                     onChange={this.moneyChange}
                                                     placeholder="請輸入金額"/>
                                    </FormGroup>

                                    <Button onClick={this.transfer}
                                            style={{backgroundColor: "#222222", color: "white", marginTop:"35px"}}>送出</Button>
                                </Form>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Transfer;
