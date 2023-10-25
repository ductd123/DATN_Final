import React, { Component } from 'react'

import HomepageLeft from './NavPanel/HomepageLeft'
import { Input } from 'antd';
import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Searchbox from './Common/Searchbox';
export default class HomePageForVolunteer extends Component {
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
      <div className='flex'>
        <HomepageLeft />
        <Searchbox search={this.state.search} handleCloseSearch={this.handleCloseSearch} handleOpenSearch={this.handleOpenSearch} />
      </div>
    )
  }
}