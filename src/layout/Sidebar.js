import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

function ToggleSidebar() {
    var check = document.getElementById("sidebar").style.display
    if (check.length != 5)
    {
        document.getElementsByClassName("fa-arrow-right")[0].className="fas fa-arrow-left"
        document.getElementById("sidebar").style.display = "block"
    }
    else
    {
        document.getElementsByClassName("fa-arrow-left")[0].className="fas fa-arrow-right"
        document.getElementById("sidebar").style.display = "none"
    }
  }
function Sidebar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.role;
    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="menu">
                    <NavLink to="/"><div className="menu-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Tổng quan</span>
                    </div>
                    </NavLink>
                    {role == "ql" &&(
                    <NavLink to="/staff"><div className="menu-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Nhân viên</span>
                    </div>
                    </NavLink>)}
                    <NavLink to="/category"><div className="menu-item">
                        <i class="fas fa-user"></i>
                        <span>Loại Sách</span>
                    </div>
                    </NavLink>
                    <NavLink to="/book"><div className="menu-item">
                        <i class="fas fa-user"></i>
                        <span>Sách</span>
                    </div>
                    </NavLink>
                    <NavLink to="/borrower"><div className="menu-item">
                        <i class="fas fa-user"></i>
                        <span>Độc giả</span>
                    </div>
                    </NavLink>
                    <NavLink to="/borrowing"><div className="menu-item">
                        <i class="fas fa-user"></i>
                        <span>Mượn sách</span>
                    </div>
                    </NavLink>
                </div>
            </div>
            <div className="sidebar-mobile">
                <i class="fas fa-arrow-right" onClick={() => ToggleSidebar()}></i>
            </div>
        </>
    );
}
export default Sidebar