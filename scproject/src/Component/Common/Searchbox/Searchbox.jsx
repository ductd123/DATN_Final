import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
class Searchbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let suffix = (
            <SearchOutlined
                style={{
                    fontSize: 16,
                    color: '#1677ff',
                }}
            />
        );
        return (
            <div className="relative" style={{height:'max-content'}}>
                <div className="flex justify-center items-center mt-[20px] w-[343px]">
                    <Input placeholder="Tìm kiếm" onClick={this.props.handleOpenSearch} allowClear suffix={suffix} style={{ width: 250 }} />
                    {this.props.search ? <button className="hoversearch w-[67px] h-[32px] font-[600px] ml-[5px]  px-[15px]" style={{border:'1px solid #d9d9d9', borderRadius:'6px'}} onClick={this.props.handleCloseSearch} >Đóng</button> :
                        <div className="">
                            <UserAddOutlined style={{ padding: '0 20px' }} />
                            <UsergroupAddOutlined />
                        </div>
                    }
                </div>
            </div>
        );
    }
}
export default Searchbox;