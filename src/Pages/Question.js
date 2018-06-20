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
import DatePicker from 'react-date-picker';
import '../PageStyle/Question.css'

let name;
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
        this.dateChange = this.dateChange.bind(this);

        this.state = {
            showAddQuestion: false,
            showQuestion: false,
            question: '',
            desc: '',
            date: '',
        };
    }

    componentWillMount() {
        let retrievedObject = JSON.parse(localStorage.getItem('cookie'));
        name = retrievedObject.name;
    }


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

    dateChange(date) {
        this.setState({date: date});
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={3} md={3} className="Left-panel">
                            <Jumbotron className="Left">
                                <h1>
                                    {name}
                                </h1>
                                <h3>
                                    <Glyphicon glyph="piggy-bank"/>：200TGC
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
                                style={{backgroundColor: "#222222", color: "white"}}
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
                                            <FormControl componentClass="select" placeholder="select">
                                                <option value="school">校園</option>
                                                <option value="sport">運動</option>
                                                <option value="test">考題</option>
                                                <option value="life">生活</option>
                                                <option value="news">時事</option>
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel style={{marginTop: "20px"}}>截止日期</ControlLabel>
                                            <div>
                                                <DatePicker
                                                    onChange={this.dateChange}
                                                    value={this.state.date}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{backgroundColor: "#222222", color: "white"}}>提交</Button>
                        <Button onClick={this.handleAddQuestionClose}>取消</Button>
                    </Modal.Footer>
                </Modal>

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