import { useState } from "react"
import anh from "../../assets/image/rosie.png"
import anh1 from "../../assets/image/zl.png"
import React, { Component } from 'react'
import UserList from "./UseList";
import { Input } from 'antd';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Searchbox from "../Common/Searchbox/Searchbox";
import HeaderBar from "../HeaderBar/HeaderBar";
class HomepageMid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            active: false,
        }
    }
    handleactive = (e) => {
        this.setState({
            active: e,
        })
    }
    handleOpenSearch = () => {
        this.setState({ search: true })
    }
    handleCloseSearch = () => {
        this.setState({ search: false })
    }
    render() {
        return (<div className="detail-panel relative">
            <div className="main-layout__side-bar">
                <div className="main-layout__header-bar">
                    <HeaderBar />
                </div>
                <div className="main-layout__content">
                </div>
            </div>
        </div>

        );
    }
}

export default HomepageMid;