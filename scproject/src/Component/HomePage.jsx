import React, { Component } from 'react'

import HomepageLeft from './NavPanel/HomepageLeft'
import HomepageMid from './ListFriend/HomepageMid'
import HomepageRight from './Chatbox/HomepageRight'
import "./homepage.css"
import Index from './Index'
export default class HomePage extends Component {
  render() {
    return (
      <div className='flex'>
        <HomepageLeft/>
        <Index/>
      </div>
    )
  }
}
