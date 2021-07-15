import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../Components/Layout'

function ProfilePage() {
    const userData = useSelector(state => state.userData);
    console.log(userData);
    return (
        <Layout>
            <br />
            <br />
            <br />
            <div className="container">
                <div className="jumbotron">
                    <div className="form-group">
                        <label>FirstName</label>
                        <input disabled style={{ backgroundColor: "white" }} type="text" className="form-control" value={userData.firstName} />
                    </div>
                    <div className="form-group">
                        <label>LastName</label>
                        <input disabled style={{ backgroundColor: "white" }} type="text" className="form-control" value={userData.lastName} />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input disabled style={{ backgroundColor: "white" }} type="text" className="form-control" value={userData.email} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProfilePage
