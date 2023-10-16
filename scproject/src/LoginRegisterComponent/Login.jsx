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
            //       <div class="container w-[960px] h-[678px] bg-[white] mx-auto flex justify-between items-center mt-[30px] border rounded-xl">
            //       <div class="left-login w-[480px] mx-[100px]">
            //           <img src={anh} alt="anh loi"/>
            //       </div>
            //       <div class="right-login w-[480px]">
            //           <form class="form-login" validetate-form>
            //               <span class="form-title flex justify-center w-[290px] text-[24px] font-bold">
            //                   Member Login
            //               </span>
            //               <div class="input]">
            //                   <div class="user-login bg-[#e6e6e6] w-[300px]  mt-[50px] rounded-[25px]">
            //                       <i class="fa-solid fa-envelope"></i>
            //                       <input class="h-[50px] bg-[#e6e6e6] border p-[20px]"  type="email" placeholder="Email"/>
            //                   </div>

            //                   <div class="pass-login bg-[#e6e6e6] w-[300px]   mt-[20px] rounded-[25px]">
            //                       <i class="fa-solid fa-lock"></i>
            //                       <input class="h-[50px]  bg-[#e6e6e6] border p-[20px]"  type="password" name="" placeholder="Password"/>
            //                   </div>
            //                   <div class="click-login mt-[50px] mr-[96px]">
            //                       <button class="w-[300px] h-[50px] bg-[#57b846] text-white border rounded-[25px]">LOGIN</button>
            //                   </div>

            //                   <div class="forgot-login w-[290px] h-[50px] mt-[20px]">
            //                       <span class=" text-[13px] text-[#666] ">Forgot Username / Password?</span>
            //                   </div>
            //                   <div class="create-account w-[290px] h-[50px]mb-[20px]">
            //                       <span class="text-[13px] text-[#666]  mb-[20px]">Create your Account </span>
            //                   </div>
            //               </div>
            //           </form>
            //       </div>
            //   </div>
            <div className="login-body">
                <div className="login-container">
                    <div className="login-img">
                        <img src={anh} alt="" />
                    </div>
                    <div className="login-right">
                        <div className="login-title">Member Login</div>
                        <div className="login-detail">
                            <div class="login-input ">
                                <i class="fa-solid fa-envelope"></i>
                                <input class="login-user" onBlur={this.handleChangeEmail} type="email" placeholder="Email" />
                            </div>
                            {this.state.invalidEmail && <div className="invalid">Invalid Email</div>}

                            <div class="login-input ">
                                <i class="fa-solid fa-lock"></i>
                                <input class="login-pass" onChange={this.handleChangePassword} type="password" name="" placeholder="Password" />
                            </div>
                            {this.state.invalidPass && <div className="invalid">Enter your password</div>}
                            <div className="login-button">'
                                <button className="login-input buttoni" onClick={this.isEmail}>Login</button>
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
