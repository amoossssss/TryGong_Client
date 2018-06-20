import React, {Component} from 'react';
import {
    Button,
    Grid,
    Row,
    Col,
    Jumbotron,
    Glyphicon,
    Checkbox,
    FormGroup,
    Modal,
    Form,
    FormControl,
    ControlLabel,
    Pager
} from 'react-bootstrap'
import InputMoment from 'input-moment';
import moment from 'moment';
import '../PageStyle/Question.css'
import '../../node_modules/input-moment/dist/input-moment.css'

// User
let name;
let schoolNum;
let address;
let balance;
let password;

//Question
let q1;
let q1Name;
let q1Time;
let q1Id;
let q2;
let q2Name;
let q2Time;
let q2Id;
let q3;
let q3Name;
let q3Time;
let q3Id;
let q4;
let q4Name;
let q4Time;
let q4Id;
let questionNum;

class Question extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleAddQuestionShow = this.handleAddQuestionShow.bind(this);
        this.handleAddQuestionClose = this.handleAddQuestionClose.bind(this);
        // this.handleQuestion1Show = this.handleQuestion1Show.bind(this);
        // this.handleQuestion2Show = this.handleQuestion2Show.bind(this);
        // this.handleQuestion3Show = this.handleQuestion3Show.bind(this);
        // this.handleQuestion4Show = this.handleQuestion4Show.bind(this);
        this.handleQuestionClose = this.handleQuestionClose.bind(this);
        this.detailQ1 = this.detailQ1.bind(this);
        this.detailQ2 = this.detailQ2.bind(this);
        this.detailQ3 = this.detailQ3.bind(this);
        this.detailQ4 = this.detailQ4.bind(this);
        this.questionChange = this.questionChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.rewardChange = this.rewardChange.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);

        this.state = {
            showAddQuestion: false,
            showQuestion: false,
            // showQuestion2: false,
            // showQuestion3: false,
            // showQuestion4: false,
            question: '',
            desc: '',
            tag: 'school',
            due: moment(),
            reward: 0,
            balance: 0,
            q1Name: '',
            q2Name: '',
            q3Name: '',
            q4Name: '',
            q1Id: '',
            q2Id: '',
            q3Id: '',
            q4Id: '',
        };
    }

    componentWillMount() {
        const self = this;

        let retrievedObject = JSON.parse(localStorage.getItem('cookie'));
        name = retrievedObject.name;
        schoolNum = retrievedObject.schoolNum;
        address = retrievedObject.address;
        password = retrievedObject.password;

        fetch('http://192.168.43.215:5000/users/getETH', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: retrievedObject.address,
            })
        }).then(function (response) {
            return response.json(); //<- response 處理成 json 格式,  記得 return!
        }).then(function (json) {
            console.log(json);
        });

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

        fetch('http://192.168.43.215:5000/users/getQuestionCount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            // console.log(json);
            questionNum = json.getQuestionCount;
            console.log(questionNum);
        });

        fetch('http://192.168.43.215:5000/users/getQuestionFour', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: 1,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {

            q1 = json[0];
            q2 = json[1];
            q3 = json[2];
            q4 = json[3];
            q1Name = q1.questionName;
            q2Name = q2.questionName;
            q3Name = q3.questionName;
            q4Name = q4.questionName;

            q1Time = q1.time;
            q2Time = q2.time;
            q3Time = q3.time;
            q4Time = q4.time;

            let t1 = new Date(Number(q1Time*1000+28800000));
            let t2 = new Date(Number(q2Time*1000+28800000));
            let t3 = new Date(Number(q3Time*1000+28800000));
            let t4 = new Date(Number(q4Time*1000+28800000));

            q1Time = JSON.stringify(t1);
            q2Time = JSON.stringify(t2);
            q3Time = JSON.stringify(t3);
            q4Time = JSON.stringify(t4);

            q1Id = q1.id;
            q2Id = q2.id;
            q3Id = q3.id;
            q4Id = q4.id;

            self.setState({q1Name: q1Name});
            self.setState({q2Name: q2Name});
            self.setState({q3Name: q3Name});
            self.setState({q4Name: q4Name});

            self.setState({q1Id: q1Id});
            self.setState({q2Id: q2Id});
            self.setState({q3Id: q3Id});
            self.setState({q4Id: q4Id});
        });

    }

    handleChange = due => {
        this.setState({due});
    };

    handleSave = () => {
        console.log('saved', this.state.due.format('llll'));
        console.log('timestamp', new Date(this.state.due).getTime());
    };


    handleAddQuestionClose() {
        this.setState({showAddQuestion: false});
    }

    handleAddQuestionShow() {
        this.setState({showAddQuestion: true});
    }

    handleQuestionClose() {
        this.setState({showQuestion: false});
    }

    handleQuestion1Show() {
        this.setState({showQuestion1: true});
    }

    handleQuestion2Show() {
        this.setState({showQuestion2: true});
    }

    handleQuestion3Show() {
        this.setState({showQuestion3: true});
    }

    handleQuestion4Show() {
        this.setState({showQuestion4: true});
    }

    questionChange(e) {
        this.setState({question: e.target.value});
    }

    descChange(e) {
        this.setState({desc: e.target.value});
    }

    rewardChange(e) {
        this.setState({reward: e.target.value});
    }

    tagChange(e) {
        this.setState({tag: e.target.value});
        console.log(e.target.value);
    }

    detailQ1() {
        window.location.replace('/detail/' + this.state.q1Id);
    }

    detailQ2() {
        window.location.replace('/detail/' + this.state.q2Id);
    }

    detailQ3() {
        window.location.replace('/detail/' + this.state.q3Id);
    }

    detailQ4() {
        window.location.replace('/detail/' + this.state.q4Id);
    }

    createQuestion(event) {
        event.preventDefault();

        let QuestionName = this.state.question;
        let Text = this.state.desc;
        let Money = this.state.reward;
        let Tag = this.state.tag;
        let Time = new Date(this.state.due).getTime();
        let UserName = name;
        let SchoolNum = schoolNum;
        let Address = address;
        let Password = password;

        // console.log(QuestionName);
        // console.log(Text);
        // console.log(Money);
        // console.log(Tag);
        // console.log(Time);
        // console.log(UserName);
        // console.log(SchoolNum);
        // console.log(Address);

        fetch('http://192.168.43.215:5000/users/newQuestion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionName: QuestionName,
                text: Text,
                money: Money,
                tag: Tag,
                time: Time,
                userName: UserName,
                schoolNum: SchoolNum,
                address: Address,
                password: Password,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            alert(json.message);
            window.location.reload();
        })

    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={3} md={3} className="Left-panel">
                            <Jumbotron className="Left">
                                <h1 style={{fontSize: '46px'}}>
                                    {name}
                                </h1>
                                <h2>
                                    {schoolNum}
                                </h2>
                                <h3 style={{marginTop: '30px'}}>
                                    <Glyphicon glyph="piggy-bank" style={{marginRight: '0px'}}/>：
                                    {this.state.balance} TGC
                                </h3>
                                {/*<h3>*/}
                                    {/*發問：2次*/}
                                {/*</h3>*/}
                                {/*<h3>*/}
                                    {/*回答：5次*/}
                                {/*</h3>*/}
                            </Jumbotron>
                            <Jumbotron className="LeftBottom">
                                <h3 style={{marginTop: "0px", marginBottom: "15px"}}>問題類型</h3>
                                <FormGroup>
                                    <Checkbox inline>全選</Checkbox> <Checkbox inline>校園</Checkbox>
                                </FormGroup>
                                <FormGroup>
                                    <Checkbox inline>運動</Checkbox> <Checkbox inline>考題</Checkbox>
                                </FormGroup>
                                <FormGroup>
                                    <Checkbox inline>生活</Checkbox> <Checkbox inline>時事</Checkbox>
                                </FormGroup>
                            </Jumbotron>
                            <Button
                                bsSize="large"
                                block
                                style={{backgroundColor: "#222222", color: "white", width: '300px'}}
                                onClick={this.handleAddQuestionShow}>
                                我要發問
                            </Button>
                        </Col>

                        <Col xs={8} xsOffset={1} md={8} mdOffset={1}>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>{this.state.q1Name}</h2>
                                <p>{q1Time}</p>
                                <Button onClick={this.detailQ1}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>{this.state.q2Name}</h2>
                                <p>{q2Time}</p>
                                <Button onClick={this.detailQ2}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>{this.state.q3Name}</h2>
                                <p>{q3Time}</p>
                                <Button onClick={this.detailQ3}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>{this.state.q4Name}</h2>
                                <p>{q4Time}</p>
                                <Button onClick={this.detailQ4}>檢視</Button>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} xsOffset={4} md={8} mdOffset={4}>
                            <Pager>
                                <Pager.Item href="#">Previous</Pager.Item>{' '}
                                <Pager.Item href="#">Next</Pager.Item>
                            </Pager>
                        </Col>
                    </Row>
                </Grid>

                {/*新增問題*/}
                <Modal show={this.state.showAddQuestion} onHide={this.handleAddQuestionClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>新增問題</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid fluid>
                            <Row>
                                <Col xs={8} sm={8} md={8}>
                                    <Form name="addFrom" id="addForm">

                                        <FormGroup >
                                            <ControlLabel>問題</ControlLabel>
                                            <FormControl type="text"
                                                         id="question"
                                                         name="question"
                                                         onChange={this.questionChange}
                                                         placeholder="請輸入問題"/>
                                        </FormGroup>

                                        <FormGroup >
                                            <ControlLabel style={{marginTop: "20px"}}>敘述</ControlLabel>
                                            <FormControl type="text"
                                                         id="desc"
                                                         name="desc"
                                                         componentClass="textarea"
                                                         onChange={this.descChange}
                                                         placeholder="請輸入敘述"/>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsSelect">
                                            <ControlLabel style={{marginTop: "20px"}}>類型</ControlLabel>
                                            <FormControl componentClass="select" placeholder="select"
                                                         onChange={this.tagChange}
                                                         value={this.state.tag}>
                                                <option value="school">校園</option>
                                                <option value="sport">運動</option>
                                                <option value="test">考題</option>
                                                <option value="life">生活</option>
                                                <option value="news">時事</option>
                                                <option value="others">其他</option>
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup >
                                            <ControlLabel style={{marginTop: "20px"}}>賞金</ControlLabel>
                                            <FormControl type="number"
                                                         id="reward"
                                                         name="reward"
                                                         onChange={this.rewardChange}
                                                         placeholder="請輸入賞金"/>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel style={{marginTop: "20px"}}>截止日期</ControlLabel>
                                            <div>
                                                <FormControl type="text"
                                                             id="dueTime"
                                                             disabled
                                                             value={this.state.due.format('llll')}
                                                             name="dueTime"
                                                             style={{marginBottom: '10px'}}/>
                                                <InputMoment
                                                    moment={this.state.due}
                                                    onChange={this.handleChange}
                                                    onSave={this.handleSave}
                                                    minStep={1} // default
                                                    hourStep={1} // default
                                                    prevMonthIcon="ion-ios-arrow-left" // default
                                                    nextMonthIcon="ion-ios-arrow-right" // default
                                                />
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.createQuestion}
                                style={{backgroundColor: "#222222", color: "white"}}>提交</Button>
                        <Button onClick={this.handleAddQuestionClose}>取消</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Question;