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
            Name: name,
            PhoneNp: phoneNo,
            Address: address,
            IsActive: 1
        };
        const url = 'test/Registration';
        axios.post(url, data).then((result) => {
            console.log(result.data);
        }).catch((error) => {
            alert(error);
        })
        // const response = await fetch('https://localhost:44494/test/Registration');
        // const data = await response.json();
        // console.log(response);

    }
    const fetchData = async (e) => {
        e.preventDefault();
        this.handleSave();
        // const response = await fetch('test/Registration');
        // // const response = await fetch('weatherforecast');
        // const data = await response.json();
        // this.setState({ forecasts: data, loading: false });
        // const data = {
        //     Name: name,
        //     PhoneNp: phoneNo,
        //     Address: address,
        //     IsActive: 1
        // };
        // const url = 'https://localhost:44494/api/v1/Registration';
        // axios.post(url, data).then((result) => {
        //     console.log(result.data);
        // }).catch((error) => {
        //     alert(error);
        // })
        // const response = await fetch('https://localhost:44494/test/Registration');
        // const data = await response.json();
        // console.log(response);
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
                <button onClick={(e) => handleSave()}>Sign Up</button>
            </form>
        </div>
    )
}