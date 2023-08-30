import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';

export default function Registration() {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');

    const handleNameChange = (value) => {
        setName(value)
    }
    const handlePhoneNoChange = (value) => {
        setPhoneNo(value)
    }
    const handleAddressChange = (value) => {
        setAddress(value)
    }
    const handleSave = async () => {
        const data = {
            id: 0,
            userName: "string",
            phoneNo: "string",
            address: "string",
            password: "string"
        };
        // const url = 'Account/Registration';
        // axios.post(url, data).then((result) => {
        //     console.log(result.data);
        // }).catch((error) => {
        //     alert(error);
        // })
        // const response = await fetch('Account/Registration');
        // const data = await response.json();
        // console.log(response);

        fetch('https://localhost:7139/Account/Registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Xử lý phản hồi từ máy chủ
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(data => {
                // Xử lý dữ liệu trả về từ máy chủ
                console.log(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });

    }
    const fetchData = async (e) => {
        e.preventDefault();
        const data = {
            id: 0,
            userName: "string",
            phoneNo: "string",
            address: "string",
            password: "string"
        };
        fetch('https://localhost:7139/Account/Registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Xử lý phản hồi từ máy chủ
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(data => {
                // Xử lý dữ liệu trả về từ máy chủ
                console.log(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    };
    return (
        <div className="form-container sign-in-container">
            <form>
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Xưng danh đi" onChange={(e) => handleNameChange(e.target.value)} />
                <input type="text" placeholder="Số đt???" onChange={(e) => handlePhoneNoChange(e.target.value)} />
                <input type="text" placeholder="Em ở đâu em ơi??" onChange={(e) => handleAddressChange(e.target.value)} />
                {/* <input type="password" placeholder="Password" /> */}
                <button onClick={(e) => fetchData(e)}>Sign Up</button>
            </form>
        </div>
    )
}