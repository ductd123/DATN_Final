import React, { Component } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
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
            invalidAddress: this.state.address === '',
            invalidDate: this.state.birthday === '',
            invalidEmail: this.validateEmail(this.state.email),
            invalidGender: this.state.gender === '',
            invalidPass: this.state.password === '',
            invalidPhoneNum: this.state.phoneNumber === '',
        }, () => {
            if (!this.state.invalidName && !this.state.invalidAddress && !this.state.invalidDate && !this.state.invalidEmail && !this.state.invalidGender && !this.state.invalidPass && !this.state.invalidPhoneNum) {
                this.onSubmit();
            }
        })

    }
    onSubmit = () => {
        let data = {
            name: this.state.fullName,
            email: this.state.email,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            role: "USER",
            birthday: this.state.birthday,
            gender: this.state.gender,
        };
        this.setState({
            step1: false,
        }, () => { });
        console.log(data);
    }

    checkAuthen = () => {
        this.setState({
            invalidOTP: this.state.otp === '',
        }, () => {
            if (!this.state.invalidOTP) {
                let data = {
                    email: this.state.email,
                    otpNum: this.state.otp,
                }
                console.log(data);
            }
        })
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
                            <div className="login-title">Register account</div>
                            <div style={{ display: 'flex' }}>
                                <div className="login-right">
                                    <div className="login-detail">
                                        <div className="login-input" style={this.state.invalidName ? { border: '2px solid red' } : {}}>
                                            <i className="fa fa-user"></i>
                                            <input onBlur={this.handleChangeName} onChange={this.handleChangeName} value={this.state.fullName} type="text" placeholder="Full name" />
                                            {this.state.invalidName && <Tooltip placement='top' title={"Enter your name"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        <div className="login-input " style={this.state.invalidEmail ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-envelope"></i>
                                            <input className="login-user" value={this.state.email} onBlur={this.handleChangeEmail} onChange={this.handleChangeEmail} type="email" placeholder="Email" />
                                            {this.state.invalidEmail && <Tooltip placement='top' title={"Invalid Email"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        <div className="login-input " style={this.state.invalidPhoneNum ? { border: '2px solid red' } : {}}>
                                            <i className="fa fa-phone"></i>
                                            <input className="login-user" value={this.state.phoneNumber} onBlur={this.handleChangePhoneNumber} onChange={this.handleChangePhoneNumber} type="email" placeholder="Phone Number" />
                                            {this.state.invalidPhoneNum && <Tooltip placement='top' title={"Type your number phone"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        {/* {this.state.invalidEmail && <div className="invalid">Invalid number phone</div>} */}
                                        <div className="login-input " style={this.state.invalidAddress ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-address-card"></i>
                                            <input className="login-user" value={this.state.address} onBlur={this.handleChangeAddress} onChange={this.handleChangeAddress} type="email" placeholder="Address" />
                                            {this.state.invalidAddress && <Tooltip placement='top' title={"Enter your address"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                    </div>
                                </div>
                                <div className="login-right">
                                    <div className="login-detail">
                                        <div className="login-input" style={this.state.invalidDate ? { border: '2px solid red' } : {}}>
                                            <i className="fa fa-calendar"></i>
                                            <input onBlur={this.handleChangeBirthday} onChange={this.handleChangeBirthday} value={this.state.birthday} type="date" placeholder="Full name" />
                                            {this.state.invalidDate && <Tooltip placement='top' title={"Enter your birthday"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        <div className="login-input " style={this.state.invalidGender ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-transgender-alt"></i>
                                            <input className="login-user" value={this.state.gender} onBlur={this.handleChangeGender} onChange={this.handleChangeGender} type="text" placeholder="Gender" />
                                            {this.state.invalidGender && <Tooltip placement='top' title={"Enter your gender"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>
                                        <div className="login-input " style={this.state.invalidPass ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-lock"></i>
                                            <input className="login-user" value={this.state.password} onBlur={this.handleChangePassword} onChange={this.handleChangePassword} type="password" placeholder="Password" />
                                            {this.state.invalidPass && <Tooltip placement='top' title={"Password cannot be empty, must be at least 8 characters and must contain both upper and lower case characters"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>

                                        <div className="login-input " style={this.state.failRetypePass ? { border: '2px solid red' } : {}}>
                                            <i className="fa-solid fa-lock"></i>
                                            <input className="login-pass" onChange={this.checkRetypePassword} type="password" required name="" placeholder="Retype password" />
                                            {this.state.failRetypePass && <Tooltip placement='top' title={"Password does not match"} color={'red'}>
                                                <WarningTwoTone className='icon-warning' />
                                            </Tooltip>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="login-button flex" style={{ justifyContent: 'center' }}>
                                <button className="login-input buttoni" onClick={this.checkAll}>Register</button>
                            </div>
                            <div className="login-forgot flex" style={{ color: 'blue', marginBottom: '10px', justifyContent: 'center' }}>
                                <Link to="/">Back to login</Link>
                            </div>
                        </div>

                    </div>}
                {!this.state.step1 && <div className="login-body">
                    <div className="login-container" style={{ background: '#f1f3f5', flexDirection: 'column' }}>
                        <div className="login-title">Register account</div>
                        <div className="login-title-detail">OTP code authentication</div>
                        <div style={{ display: 'flex' }}>
                            <div className="login-right">
                                <div className="login-detail">
                                    <div className="login-input">
                                        <i className="fa fa-user"></i>
                                        <input type="text" disabled value={this.state.email} placeholder="Full name" />
                                    </div>
                                    <div className="login-input " style={this.state.invalidOTP ? { border: '2px solid red' } : {}}>
                                        <i className="fa fa-cog"></i>
                                        <input className="login-user" onBlur={this.handleChangeOTP} onChange={this.handleChangeOTP} type="text" placeholder="OTP Code" />
                                        {this.state.invalidOTP && <Tooltip placement='top' title={"Enter OTP code"} color={'red'}>
                                            <WarningTwoTone className='icon-warning' />
                                        </Tooltip>}
                                    </div>
                                    <div className="login-forgot" onClick={this.checkAll}>
                                        <button>Back to login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-button flex" onClick={this.checkAuthen} style={{ justifyContent: 'center' }}>
                            <button className="login-input buttoni">Register</button>
                        </div>
                        <div className="login-forgot" style={{ color: 'blue', marginBottom: '10px' }}>
                            <button onClick={this.onCancle}>Cancel</button>
                        </div>
                    </div>

                </div>}
            </>
        );
    }
}

export default Register;