import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip, message } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import logo from '../../assets/image/logo.png';
import apiSignUp from '../../Services/apiRegister';
import { apiLogin } from '../../Services';
const Register = () => {
    const [step1, setStep1] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    });
    const [invalidFields, setInvalidFields] = useState({
        name: false,
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'email') {
            setInvalidFields({
                ...invalidFields,
                [name]: !validateEmail(value),
            });
        } else if (name === 'password') {
            setInvalidFields({
                ...invalidFields,
                [name]: !validatePassword(value),
            });

        } else if (name === 'name') {
            setInvalidFields({
                ...invalidFields,
                [name]: value === '',
            });
        }
    };


    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const checkAll = () => {
        const { name, email, password } = formData;
        setInvalidFields({
            ...invalidFields,
            name: name === '',
            email: !validateEmail(email),
            password: password === '',
        });

        if (name && validateEmail(email) && password) {
            onSubmit();
        }
    };

    const onSubmit = async () => {
        try {
            await apiSignUp.generateOtp(formData);
            setStep1(false);
            message.success('Vui lòng nhập mã OTP được gửi về email.');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const checkAuthen = async () => {
        setInvalidFields({
            ...invalidFields,
            otp: formData.otp === '',
        });

        if (!invalidFields.otp) {
            try {
                let response = await apiSignUp.validateOtp({
                    email: formData.email,
                    otpNum: formData.otp,
                });
                setStep1(true);
                message.success('Đăng ký tài khoản thành công.');
                if (response) {
                    handleLogin();
                }

            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        let data = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await apiLogin.postLogin(data);
            if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                setTimeout(() => {
                    navigate('/');
                }, 500);
            } else {
                setStep1(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            message.error("Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác.")
            setStep1(true);
        }
    };
    const checkRetypePassword = (e) => {
        setInvalidFields({
            ...invalidFields,
            failRetypePass: e.target.value !== formData.password && e.target.value !== null,
        });
    };

    const onCancel = () => {
        window.location.reload();
    };

    return (
        <>
            {step1 && (
                <div className="login-body">
                    <div className="login-container" style={{ background: '#f1f3f5', flexDirection: 'column' }}>
                        <div className="login-title">Đăng ký tài khoản <img src={logo} style={{ width: '50px', height: 'auto' }} alt="Logo" /></div>
                        <div style={{ display: 'flex' }}>
                            <div className="login-right">
                                <div className="login-detail">
                                    <div className="login-input" style={invalidFields.name ? { border: '2px solid red' } : {}}>
                                        <i className="fa fa-user"></i>
                                        <input onBlur={handleChange} onChange={handleChange} value={formData.name} name="name" type="text" placeholder="Họ và tên" />
                                        {invalidFields.name && (
                                            <Tooltip placement="top" title={'Vui lòng không để trống'} color={'red'}>
                                                <WarningTwoTone className="icon-warning" />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="login-input " style={invalidFields.email ? { border: '2px solid red' } : {}}>
                                        <i className="fa-solid fa-envelope"></i>
                                        <input className="login-user" value={formData.email} onBlur={handleChange} onChange={handleChange} name="email" type="email" placeholder="Email" />
                                        {invalidFields.email && (
                                            <Tooltip placement="top" title={'Email không hợp lệ, vui lòng nhập đúng'} color={'red'}>
                                                <WarningTwoTone className="icon-warning" />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="login-input " style={invalidFields.password ? { border: '2px solid red' } : {}}>
                                        <i className="fa-solid fa-lock"></i>
                                        <input className="login-user" value={formData.password} onBlur={handleChange} onChange={handleChange} name="password" type="password" placeholder="Mật khẩu" />
                                        {invalidFields.password && (
                                            <Tooltip placement="top" title={'Mật khẩu không được để trống, ít nhất 8 ký tự, bao gồm chữ thường, chữ in hoa và chữ số.'} color={'red'}>
                                                <WarningTwoTone className="icon-warning" />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="login-input " style={invalidFields.failRetypePass ? { border: '2px solid red' } : {}}>
                                        <i className="fa-solid fa-lock"></i>
                                        <input className="login-pass" onChange={checkRetypePassword} type="password" required name="" placeholder="Nhập lại mật khẩu" />
                                        {invalidFields.failRetypePass && (
                                            <Tooltip placement="top" title={'Mật khẩu không khớp'} color={'red'}>
                                                <WarningTwoTone className="icon-warning" />
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-button flex" style={{ justifyContent: 'center' }}>
                            <button className="login-input buttoni" onClick={checkAll}>Đăng ký</button>
                        </div>
                        <div className="login-forgot flex" style={{ color: 'blue', marginBottom: '10px', justifyContent: 'center' }}>
                            <Link to="/login">Trở về trang đăng nhập</Link>
                        </div>
                    </div>

                </div>
            )}
            {!step1 && (
                <div className="login-body">
                    <div className="login-container" style={{ background: '#f1f3f5', flexDirection: 'column' }}>
                        <div className="login-title">Đăng ký tài khoản</div>
                        <div className="login-title-detail">Xác nhận mã OTP</div>
                        <div style={{ display: 'flex' }}>
                            <div className="login-right">
                                <div className="login-detail">
                                    <div className="login-input">
                                        <i className="fa fa-user"></i>
                                        <input type="text" disabled value={formData.email} />
                                    </div>
                                    <div className="login-input " style={invalidFields.otp ? { border: '2px solid red' } : {}}>
                                        <i className="fa fa-cog"></i>
                                        <input className="login-user" onBlur={handleChange} onChange={handleChange} value={formData.otp} name="otp" type="text" placeholder="Mã OTP" />
                                        {invalidFields.otp && (
                                            <Tooltip placement="top" title={'Vui lòng nhập đúng mã OTP'} color={'red'}>
                                                <WarningTwoTone className="icon-warning" />
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-button flex" onClick={checkAuthen} style={{ justifyContent: 'center' }}>
                            <button className="login-input buttoni">Đăng ký</button>
                        </div>
                        <div className="login-forgot" style={{ color: 'blue', marginBottom: '10px' }}>
                            <button onClick={onCancel}>Hủy bỏ</button>
                        </div>
                    </div>

                </div>
            )}
        </>
    );

}

export default Register;