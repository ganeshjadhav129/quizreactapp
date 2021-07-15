import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addQuizData } from '../../Actions/QuizDataAction';
import Layout from '../../Components/Layout'
const CreateQuizPage = (props) => {
    const [quizName, setQuizName] = useState('');
    const [numOfQuestion, setNumOfQuestion] = useState(1);
    const [questionBody, setQuestionBody] = useState('');
    const [quizDetails, setQuizDetails] = useState();
    const [optionsDetails, setOptionsDetails] = useState([]);
    const [questionType, setQuestionType] = useState(-1);
    const [answerOfFib, setAnswerOfFib] = useState('');
    const [points, setPoints] = useState(1);
    const dispatch = useDispatch();
    const temp = {
        quizName: "",
        questions: [],
        quizScore: 0
    }
    useEffect(() => {
        if (!quizDetails) setQuizDetails(temp);
        if (optionsDetails.length == 0) setOptionsDetails([...optionsDetails, ""])
    })
    const addOption = () => {
        var check = false;
        optionsDetails.map((item) => {
            if (item === "") {
                console.log("sjskslskjl")
                check = true;
            }
        })
        if (!check) setOptionsDetails([...optionsDetails, ""])
        console.log('next', optionsDetails);
    }
    const handleNext = () => {
        var sel;
        var error = false;
        var question;
        if (questionType == 1) {
            if (document.querySelector("input[name=optionNameSingle]:checked"))
                sel = document.querySelector("input[name=optionNameSingle]:checked").value;
            else error = true;
            optionsDetails.map((item) => {
                if (item === "") {
                    error = true;
                }
            })
            if (quizName == "" || questionBody == "" || points == "") error = true;
            if (error) {
                console.log("there is some fields missing ")
                return false;
            }
            const ind = optionsDetails.indexOf(sel);
            var ans = [];
            ans.push(ind);
            console.log(sel, ind);
            question = {
                questionType: questionType,
                questionBody: questionBody,
                options: [...optionsDetails],
                answer: ans,
                points: points
            }
        } else if (questionType == 2) {
            optionsDetails.map((item) => {
                if (item === "") {
                    error = true;
                }
            })
            if (quizName == "" || questionBody == "" || points == "") error = true;
            if (error) {
                console.log("there is some fields missing ")
                return false;
            }
            var ind = [];
            console.log(sel, ind);

            for (var i = 0; i < document.querySelectorAll("input[name=optionNameMulti]:checked").length; i++) {
                ind.push(optionsDetails.indexOf(document.querySelectorAll("input[name=optionNameMulti]:checked")[i].value));
            }
            console.log("-->>>", ind);
            question = {
                questionType: questionType,
                questionBody: questionBody,
                options: [...optionsDetails],
                answer: ind,
                points: points
            }
        } else {
            if (quizName == "" || questionBody == "" || answerOfFib == "" || points == "") error = true;
            if (error) {
                console.log("there is some fields missing ")
                return false;
            }
            question = {
                questionType: questionType,
                questionBody: questionBody,
                answer: [answerOfFib],
                points: points
            }
        }
        console.log(question);
        var newQ = { ...quizDetails };
        console.log(newQ);
        console.log(quizName);
        var quizNameSlaged = quizName.replaceAll(' ', '-');
        newQ.quizName = quizNameSlaged;
        newQ.questions.push(question);
        console.log(newQ);
        setQuizDetails(newQ);
        setAnswerOfFib('');
        console.log(quizDetails);
        setOptionsDetails([]);
        setQuestionBody('');
        setNumOfQuestion(numOfQuestion + 1);
    }
    const handleSubmit = () => {
        console.log("seeeee");
        console.log(quizDetails);
        dispatch(addQuizData(quizDetails));
        setQuizDetails(temp);
        props.history.push('/home');
    }
    const handleQuestionType = () => {
        console.log("xx");
        var sel = null;
        if (document.querySelector("input[name=typeOfQuestion]:checked"))
            sel = document.querySelector("input[name=typeOfQuestion]:checked").value;
        if (sel === "singleAns") {
            setAnswerOfFib('');
            setQuestionBody('');
            setOptionsDetails([]);
            setQuestionType(1);
        }
        else if (sel === "multiAns") {
            setAnswerOfFib('');
            setQuestionType(2);
            setQuestionBody('');
            setOptionsDetails([]);
        }
        else if (sel === "fillInTheBlanks") {
            setAnswerOfFib('');
            setQuestionType(3);
            setQuestionBody('');
            setOptionsDetails([]);
        }
    }
    return (
        <Layout>
            <br />
            <br />
            <br />
            {
                console.log("tye", questionType)
            }
            <div className="container">
                <div className="jumbotron">

                    <div className="form-group">
                        <label>QuizName</label>
                        <input required type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} className="form-control" placeholder="Enter Quiz Name" />
                    </div>
                    <br />
                    <Row>
                        <Col md={6}>
                            <label>Select The Type Of Question : </label>
                        </Col>
                        <Col md={6}>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span>Enter Points :</span>
                                    </div>
                                </div>
                                <input value={points} onChange={(e) => setPoints(e.target.value)} type="number" class="form-control" />
                            </div>
                        </Col>
                    </Row>

                    <div style={{ marginTop: "10px" }}>
                        <Row style={{ textAlign: "left" }}>
                            <Col md={4}>  <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input type="radio" name="typeOfQuestion" value="singleAns" onChange={handleQuestionType} />
                                    </div>
                                </div>
                                <input disabled style={{ backgroundColor: "white" }} value="Single Answer Question" type="text" class="form-control" />
                            </div></Col>
                            <Col md={4}>  <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input type="radio" name="typeOfQuestion" value="multiAns" onChange={handleQuestionType} />
                                    </div>
                                </div>
                                <input disabled style={{ backgroundColor: "white" }} value="Multi Answer Question" type="text" class="form-control" />
                            </div></Col>
                            <Col md={4}> <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <input type="radio" name="typeOfQuestion" value="fillInTheBlanks" onChange={handleQuestionType} />
                                    </div>
                                </div>
                                <input disabled style={{ backgroundColor: "white" }} value="Fill In The Blanks" type="text" class="form-control" />
                            </div></Col>
                        </Row>
                    </div>
                    <br />
                    {
                        questionType == 1 && (<div>
                            <div className="form-group">
                                <label>Question Number : {numOfQuestion}</label>
                                <input required type="text" value={questionBody} onChange={(e) => setQuestionBody(e.target.value)} className="form-control" placeholder="Enter Question" />
                            </div>
                            <div>Options
                                {
                                    optionsDetails.length > 0 &&
                                    optionsDetails.map((item, index) => {
                                        return <div style={{ marginTop: "4px" }} className="input-group">
                                            <div className="input-group-text">
                                                <input name="optionNameSingle" className="form-check-input mt-0" type="radio" value={item} />
                                            </div>
                                            <input type="text" value={item} onChange={(e) => {
                                                var newArr = [...optionsDetails];
                                                newArr[index] = e.target.value
                                                setOptionsDetails(newArr)
                                            }} className="form-control" />
                                        </div>
                                    })
                                }
                            </div>
                            <button style={{ marginRight: "7px", marginTop: "10px" }} onClick={addOption} className="btn-sm btn-dark">
                                Add New Option
                            </button><br /><br />

                        </div>)
                    }
                    {
                        questionType == 2 && (<div>

                            <div className="form-group">
                                <label>Question Number : {numOfQuestion}</label>
                                <input required type="text" value={questionBody} onChange={(e) => setQuestionBody(e.target.value)} className="form-control" placeholder="Enter Question" />
                            </div>
                            <div>Options
                                {
                                    optionsDetails.length > 0 &&
                                    optionsDetails.map((item, index) => {
                                        return <div style={{ marginTop: "4px" }} className="input-group">
                                            <div className="input-group-text">
                                                <input name="optionNameMulti" className="form-check-input mt-0" type="checkbox" value={item} />
                                            </div>
                                            <input type="text" value={item} onChange={(e) => {
                                                var newArr = [...optionsDetails];
                                                newArr[index] = e.target.value
                                                setOptionsDetails(newArr)
                                            }} className="form-control" />
                                        </div>
                                    })
                                }
                            </div>
                            <button style={{ marginRight: "7px", marginTop: "10px" }} onClick={addOption} className="btn-sm btn-dark">
                                Add New Option
                            </button><br /><br />
                        </div>)
                    }
                    {
                        questionType == 3 && (<div>
                            <div className="form-group">
                                <label>Question Number : {numOfQuestion}</label>
                                <input required type="text" value={questionBody} onChange={(e) => setQuestionBody(e.target.value)} className="form-control" placeholder="Enter Question" />
                            </div>
                            <div className="form-group">
                                <label>Give Answer : (Write Answer with Filling the Blanks)</label>
                                <input required type="text" value={answerOfFib} onChange={(e) => setAnswerOfFib(e.target.value)} className="form-control" placeholder="Enter Answer" />
                            </div>
                        </div>)
                    }
                    <div style={{ marginTop: "10px" }}>
                        <button style={{ marginRight: "5px" }} className="btn btn-primary" onClick={handleNext} >Add This Question </button>
                        {
                            numOfQuestion > 5 && <button onClick={handleSubmit} className="btn btn-danger">Submit Quiz </button>
                        }
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CreateQuizPage
