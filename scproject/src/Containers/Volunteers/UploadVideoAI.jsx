import React, { Component } from 'react'
import { HeaderBar, HomepageLeft, Searchbox } from '../../Component/index'

import { Input } from 'antd';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

export default class UploadVideoAI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
        }
    }
    handleOpenSearch = () => {
        this.setState({ search: true })
    }
    handleCloseSearch = () => {
        this.setState({ search: false })
    }
    render() {
        return (
            <div className="">
            </div>
        )
    }
}