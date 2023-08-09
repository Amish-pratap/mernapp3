import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [credentials, setcredentials] = useState({ email: '', password: '' })
    let navigate = useNavigate()
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        const json = await response.json()
        console.log(json)
        if (!json.success) {
            alert("enter valid credentials")
        }
        if (json.success) {
            localStorage.setItem('userEmail', credentials.email)

            localStorage.setItem('authToken', json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate('/')
        }
    }

    return (
        <>
            <div className='container '>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name='email' onChange={onChange} value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name='password' value={credentials.password} onChange={onChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/createuser' className='m-3 btn btn-danger'>I am a new user</Link>

                </form>
            </div>
        </>
    )
}
