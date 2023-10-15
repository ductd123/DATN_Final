import React, { Component } from 'react'
import registerImg from "../image/register.jpg"
import './Login.css'
import { Link } from 'react-router-dom'
class Register extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (<div className="login-body">
            <div className="login-container" style={{ background: '#f1f3f5' }}>

                <div className="login-right">
                    <div className="login-title">Register account</div>
                    <div className="login-detail">
                        <div className="flex">
                            <div class="login-input login-name">
                                <i class="fa fa-user"></i>
                                <input class="" onBlur={this.handleChangeEmail} type="email" placeholder="First name" />
                            </div>
                            <div class="login-input  login-name">
                                <i ></i>
                                <input class="" onBlur={this.handleChangeEmail} type="email" placeholder="Last name" />
                            </div>
                        </div>
                        {this.state.invalidEmail && <div className="invalid">Enter your name</div>}
                        <div class="login-input ">
                            <i class="fa-solid fa-envelope"></i>
                            <input class="login-user" onBlur={this.handleChangeEmail} type="email" placeholder="Email" />
                        </div>
                        {this.state.invalidEmail && <div className="invalid">Invalid Email</div>}
                        <div class="login-input ">
                            <i class="fa fa-phone"></i>
                            <input class="login-user" onBlur={this.handleChangeEmail} type="email" placeholder="Phone Number" />
                        </div>
                        {this.state.invalidEmail && <div className="invalid">Invalid number phone</div>}
                        <div class="login-input ">
                            <i class="fa-solid fa-lock"></i>
                            <input class="login-user" onBlur={this.handleChangeEmail} type="email" placeholder="Password" />
                        </div>
                        {this.state.invalidEmail && <div className="invalid">Invalid Email</div>}

                        <div class="login-input ">
                            <i class="fa-solid fa-lock"></i>
                            <input class="login-pass" onChange={this.handleChangePassword} type="password" name="" placeholder="Retype password" />
                        </div>
                        {this.state.invalidPass && <div className="invalid">Enter your password</div>}
                        <div className="login-button">'
                            <button className="login-input buttoni" onClick={this.isEmail}>Register</button>
                        </div>
                    </div>
                    <div className="login-forgot" style={{color:'blue'}}>
                        <Link to="/">Back to login</Link>
                    </div>
                    <div className="login-more"></div>
                </div>
                <div className="login-img">
                    <img src={registerImg} alt="" />
                </div>
            </div>
        </div>);
    }
}

export default Register;