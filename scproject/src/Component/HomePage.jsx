import React, { Component } from 'react'

import HomepageLeft from './HomepageLeft'
import HomepageMid from './HomepageMid'
import HomepageRight from './HomepageRight'
import "./homepage.css"
export default class HomePage extends Component {
  render() {
    return (
      <div className='flex'>
        <HomepageLeft/>
        <HomepageMid/>
        <HomepageRight/>
      </div>
    )
  }
}
