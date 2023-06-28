import React, {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import BookCt from '../contexts/BookCt';
import BorrowingCt from '../contexts/BorrowingCt';
import Borrowing from '../contexts/BorrowListCt';

function Home() {
    const path = "http://greenlibrary.somee.com/api/";
    // const path = "https://localhost:44366/api/";
    const [isCreate, setIsCreate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookLists, setBookLists] = useState([]);

    const handleOpenModal = (status) => {
        setIsModalOpen(true);
        setIsCreate(status)
    };
    useEffect(() => { 
        axios.get(path + 'Book/Get').then(response => {
            setBookLists(response.data)
        })
     }, []);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const onSearchBook = () => {
        var check = document.getElementById("bookct").style.display
        if (check.length != 5)
            document.getElementById("bookct").style.display = "block"
        else
            document.getElementById("bookct").style.display = "none"
    }
    const showDialog = () => {
        alert("Chức năng đang hoàn thiện. Vui lòng chờ cập nhật sau!")
    }
    return (
        <>
            <div className="body">
                {/* <div className="loading" id="loading">
                    <i class="fas fa-spinner"></i>
                </div> */}
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
                        <div className="col-4 button_home search">
                            <button onClick={() => showDialog()}> Thêm đầu sách</button>
                        </div>
                        <div className="col-4 button_home borrow">
                            <button onClick={() => showDialog()}>  Đăng ký độc giả mới</button>
                        </div>
                        <div className="col-4 button_home return">
                            <NavLink to="/dashboard"><button>  Thêm</button></NavLink>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 button_home search">
                            <button onClick={() => onSearchBook()}> <i class="fas fa-search"></i> Tìm kiếm sách</button>
                        </div>
                        <div className="col-4 button_home borrow">
                            <button onClick={() => handleOpenModal(true)}> <i class="fas fa-book-open"></i> Đăng Ký mượn sách</button>
                        </div>
                        <div className="col-4 button_home return">
                            <button onClick={() => handleOpenModal(false)}> <i class="fas fa-undo"></i> Trả sách</button>
                        </div>
                    </div>
                    <div className="row" id="bookct">
                        <BookCt></BookCt>
                    </div>
                    <div className="row" id="borrowingCt">
                        {<BorrowingCt isCreate={isCreate} isOpen={isModalOpen} 
                        onClose={handleCloseModal} books= {bookLists}></BorrowingCt>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home