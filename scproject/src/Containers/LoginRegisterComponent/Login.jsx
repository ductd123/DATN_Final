import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anh from '../../assets/image/logoWetalk.png';
import './Login.scss';
import { Tooltip, message } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import apiLogin from '../../Services/apiLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return !emailRegex.test(email);
    };

    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setInvalidEmail(validateEmail(email));
        setInvalidPass(password === '');

        let data = {
            email: email,
            password: password,
        };

        try {
            if (!invalidEmail && !invalidPass) {
                const response = await apiLogin.postLogin(data);

                if (!response.access_token) {
                    setInvalidPass(true);
                } else {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    setTimeout(() => {
                        navigate('/');
                    }, 500);
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            message.error("Đăng nhập thất bại, tài khoản hoặc mật khẩu không chính xác.")
            setInvalidPass(true);
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="login-img">
                    <img src={anh} alt="" />
                </div>
                <div className="login-right" style={{ marginBottom: '20px' }}>
                    <div className="login-title">Đăng nhập</div>
                    <form className="login-detail" onSubmit={handleOnSubmit}>
                        <div
                            className="login-input"
                            style={invalidEmail ? { border: '2px solid red' } : {}}
                        >
                            <i className="fa-solid fa-envelope"></i>
                            <input
                                onBlur={(e) => setEmail(e.target.value)}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="text"
                                placeholder="Email"
                            />
                            {invalidEmail && (
                                <Tooltip placement="top" title={'Vui lòng nhập đúng email của bạn'} color={'red'}>
                                    <WarningTwoTone className="icon-warning" />
                                </Tooltip>
                            )}
                        </div>
                        <div
                            className="login-input"
                            style={invalidPass ? { border: '2px solid red' } : {}}
                        >
                            <i className="fa-solid fa-lock"></i>
                            <input
                                className="login-pass"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name=""
                                placeholder="Mật khẩu"
                            />
                            {invalidPass && (
                                <Tooltip placement="top" title={'Vui lòng nhập đúng mật khẩu của bạn'} color={'red'}>
                                    <WarningTwoTone className="icon-warning" />
                                </Tooltip>
                            )}
                        </div>
                        <div className="login-button">
                            <button className="login-input buttoni" type="submit">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                    <div className="login-more">
                        <div className="login-register">
                            <Link to="/register">Đăng ký tài khoản mới</Link>
                        </div>
                        <div className="login-forgot">
                            <Link to="/">Đăng nhập không cần tài khoản!!!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
