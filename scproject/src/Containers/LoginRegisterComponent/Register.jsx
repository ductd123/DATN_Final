import React, { Component } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import axios from 'axios';
import logo from "../../assets/image/logo.png"
import axiosClient from '../../Services/axiosClient';
import apiSignUp from '../../Services/apiRegister';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step1: true,
            invalidName: false,
            invalidPhoneNum: false,
            invalidAddress: false,
            invalidDate: false,
            invalidGender: false,
            invalidEmail: false,
            invalidOTP: '',
            failRetypePass: false,
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            address: '',
            birthday: '',
            gender: '',
            otp: '',
        }
    }
    handleChangeName = (e) => {
        this.setState({
            fullName: e.target.value,
            invalidName: e.target.value === '',
        })
    }
    handleChangePhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value,
            invalidPhoneNum: this.checkPhoneNumber(e.target.value),
        })
    }
    handleChangeAddress = (e) => {
        this.setState({
            address: e.target.value,
            invalidAddress: e.target.value === '',
        })
    }
    handleChangeBirthday = (e) => {
        this.setState({
            birthday: e.target.value,
            invalidDate: e.target.value === '',
        })
    }
    handleChangeGender = (e) => {
        this.setState({
            gender: e.target.value,
            invalidGender: e.target.value === '',
        })
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            invalidEmail: this.validateEmail(e.target.value),
        })
    }

    handleChangeOTP = (e) => {
        this.setState({
            otp: e.target.value,
            invalidOTP: e.target.value === '',
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value,
            invalidPass: this.validatePassword(e.target.value),
        })
    }
    checkPhoneNumber = (phoneNumber) => {
        const pattern = /^\d{3}-?\d{7}$/;
        return !pattern.test(phoneNumber);
    }

    checkRetypePassword = (e) => {
        this.setState({
            failRetypePass: e.target.value !== this.state.password && e.target.value !== null,
        })
    }
    validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return !passwordRegex.test(password);
    };

    validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return !emailRegex.test(email);
    }
    checkAll = () => {
        this.setState({
            invalidName: this.state.fullName === '',
            // invalidAddress: this.state.address === '',
            // invalidDate: this.state.birthday === '',
            invalidEmail: this.validateEmail(this.state.email),
            // invalidGender: this.state.gender === '',
            invalidPass: this.state.password === '',
            // invalidPhoneNum: this.state.phoneNumber === '',
        }, () => {
            if (!this.state.invalidName && !this.state.invalidEmail  && !this.state.invalidPass ) {
                this.onSubmit();
            }
        })

    }
    onSubmit = async () => {
        let data = {
            name: this.state.fullName,
            email: this.state.email,
            password: this.state.password,
            role: "USER",
        };
        // this.setState({
        //     step1: false,
        // }, () => { });
        // console.log(data);
        try {
            const response = await apiSignUp.generateOtp(data)
            this.setState({
                step1: false,
            }, () => { });
            console.log('Server Response:', response.data);
            // Thực hiện xử lý response tại đây nếu cần
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    checkAuthen = async () => {
        this.setState({
            invalidOTP: this.state.otp === '',
        }, () => { })
        if (!this.state.invalidOTP) {
            let data = {
                email: this.state.email,
                otpNum: this.state.otp,
            }
            try {
                const response = await apiSignUp.validateOtp(data)
                this.setState({
                    step1: true,
                }, () => {});
                // Thực hiện xử lý response tại đây nếu cần
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }

    }

    onCancle = () => {
        window.location.reload();
    }

    render() {
        return (
            <>
                {this.state.step1 &&
                    <div className="login-body">
                        <div className="login-container" style={{ background: '#f1f3f5', flexDirection: 'column' }}>
                            <div className="login-title">Đăng ký tài khoản  <img src={logo} style={{ width: '50px', height: 'auto' }}></img></div>
                            <div style={{ display: 'flex' }}>
                                <div className="login-right">
                                    <div className="login-detail">
                                        <div className="login-input" style={this.state.invalidName ? { border: '2px solid red' } : {}}>
                                            <i className="fa fa-user"></i>
                                            <input onBlur={this.handleChangeName} onChange={this.handleChangeName} value={this.state.fullName} type="text" placeholder="Họ và tên" />
                                            {this.state.invalidName && <Tooltip placement='top' title={"Vui lòng không để trống"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        <div className="login-input " style={this.state.invalidEmail ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-envelope"></i>
                                            <input className="login-user" value={this.state.email} onBlur={this.handleChangeEmail} onChange={this.handleChangeEmail} type="email" placeholder="Email" />
                                            {this.state.invalidEmail && <Tooltip placement='top' title={"Email không hợp lệ, vui lòng nhập đúng"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        <div className="login-input " style={this.state.invalidPass ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-lock"></i>
                                            <input className="login-user" value={this.state.password} onBlur={this.handleChangePassword} onChange={this.handleChangePassword} type="password" placeholder="Mật khẩu" />
                                            {this.state.invalidPass && <Tooltip placement='top' title={"Mật khẩu không được để trống, ít nhất 8 ký tự, bao gồm chữ thường, chữ in hoa và chữ số."} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>

                                        <div className="login-input " style={this.state.failRetypePass ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-lock"></i>
                                            <input className="login-pass" onChange={this.checkRetypePassword} type="password" required name="" placeholder="Nhập lại mật khẩu" />
                                            {this.state.failRetypePass && <Tooltip placement='top' title={"Mật khẩu không khớp"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="login-button flex" style={{ justifyContent: 'center' }}>
                                <button className="login-input buttoni" onClick={this.checkAll}>Đăng ký</button>
                            </div>
                            <div className="login-forgot flex" style={{ color: 'blue', marginBottom: '10px', justifyContent: 'center' }}>
                                <Link to="/login">Trở về trang đăng nhập</Link>
                            </div>
                        </div>

                    </div>}
                {!this.state.step1 && <div className="login-body">
                    <div className="login-container" style={{ background: '#f1f3f5', flexDirection: 'column' }}>
                        <div className="login-title">Đăng ký tài khoản</div>
                        <div className="login-title-detail">Xác nhận mã OTP</div>
                        <div style={{ display: 'flex' }}>
                            <div className="login-right">
                                <div className="login-detail">
                                    <div className="login-input">
                                        <i className="fa fa-user"></i>
                                        <input type="text" disabled value={this.state.email} />
                                    </div>
                                    <div className="login-input " style={this.state.invalidOTP ? { border: '2px solid red' } : {}}>
                                        <i className="fa fa-cog"></i>
                                        <input className="login-user" onBlur={this.handleChangeOTP} onChange={this.handleChangeOTP} type="text" placeholder="Mã OTP" />
                                        {this.state.invalidOTP && <Tooltip placement='top' title={"Vui lòng nhập đúng mã OTP"} color={'red'}>
                                            <WarningTwoTone className='icon-warning' />
                                        </Tooltip>}
                                    </div>
                                    {/* <div className="login-forgot" onClick={this.checkAll}>
                                        <button>Trở về trang đăng nhập</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="login-button flex" onClick={this.checkAuthen} style={{ justifyContent: 'center' }}>
                            <button className="login-input buttoni">Đăng ký</button>
                        </div>
                        <div className="login-forgot" style={{ color: 'blue', marginBottom: '10px' }}>
                            <button onClick={this.onCancle}>Hủy bỏ</button>
                        </div>
                    </div>

                </div>}
            </>
        );
    }
}

export default Register;