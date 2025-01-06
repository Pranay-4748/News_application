import React, { useState } from 'react';
import axios from 'axios';
import "./signin.css";
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault(); 

        console.log(email, password);

        axios.post('http://localhost:3000/signin', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate("/news"); 
                } else {
                    alert("Login failed: Invalid credentials");
                }
            })
            .catch(err => {
                console.log(err);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <>
            <div className="login">

                <form onSubmit={handlesubmit} className="login__form">
                    <h1 className="login__title">Sign in</h1>

                    <div className="login__inputs">
                        <div className="login__box">
                            <input 
                                type="email" 
                                placeholder="Email ID" 
                                required 
                                className="login__input" 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <i className="ri-mail-fill"></i>
                        </div>

                        <div className="login__box">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                required 
                                className="login__input" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <i className="ri-lock-2-fill"></i>
                        </div>
                    </div>

                    <div className="login__check">
                        <div className="login__check-box">
                            <input type="checkbox" className="login__check-input" id="user-check" />
                            <label htmlFor="user-check" className="login__check-label">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="login__button">Login</button>

                    <div className="login__register">
                        Don't have an account ? <Link to="/signup">Register</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signin;
