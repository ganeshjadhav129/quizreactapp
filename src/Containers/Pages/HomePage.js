import React from 'react'
import Layout from '../../Components/Layout'
import { Link } from "react-router-dom";
function HomePage() {
    return (
        <Layout>
            <div style={{ textAlign: "center", height: "1000px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url("https://images.pexels.com/photos/374857/pexels-photo-374857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")` }}>
                <div style={{ paddingTop: "250px" }} className="container">
                    <div style={{ background: "transparent" }} className="jumbotron">
                        <h1 style={{ alignText: "center", color: "white", fontFamily: "Comic Sans MS" }} >Looking for Something?</h1>
                        <p style={{ alignText: "center", color: "white", fontFamily: "Comic Sans MS" }}>
                            Test your skills with Free online quizes
                        </p>
                        <button className="btn btn-primary">
                            <Link style={{ textDecoration: "none", color: "white" }} to="/deskboard">Goto Deskboard</Link>
                        </button>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default HomePage
