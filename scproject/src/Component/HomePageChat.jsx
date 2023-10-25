import React, { Component } from 'react'

import HomepageLeft from './NavPanel/HomepageLeft'
import HomepageMid from './ListFriend/HomepageMid'
import ChatBox from './Chatbox/ChatBox'
export default class HomePageChat extends Component {
  render() {
    return (
      <div className='flex'>
        <HomepageLeft />
        <HomepageMid></HomepageMid>
        <ChatBox/>
      </div>
    )
  }
}
