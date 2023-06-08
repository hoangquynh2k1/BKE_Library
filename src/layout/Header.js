import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

function toggle() {
  var check1 = document.getElementById("account").style.display
  if (check1.length != 5)
    document.getElementById("account").style.display = "block"
  else
    document.getElementById("account").style.display = "none"
}
function toggle_mobile() {
  var check = document.getElementById("account-mobile").style.display
  if (check.length != 5)
    document.getElementById("account-mobile").style.display = "block"
  else
    document.getElementById("account-mobile").style.display = "none"
}

function Header() {
  const logout = () => {
    localStorage.removeItem("user");
  }
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div class="header">
      <div class="logo">
      <img src="/assets/img/logo.svg" alt="" className="logo" />
      </div>
      <div class="navbar">
        <div class="menu">
          <div class="left messenger">
            <i class="fas fa-envelope number-float">
              <span class="number">2</span>
            </i>
          </div>
          <div class="left notication number-float">
            <i class="fas fa-bell">
              <span class="number">3</span>
            </i>
          </div>
          <div class="left user" onClick={() => toggle()}>
            <i class="fas fa-user"></i>
            <img src="" class="user-image"></img>
            <div class="user-name">{user.value.name}</div>
          </div>
        </div>
        <div className="account-mobile" id="account-mobile">
          <NavLink to="/">
            <div>
              Trang cá nhân
            </div>
          </NavLink>
          <NavLink >
            <div>
              Đăng xuất
            </div>
          </NavLink>
        </div>
      </div>
      <div className="account" id="account">
        <NavLink to="/">
          <div>
            Trang cá nhân
          </div>
        </NavLink>
        <NavLink to="/login">
          <div onClick={logout}>
            Đăng xuất
          </div>
        </NavLink>
      </div>      
      <div className="nav-mobile">
        <i class="fas fa-user" onClick={() => toggle_mobile()}></i>
      </div>


    </div>

  )
}

export default Header