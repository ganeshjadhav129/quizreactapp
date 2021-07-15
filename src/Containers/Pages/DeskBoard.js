import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../Components/Layout'
import { Link } from "react-router-dom"

function DeskBoard() {
    const quizdata = useSelector((state) => state.QuizData);
    console.log("quizdata", quizdata.quizData)
    const renderButtons = () => {
        return quizdata.quizData.map((item) => {
            return <div>
                <div style={{ height: "300px", width: "200px", textAlign: "center", border: "solid black 1px" }} className="jumbotron">
                    <b>QuizName : </b><br></br>
                    {
                        item.quizName.replaceAll('-', ' ')
                    }
                    <br></br><br></br>
                    <b>Your Score : </b>
                    {
                        item.quizScore
                    }
                    <br></br>
                    <button style={{ marginTop: "10px", marginBottom: "0px" }} className="btn-sm btn-success" >
                        <Link style={{ textDecoration: "none", color: "white" }} to={`/:${item.quizName}`} >
                            Click To Attend
                        </Link>
                    </button>
                </div>

            </div>
        })
    }
    return (
        <Layout>
            <br />
            <br />
            <br />

            <div style={{ textAlign: "center", display: "grid", gridTemplateColumns: "auto auto auto auto auto", gridGap: "10px", padding: "20px" }}>
                {
                    renderButtons()
                }
            </div>
        </Layout>
    )
}

export default DeskBoard
