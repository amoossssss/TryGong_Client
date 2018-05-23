/**
 * Created by amos_mac on 2018/3/29.
 */

import React, {Component} from 'react';
import {Grid, Row, Col, Jumbotron, Button, Image, Glyphicon} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import '../PageStyle/LandingPage.css'
import trygong from '../Static/TryGong.png'
import amos from '../Static/Creator/Amos.jpg'
import kappa from '../Static/Creator/kappa.jpg'
import van from '../Static/Creator/Van.jpg'
import william from '../Static/Creator/William.jpg'
import blockchain from '../Static/Icon/blockchain.png'
import question from  '../Static/Icon/businessman-with-doubts.png'
import payment from '../Static/Icon/pay.png'
import vote from '../Static/Icon/review.png'

class Notices extends Component {
    render() {
        return (
            <div>
                <Jumbotron className="White-back">
                    <Image src={trygong}/>
                    <hr className="Top-line"/>
                    <hr className="Bottom-line"/>
                    <h2>去中心化意見交流平台</h2>
                    <Button bsSize="large" style={{border: "2px solid", marginTop: "20px"}}>
                        {/*<LinkContainer to="/login">*/}
                            我想踹共！
                        {/*</LinkContainer>*/}
                    </Button>
                </Jumbotron>
                <Jumbotron>
                    <h2 style={{marginBottom: "50px"}}>什麼是<Image src={trygong} style={{width: "150px"}}/>?</h2>
                    <Grid>
                        <Row>
                            <Col xs={3} md={3}>
                                <Image square src={question} style={{width: "60%"}}/>
                                <h3>解決問題</h3>
                                <p>問題找不到喜歡的答案嗎？來<Image src={trygong} style={{width: "100px"}}/>！</p>
                            </Col>
                            <Col xs={3} md={3}>
                                <Image square src={vote} style={{width: "60%"}}/>
                                <h3>投票機制</h3>
                                <p>群眾意見，清晰明瞭。</p>
                            </Col>
                            <Col xs={3} md={3}>
                                <Image square src={payment} style={{width: "60%"}}/>
                                <h3>知識獎勵</h3>
                                <p>回答問題，獲得虛擬貨幣。</p>
                            </Col>
                            <Col xs={3} md={3}>
                                <Image square src={blockchain} style={{width: "60%"}}/>
                                <h3>區塊鏈</h3>
                                <p>沒有中心化機構控管，公開透明。</p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Jumbotron className="White-back">
                    <h2>使用流程</h2>
                    <Grid>
                        <Row>
                            <Col xs={4} md={4}>
                                <h3 style={{marginBottom: "20px"}}>
                                    <Glyphicon glyph="chevron-right" style={{marginRight: "3px"}}/>我要發問！
                                </h3>
                                <p>1. 於發問區留下問題</p>
                                <p>2. 決定獎勵貨幣數量</p>
                                <p>3. 選擇問題截止日期</p>
                                <p>4. 觀看答案票選投票</p>
                            </Col>
                            <Col xs={4} md={4}>
                                <h3 style={{marginBottom: "20px"}}>
                                    <Glyphicon glyph="chevron-right" style={{marginRight: "3px"}}/>我有答案！
                                </h3>
                                <p>1. 針對問題投票與留言</p>
                                <p>2. 亦可票選欣賞之留言</p>
                                <p>3. 等待截止日期拿獎勵</p>
                                <p></p>
                            </Col>
                            <Col xs={4} md={4}>
                                <h3 style={{marginBottom: "20px"}}>
                                    <Glyphicon glyph="chevron-right" style={{marginRight: "3px"}}/>想看答案！
                                </h3>
                                <p>1. 花費定額貨幣觀看答案</p>
                                <p>2. 票選留言拿回部分貨幣</p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Jumbotron>
                    <h2 style={{marginBottom: "20px"}}>專案成員</h2>
                    <Grid>
                        <Row>
                            <Col xs={3} md={3}>
                                <Image circle src={william} style={{width: "100%"}}/>
                                <h3>張維庭</h3>
                                <p>專案管理／資料庫</p>
                            </Col>
                            <Col xs={3} md={3}>
                                <Image circle src={kappa} style={{width: "100%"}}/>
                                <h3>何冠毅</h3>
                                <p>智能合約</p>
                            </Col>
                            <Col xs={3} md={3}>
                                <Image circle src={amos} style={{width: "100%"}}/>
                                <h3>吳奕融</h3>
                                <p>前端開發</p>
                            </Col>
                            <Col xs={3} md={3}>
                                <Image circle src={van} style={{width: "100%"}}/>
                                <h3>廖宇凡</h3>
                                <p>後端開發</p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>
        );
    }
}

export default Notices;