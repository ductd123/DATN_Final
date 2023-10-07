import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className='login-background'>
        <div className="login-containet">
          <div className="login-img"></div>
          <div className="login-panel">
            <div className="login-panel-title">Sign In</div>
            <div className="login-panel-input">
              <input type="text" placeholder='Email'></input>
              <input type="text" placeholder='Password'></input>
            </div>
            <div className="login-panel-forgot">
              
            </div>
            <div className="login-panel-register"></div>
          </div>
        </div>
      </div>
    )
  }
}
