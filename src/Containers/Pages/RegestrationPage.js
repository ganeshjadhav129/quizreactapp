import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { signUp } from '../../Actions/RegesterAction';


/**
* @author
* @function RegestrationPage
**/

const RegestrationPage = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        // setIsError(true);
    }, []);
    const showError = (errorMsg) => {
        setErrorMessage(errorMsg);
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 1500);
    }
    const checkEmpty = () => {
        if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
            return true;
        }
        return false;
    }
    const checkEmail = () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }
    const handleLogin = (e) => {
        e.preventDefault();
        if (checkEmpty()) {
            showError('Please Fill All the data.!!');
            return false;
        } else {
            if (!checkEmail()) {
                showError('Please Enter a valid Email.!!');
                return false;
            } else {
                if (password !== confirmPassword) {
                    showError('Make Sure Both passwords should be same.!!');
                    return false;
                } else {
                    // browserHistory.push('/login');
                    //window.history.pushState({}, null, "/login");
                    dispatch(signUp({ email, firstName, lastName, password }));
                    props.history.push('/login');
                    return true;
                }
            }
        }
    }
    return (
        <>
            <div className="container">
                {
                    isError && (<div style={{ width: "50%", margin: "30px auto", marginTop: "30px" }} id="error" className="alert alert-danger"
                        role="alert">
                        {errorMessage}
                    </div>)
                }
                <div style={{ width: "50%", margin: "50px auto" }} className="jumbotron">
                    <div style={{ textAlign: "center", color: "blue", marginTop: "-10px" }}>
                        <h2>Regestration Form</h2>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input required type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input required type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input required type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Id" />
                            <small className="form-text text-muted">We'll never share your email with anyone
                                else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input required type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input required type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password" />
                        </div>
                        <button style={{ marginRight: "10px" }} className="btn btn-primary" onClick={(e) => handleLogin(e)} >Regester</button>
                        <button className="btn btn-danger">
                            <Link style={{ textDecoration: "none", color: "white", marginRight: "10px" }} to="/login">Already Regester ?</Link>
                        </button>
                    </form>
                </div>

            </div>
        </>
    )

}

export default RegestrationPage