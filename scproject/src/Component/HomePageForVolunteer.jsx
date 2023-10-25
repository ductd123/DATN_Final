import React, { Component } from 'react'

import HomepageLeft from './NavPanel/HomepageLeft'
import HomepageMid from './ListFriend/HomepageMid'
import HomepageRight from './Chatbox/ChatBox'

export default class HomePageForVolunteer extends Component {
  render() {
    return (
      <div className='flex'>
        <HomepageLeft/>
      </div>
    )
  }
}