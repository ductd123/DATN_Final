import React, { Component } from 'react'
import anh from "../../assets/image/logoWetalk.png"
import './Login.scss'
import { Link } from 'react-router-dom'
import { Spin, Tooltip } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import apiLogin from '../../Services/apiLogin';
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
            invalidEmail: this.validateEmail(this.state.email),
        })
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            invalidPass: e.target.value === '',
        })
    }

    validateEmail(email) {
        // Đoạn regex dưới đây kiểm tra địa chỉ email.
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return !emailRegex.test(email);
    }

    handleOnSubmit = async () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            const response = await apiLogin.postLogin(data)
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }
    render() {
        return (
            <div className="login-body">
                <div className="login-container">
                    <div className="login-img">
                        <img src={anh} alt="" />
                    </div>
                    <div className="login-right" style={{ marginBottom: '20px' }}>
                        <div className="login-title">Đăng nhập</div>
                        <div className="login-detail">
                            <div className="login-input" style={this.state.invalidEmail ? { border: '2px solid red' } : {}}>
                                <i className="fa-solid fa-envelope"></i>
                                <input onBlur={this.handleChangeEmail} onChange={this.handleChangeEmail} value={this.state.fullName} type="text" placeholder="Email" />
                                {this.state.invalidEmail && <Tooltip placement='top' title={"Vui lòng nhập đúng email của bạn"} color={'red'}>
                                    <WarningTwoTone className='icon-warning' />
                                </Tooltip>}
                            </div>
                            <div className="login-input" style={this.state.invalidPass ? { border: '2px solid red' } : {}}>
                                <i className="fa-solid fa-lock"></i>
                                <input className="login-pass" onChange={this.handleChangePassword} type="password" name="" placeholder="Mật khẩu" />
                                {this.state.invalidPass && <Tooltip placement='top' title={"Vui lòng nhập email của bạn"} color={'red'}>
                                    <WarningTwoTone className='icon-warning' />
                                </Tooltip>}
                            </div>
                            <div className="login-button">'
                                <button className="login-input buttoni" onClick={this.handleOnSubmit}>Login</button>
                            </div>
                        </div>
                        <div className="login-more">
                            <div className="login-register">
                                <Link to="/register">Đăng ký tài khoản mới</Link>
                            </div>
                            <div className="login-forgot">
                                <Link to="/">Quên mật khẩu</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
