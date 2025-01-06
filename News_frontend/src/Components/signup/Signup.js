import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fname, lname, email, password);

        axios.post("http://localhost:3000/signup",
            { fname, lname, email, password })
            .then(result => console.log(result),
                alert("registerd successfully"),
                navigate("/")
            )
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="login">
                
                <form onSubmit={handleSubmit} className="login__form">
                    <h1 className="login__title">Sign up form</h1>

                    <div className="login__inputs">
                        <div className="login__box">
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                className="login__input"
                                name="fname"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                            <i className="ri-mail-fill"></i>
                        </div>
                        <div className="login__box">
                            <input
                                type="text"
                                placeholder="Last Name"
                                required
                                className="login__input"
                                name="lname"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                            <i className="ri-mail-fill"></i>
                        </div>
                        <div className="login__box">
                            <input
                                type="email"
                                placeholder="Email ID"
                                required
                                className="login__input"
                                name="email"
                                value={email}
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
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="ri-lock-2-fill"></i>
                        </div>
                    </div>

                    <button type="submit" className="login__button">Register</button>

                    <div className="login__register">
                        If you have an account ? <Link to="/" > Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Signup;
