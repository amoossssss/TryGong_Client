import React, {Component} from 'react';
import {
    Button,
    Grid,
    Row,
    Col,
    Jumbotron,
    Pagination,
    Glyphicon,
    Checkbox,
    FormGroup,
    Modal,
    Form,
    FormControl,
    ControlLabel,
} from 'react-bootstrap'
import InputMoment from 'input-moment';
import moment from 'moment';
import '../PageStyle/Question.css'
import '../../node_modules/input-moment/dist/input-moment.css'

// User
let name;
let schoolNum;
let balance;

// Pagination
let active = 1;
let items = [];
for (let number = 1; number <= 10; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>{number}</Pagination.Item>
    );
}


class Question extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleAddQuestionShow = this.handleAddQuestionShow.bind(this);
        this.handleAddQuestionClose = this.handleAddQuestionClose.bind(this);
        this.handleQuestionShow = this.handleQuestionShow.bind(this);
        this.handleQuestionClose = this.handleQuestionClose.bind(this);
        this.questionChange = this.questionChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.rewardChange = this.rewardChange.bind(this);
        this.tagChange = this.tagChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);

        this.state = {
            showAddQuestion: false,
            showQuestion: false,
            question: '',
            desc: '',
            tag: 'school',
            due: moment(),
            reward: 0,
            balance: 0,
        };
    }

    componentWillMount() {
        const self = this;

        let retrievedObject = JSON.parse(localStorage.getItem('cookie'));
        name = retrievedObject.name;
        schoolNum = retrievedObject.schoolNum;

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

    handleQuestionShow() {
        this.setState({showQuestion: true});
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

    createQuestion(event) {
        event.preventDefault();

        let QuestionName = this.state.question;
        let Text = this.state.desc;
        let Money = this.state.reward;
        let Tag = this.state.tag;
        let Time = new Date(this.state.due).getTime();
        let UserName = name;
        let SchoolNum = schoolNum;

        // console.log(QuestionName);
        // console.log(Text);
        // console.log(Money);
        // console.log(Tag);
        // console.log(Time);
        // console.log(UserName);
        // console.log(SchoolNum);

        fetch('http://localhost:5000/users/newQuestion', {
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
                                <h3>
                                    發問：2次
                                </h3>
                                <h3>
                                    回答：5次
                                </h3>
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

                        <Col xs={4} xsOffset={1} md={4} mdOffset={1}>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button onClick={this.handleQuestionShow} style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                        </Col>
                        <Col xs={4} xsOffset={0} md={4} mdOffset={0}>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                            <Jumbotron className="QuestionPanel">
                                <h2 style={{marginTop: "0px"}}>題目</h2>
                                <p>截止日期</p>
                                <Button style={{marginRight: "5px"}}>回答</Button>
                                <Button style={{marginRight: "5px"}}>檢視</Button>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} xsOffset={4} md={8} mdOffset={4}>
                            <Pagination bsSize="medium" style={{marginBottom: "50px"}}>{items}</Pagination>
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
                                                         value={this.state.tag} >
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

                {/*回答問題*/}
                <Modal show={this.state.showQuestion} onHide={this.handleQuestionClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>回答問題</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid fluid>
                            <Row>
                                <Col xs={8} sm={8} md={8}>

                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleQuestionClose}>取消</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Question;