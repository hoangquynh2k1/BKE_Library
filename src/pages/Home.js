import React from 'react'
import { NavLink } from 'react-router-dom';
import Borrowing from '../contexts/BorrowListCt';

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
                        <h2 style={{ marginTop: 20 + 'px', marginBottom: 20 + "px" }}>Danh sách sắp đến hạn trả sách</h2>
                        <Borrowing></Borrowing>
                    </div>
                    <div className="row">
                        <div className="col-4 button_home return">
                            <button> <i class="fas fa-undo"></i> Trả sách</button>
                        </div>
                        <div className="col-4 button_home search">
                            <button> <i class="fas fa-search"></i> Tìm kiếm sách</button>
                        </div>
                        <div className="col-4 button_home borrow">
                            <button> <i class="fas fa-book-open"></i> Đăng Ký mượn sách</button>
                        </div>
                    </div>
                    <div className="row">
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default Home