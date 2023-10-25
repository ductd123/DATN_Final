import React, { Component } from 'react'
import anh from "../image/img-01.webp"
import './Login.css'
import { Link } from 'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            invalidEmail: false,
            invalidPass: false,
        };
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            invalidEmail: this.validateEmail(e.target.value),
        })
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            invalidPass: e.target.value == '',
        })
    }

    validateEmail(email) {
        // Đoạn regex dưới đây kiểm tra địa chỉ email.
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return !emailRegex.test(email);
    }

    handleOnSubmit = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        if (data.password !== '') {
            console.log('a');
        }
    }
    render() {
        return (
            <div className="login-body">
                <div className="login-container">
                    <div className="login-img">
                        <img src={anh} alt="" />
                    </div>
                    <div className="login-right">
                        <div className="login-title">Member Login</div>
                        <div className="login-detail">
                            <div className="login-input ">
                                <i className="fa-solid fa-envelope"></i>
                                <input className="login-user" onBlur={this.handleChangeEmail} type="email" placeholder="Email" />
                            </div>
                            {this.state.invalidEmail && <div className="invalid">Invalid Email</div>}

                            <div className="login-input ">
                                <i className="fa-solid fa-lock"></i>
                                <input className="login-pass" onChange={this.handleChangePassword} type="password" name="" placeholder="Password" />
                            </div>
                            {this.state.invalidPass && <div className="invalid">Enter your password</div>}
                            <div className="login-button">'
                                {/* <button className="login-input buttoni" onClick={this.isEmail}>Login</button> */}
                                <Link className="login-input buttoni" to='/home' >Login</Link>
                            </div>
                        </div>
                        <div className="login-more">
                            <div className="login-register">
                                <Link to="/register">Create new account</Link>
                            </div>
                            <div className="login-forgot">
                                <Link to="/">Forgot password?</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
