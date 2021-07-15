import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

/**
* @author
* @function ResultPage
**/

const ResultPage = (props) => {
    const quizData = useSelector(state => state.QuizData);
    var urll = props.location.pathname;
    console.log(urll);
    var load_url = ""
    for (var i = 2; i < urll.length; i++) {
        if (urll[i] == '/') break;
        load_url = load_url + urll[i];
    }
    var score = 0;
    quizData.quizData.map((item) => {
        if (item.quizName === load_url) {
            score = item.quizScore
        }
    })
    return (
        <div>
            <br />
            <br />
            <br />

            <div className="container">
                <div style={{ textAlign: "center" }} className="jumbotron">
                    <h1 style={{ color: "blue" }}>Thank You For Giving Our Quiz.!!</h1>
                    <h3 style={{ color: "blue" }}>Hope You Enjoyed It.</h3>
                    <h4 style={{ color: "red" }}>
                        Your Score is : {score}
                    </h4><br />
                    <button className="btn btn-dark">
                        <Link style={{ textDecoration: "none", color: "white" }} to="/home"> Go to HomePage</Link>
                    </button>
                </div>
            </div>
        </div>
    )

}

export default ResultPage