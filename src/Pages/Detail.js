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
    Label,
    Glyphicon,
} from 'react-bootstrap'
import '../PageStyle/Detail.css'

let name;
let address;
let password;

let rows = [];

class Detail extends Component {

    constructor(props, context) {
        super(props, context);

        this.answer = this.answer.bind(this);
        this.look = this.look.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.like = this.like.bind(this);

        this.state = {
            questionName: '',
            text: '',
            userName: '',
            tag: '',
            money: '',

            answer: '',

            //answer or look
            nowRender: 0,
        };
    }


    componentWillMount() {
        const self = this;

        let retrievedObject = JSON.parse(localStorage.getItem('cookie'));
        name = retrievedObject.name;
        address = retrievedObject.address;
        password = retrievedObject.password;

        let id = this.props.match.params.id;

        fetch('http://192.168.43.215:5000/users/getQuestion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: id,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            self.setState({questionName: json.questionName});
            self.setState({text: json.text});
            self.setState({userName: json.userName});
            self.setState({tag: json.tag});
            self.setState({money: json.money});
        });

        fetch('http://192.168.43.215:5000/users/getQuestionAnswerAll', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: id,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);

            for (let i = 0; i < json.length; i++) {
                rows.push(
                    <div key={i}>
                        <h3>{i + 1}. {json[i].answerText}
                            <Label style={{marginLeft: "20px"}}><Glyphicon glyph="heart"
                                                                           style={{marginRight: "5px"}}/>{json[i].answerHeart}
                            </Label>
                            <Button style={{float: "right"}} onClick={self.like.bind(this, i) }>
                                Like!
                            </Button>
                        </h3>

                    </div>);
            }
        });
    }

    answer() {
        this.setState({nowRender: 0});
    }

    look() {
        this.setState({nowRender: 1});
    }

    handleAnswerChange(e) {
        this.setState({answer: e.target.value});
    }

    like(id) {
        console.log(id);

        let QuestionId = this.props.match.params.id;
        let Address = address;
        let Password = password;
        let AnswerId = id+1;

        fetch('http://192.168.43.215:5000/users/addHeart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: QuestionId,
                address: Address,
                password: Password,
                answerId: AnswerId,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
        });
    }

    sendAnswer(event) {
        event.preventDefault();

        let Address = address;
        let Password = password;
        let AnswerText = this.state.answer;
        let QuestionId = this.props.match.params.id;

        fetch('http://192.168.43.215:5000/users/addAnswer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: QuestionId,
                address: Address,
                password: Password,
                answerText: AnswerText,
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
        });

        this.setState({nowRender: 1});

    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={5} md={5}>
                            <Jumbotron style={{textAlign: "Left", marginTop: "20px"}}>
                                <h1 style={{fontSize: '46px'}}>
                                    題目：{this.state.questionName}
                                </h1>
                            </Jumbotron>
                            <Jumbotron style={{textAlign: "Left", marginTop: "20px"}}>
                                <h3>
                                    敘述：{this.state.text}
                                </h3>
                                <h3>
                                    總獎勵：{this.state.money} TGC
                                </h3>
                                <h3>
                                    分類：{this.state.tag}
                                </h3>
                                <h3>
                                    發問者：{this.state.userName}
                                </h3>
                            </Jumbotron>
                            <Jumbotron>
                                <Button bsSize="large"
                                        block
                                        onClick={this.answer}
                                        style={{
                                            backgroundColor: "#222222",
                                            color: "white",
                                            width: '340px'
                                        }}>回答問題</Button>
                                <Button bsSize="large"
                                        block
                                        onClick={this.look}
                                        style={{
                                            backgroundColor: "#222222",
                                            color: "white",
                                            width: '340px',
                                            marginTop: "20px"
                                        }}>檢視答案</Button>
                            </Jumbotron>
                        </Col>

                        <Col xs={6} xsOffset={1} md={6} mdOffset={1}>
                            {this.state.nowRender === 0 ?
                                <Jumbotron style={{textAlign: "Left", marginTop: "20px"}}>
                                    <Form>
                                        <h2>{name}的回答</h2>
                                        <FormGroup style={{marginTop:"20px",marginBottom:"20px"}}>
                                            <FormControl type="text"
                                                         id="answer"
                                                         name="answer"
                                                         componentClass="textarea"
                                                         rows="8"
                                                         onChange={this.handleAnswerChange}
                                                         placeholder="請輸入答案"/>
                                        </FormGroup>
                                        <Button onClick={this.sendAnswer}
                                                style={{backgroundColor: "#222222", color: "white",float:"right"}}>提交</Button>
                                    </Form>
                                </Jumbotron>
                                :
                                <Jumbotron style={{textAlign: "Left", marginTop: "20px"}}>
                                    <h2>關於 {this.state.questionName} 大家的看法</h2>
                                    {rows}
                                </Jumbotron>
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Detail;
