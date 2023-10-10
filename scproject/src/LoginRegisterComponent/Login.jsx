import React, { Component } from 'react'
import anh from "../image/img-01.webp"

export default class Login extends Component {
  render() {
    return (
      <div class="container w-[960px] h-[678px] bg-[white] mx-auto flex justify-between items-center mt-[30px] border rounded-xl">
      <div class="left-login w-[480px] mx-[100px]">
          <img src={anh} alt="anh loi"/>
      </div>
      <div class="right-login w-[480px]">
          <form class="form-login" validetate-form>
              <span class="form-title flex justify-center w-[290px] text-[24px] font-bold">
                  Member Login
              </span>
              <div class="input]">
                  <div class="user-login bg-[#e6e6e6] w-[300px]  mt-[50px] rounded-[25px]">
                      <i class="fa-solid fa-envelope"></i>
                      <input class="h-[50px] bg-[#e6e6e6] border p-[20px]"  type="email" placeholder="Email"/>
                  </div>
                  
                  <div class="pass-login bg-[#e6e6e6] w-[300px]   mt-[20px] rounded-[25px]">
                      <i class="fa-solid fa-lock"></i>
                      <input class="h-[50px]  bg-[#e6e6e6] border p-[20px]"  type="password" name="" placeholder="Password"/>
                  </div>
                  <div class="click-login mt-[50px] mr-[96px]">
                      <button class="w-[300px] h-[50px] bg-[#57b846] text-white border rounded-[25px]">LOGIN</button>
                  </div>

                  <div class="forgot-login w-[290px] h-[50px] mt-[20px]">
                      <span class=" text-[13px] text-[#666] ">Forgot Username / Password?</span>
                  </div>
                  <div class="create-account w-[290px] h-[50px]mb-[20px]">
                      <span class="text-[13px] text-[#666]  mb-[20px]">Create your Account </span>
                  </div>
              </div>
          </form>
      </div>
  </div>
    )
  }
}
