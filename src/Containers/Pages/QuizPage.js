import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuizScore } from '../../Actions/QuizDataAction';

/**
* @author
* @function QuizPage
**/

const QuizPage = (props) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const quizdata = useSelector((state) => state.QuizData);
    var urll = props.location.pathname;
    var load_url = urll.substr(2, urll.length - 1);
    var quizIndex = 0;
    const data = quizdata.quizData.find((item) => item.quizName === load_url);
    quizdata.quizData && quizdata.quizData.map((item, index) => {
        if (item.quizName === load_url) {
            quizIndex = index;
        }
    })
    const [questionNum, setQuestionNum] = useState(0);
    const dispatch = useDispatch();
    var temp = [];
    for (var i = 0; i < data.questions.length; i++) temp.push([-1]);
    if (!selectedAnswers.length) {
        setSelectedAnswers(temp);
    }
    const removeCheckedValue = () => {
        if (data.questions[questionNum].questionType == 1) {
            if (document.querySelector("input[name=optionName]")) {
                for (var i = 0; i < document.getElementsByName("optionName").length; i++) {
                    document.getElementsByName("optionName")[i].checked = false;
                }
            }
        } else if (data.questions[questionNum].questionType == 2) {
            if (document.querySelectorAll("input[name=optionName]")) {
                for (var i = 0; i < document.getElementsByName("optionName").length; i++) {
                    document.getElementsByName("optionName")[i].checked = false;
                }
            }
        } else {
            if (document.getElementById("xxx")) {
                document.getElementById("xxx").value = '';
            }
        }
    }
    const setCheckValue = () => {
        if (selectedAnswers[questionNum] && selectedAnswers[questionNum][0] === -1) {
            removeCheckedValue();
        }
        else {
            if (data.questions[questionNum].questionType == 1) {
                for (let i = 0; i < document.getElementsByName("optionName").length; i++) {
                    if (i == selectedAnswers[questionNum]) document.getElementsByName("optionName")[i].checked = true;
                    else document.getElementsByName("optionName")[i].checked = false;
                }
            } else if (data.questions[questionNum].questionType == 2) {
                for (let i = 0; i < document.getElementsByName("optionName").length; i++) {
                    var ab = false;
                    for (var j = 0; j < selectedAnswers[questionNum].length; j++) {
                        if (i == selectedAnswers[questionNum][j]) ab = true;
                    }
                    if (ab) {
                        document.getElementsByName("optionName")[i].checked = true;
                    }
                    else document.getElementsByName("optionName")[i].checked = false;
                }
            } else {
                if (document.getElementById("xxx")) {
                    document.getElementById("xxx").value = selectedAnswers[questionNum][0];
                }
            }
        }
    }
    const handleNextQuestion = () => {
        var sel, error = false;
        if (data.questions[questionNum].questionType === 1) {
            if (document.querySelector("input[name=optionName]:checked")) {
                sel = document.querySelector("input[name=optionName]:checked").value;
                var ind = data.questions[questionNum].options.indexOf(sel);
                selectedAnswers[questionNum][0] = ind;
                setSelectedAnswers(selectedAnswers);
                setQuestionNum(questionNum + 1);
            }
            else error = true;
            if (error) {
                return false;
            }
        }
        if (data.questions[questionNum].questionType === 2) {
            if (document.querySelectorAll("input[name=optionName]:checked")) {
                var xx = [];
                for (var i = 0; i < document.querySelectorAll("input[name=optionName]:checked").length; i++) {
                    sel = document.querySelectorAll("input[name=optionName]:checked")[i].value;
                    var ind = data.questions[questionNum].options.indexOf(sel);
                    xx.push(ind);
                }
                selectedAnswers[questionNum] = xx;
                setSelectedAnswers(selectedAnswers);
                setQuestionNum(questionNum + 1);
            }
            else return false;
        } else {
            if (document.getElementById("xxx")) {
                var fillAnswer = document.getElementById("xxx").value;
                if (fillAnswer === "") return false;
                var xx = selectedAnswers;
                xx[questionNum][0] = fillAnswer;
                setSelectedAnswers(xx);
                setQuestionNum(questionNum + 1);
            }
        }
    }
    const handlePrevious = () => {
        setQuestionNum(questionNum - 1);
    }
    const add = () => {
        var sel, error = false;
        if (data.questions[questionNum].questionType === 1) {
            if (document.querySelector("input[name=optionName]:checked")) {
                sel = document.querySelector("input[name=optionName]:checked").value;
                var ind = data.questions[questionNum].options.indexOf(sel);
                selectedAnswers[questionNum][0] = ind;
                setSelectedAnswers(selectedAnswers);
            }
            else error = true;
            if (error) {
                return false;
            }
        }
        if (data.questions[questionNum].questionType === 2) {
            if (document.querySelectorAll("input[name=optionName]:checked")) {
                var xx = [];
                for (var i = 0; i < document.querySelectorAll("input[name=optionName]:checked").length; i++) {
                    sel = document.querySelector("input[name=optionName]:checked").value;
                    var ind = data.questions[questionNum].options.indexOf(sel);
                    xx.push(ind);
                }
                selectedAnswers[questionNum] = xx;
                setSelectedAnswers(selectedAnswers);
            }
            else return false;
        } else {
            if (document.getElementById("xxx")) {
                var fillAnswer = document.getElementById("xxx").value;
                if (fillAnswer === "") return false;
                selectedAnswers[questionNum][0] = fillAnswer;
                setSelectedAnswers(selectedAnswers);
            }
        }
        return true;
    }
    const handleSubmitQuiz = () => {
        if (!add()) return false;
        var score = 0;
        data.questions && data.questions.map((item, index) => {
            var right = true;
            data.questions[index].answer.sort();
            selectedAnswers[index].sort();
            if (data.questions[index].answer.length !== selectedAnswers[index].length) right = false;
            for (var i = 0; i < selectedAnswers[index].length; i++) {
                if (selectedAnswers[index][i] !== data.questions[index].answer[i]) right = false;
            }
            if (right) {
                score += (data.questions[index].points - '0');
            }
        });
        dispatch(addQuizScore({ quizIndex, score }));
        props.history.push(`/:${load_url}/result`);
    }
    return (
        <>
            <br />
            <br />
            <br />
            <div className="container">
                <div className="jumbotron">
                    {
                        <div className="form-group">
                            <h1>{data.quizName}</h1>
                        </div>
                    }
                    <div className="form-group">
                        <label>Question Number {questionNum + 1} </label>
                        {data.questions[questionNum] && (<input value={data.questions[questionNum].questionBody} style={{ backgroundColor: "white" }} type="text" disabled className="form-control" />)}
                    </div>
                    <div style={{ display: (data.questions[questionNum].questionType === 3) ? "none" : "block" }}>
                        <div>Options :</div>
                        {
                            (data.questions[questionNum].options && (data.questions[questionNum].options.map((item, index) => {
                                return <div>
                                    <div style={{ marginTop: "4px" }} className="input-group">
                                        <div className="input-group-text">
                                            <input name="optionName" className="form-check-input mt-0" type={data.questions[questionNum].questionType == 1 ? "radio" : "checkbox"} value={item} />
                                        </div>
                                        <input disabled style={{ backgroundColor: "white" }} type="text" value={item} className="form-control" />
                                    </div>
                                </div>
                            })))}
                    </div>
                    <div style={{ display: (data.questions[questionNum].questionType === 1 || data.questions[questionNum].questionType === 2) ? "none" : "block" }} > {
                        (data.questions[questionNum].questionType === 3) && (
                            <div style={{ marginTop: "4px", }} className="input-group">
                                <div className="input-group-text">
                                    <span>Write answer :</span>
                                </div>
                                <input id="xxx" type="text" className="form-control" />
                            </div>
                        )}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        {
                            questionNum > 0 && (<button style={{ marginRight: "7px" }} onClick={handlePrevious} className="btn btn-primary">
                                Previos Question
                            </button>)
                        }
                        {
                            questionNum < data.questions.length - 1 && <button style={{ marginRight: "7px" }} onClick={handleNextQuestion} className="btn btn-primary">
                                next Question
                            </button>
                        }
                        <br /><br />
                        {
                            questionNum == data.questions.length - 1 && <button onClick={handleSubmitQuiz} className="btn btn-danger">Submit Quiz</button>
                        }
                    </div>
                </div>
            </div>
            {
                setTimeout(() => {
                    setCheckValue()
                }, 50)
            }
        </ >
    )

}
export default QuizPage