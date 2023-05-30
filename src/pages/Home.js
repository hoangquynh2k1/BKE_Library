import React from 'react'
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="body">
                <div className="home_header">
                    <img src="assets/img/logo.svg"></img>
                    <h1>Thư viện Bách khoa Education</h1>
                </div>
                <div className="home_content">
                    <div className="row">
                        <div className="col-4">
                            <button>Thêm thông tin mượn sách</button>
                        </div>
                        <div className="col-4">
                            <button>Thêm thông tin mượn sách</button>
                        </div>
                        <div className="col-4">
                            <button>Thêm thông tin mượn sách</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <button>Thêm thông tin mượn sách</button>
                        </div>
                        <div className="col-4">
                            <button>Thêm thông tin mượn sách</button>
                        </div>
                        <div className="col-4">
                            <NavLink to="/borrowing"><div className="menu-item">
                                <i class="fas fa-user"></i>
                                <span>Mượn sách</span>
                            </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home