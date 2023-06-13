import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

const Borrowing = () => {
    const path = "http://greenlibrary.somee.com/api/";
    // const path = "https://localhost:44366/api/";
    const [borrowings, setBorrowings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const pageSize = 5;
    const[details, setDetails]  = useState({})
    var formData = {
        page: currentPage,
        pageSize: pageSize,
        dropdown: 1
    }
    const [showModal, setShowModal] = useState(false);
    const [noticeContent, setNoticeContent] = useState("");
    const customStyles = {
        content: {
            width: '500px', // Chỉnh kích thước chiều rộng
            height: '300px', // Chỉnh kích thước chiều cao
            margin: 'auto', // Căn giữa theo chiều ngang
            'min-height': '400px'
        }
    };
    useEffect(() => {
        axios.post(path + 'Borrowing/CheckOverdue', formData)
            .then((response) => {
                setBorrowings(response.data.data);
                setCurrentPage(response.data.page)
                setTotalItem(response.data.totalItem)
            })
            .catch((error) => { console.log(error); });
    }, []);
    const sendEmail = (a) => {

    }
    const loadData = (data) => {
        axios.post(path + 'Borrowing/CheckOverdue', data)
            .then((response) => {
                setBorrowings(response.data.data);
                setCurrentPage(response.data.page)
                setTotalItem(response.data.totalItem)

            })
            .catch((error) => { console.log(error); });
    }
    const openModalSendNotice = (type, item) => {
        setDetails(item)
        console.log(details);
        if (type == "email") {
            setShowModal(true)
        }
        else {

            setShowModal(true)
        }
    }
    const submit = () => {
        axios.post(path + 'Borrowing/SendEmail/', details)
                .then(response => {
                    if(response.data)
                    {
                        const updatedItems = borrowings.map(i => {
                            if (i.borrowingId === details.borrowingId) {
                                i.notificationStatus = true;
                            }
                            return i;
                        });
                        setBorrowings(updatedItems)
                        alert("Gửi thông báo thành công!")
                        console.log(borrowings);
                        setShowModal(false)
                    }
                })
            setShowModal(true)
    }
    const formatDay = (day) => {
        if (day) {
            let d = new Date(day);
            let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
            let MM = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)
            return d.getFullYear() + "-" + MM + "-" + dd;
        }
    }
    const handlePageClick = ({ selected }) => {
        formData.page = selected + 1;
        loadData(formData)
    };
    const resetBorrowBook = () => {
        setShowModal(false)
    }
    return (
        <>
            <div className="row">
                <div className="table">
                    <table className="">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Độc giả</th>
                                <th>Ngày mượn</th>
                                <th>Ngày hẹn trả</th>
                                <th>Trạng Thái</th>
                                <th style={{ width: 150 + 'px' }}>Tác vụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowings.map((borrowing, index) => (
                                <tr key={index} className="table_row">
                                    <td>{index + 1}</td>
                                    <td>{borrowing.name}</td>
                                    <td>{formatDay(borrowing.borrowedDate)}</td>
                                    <td>{formatDay(borrowing.appointmentDate)}</td>
                                    {borrowing.Overdue == 1 ? <td>Sắp đến hạn</td> : <td>Quá hạn</td>}
                                    <td className="Notice">
                                        {borrowing.notificationStatus == false || borrowing.notificationStatus == null ?
                                            <>
                                                <button className="update" title="Gửi email" onClick={() =>
                                                    openModalSendNotice("email", borrowing)}>
                                                    <i className="fas fa-envelope" ></i>
                                                </button>
                                                <button className="update" title="Gửi tin nhắn">
                                                    <i className="fas fa-bell" onClick={() =>
                                                        openModalSendNotice("sms", borrowing)}></i>
                                                </button>
                                            </> :
                                            <>
                                                <button className="update" disabled>
                                                    <i className="fas fa-envelope"></i>
                                                </button>
                                                <button className="update" disabled>
                                                    <i className="fas fa-bell"></i>
                                                </button>
                                            </>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="page">
                    <Pagination pageCount={Math.ceil(totalItem / pageSize)} currentPage={currentPage}
                        handlePageClick={handlePageClick} />
                </div>
            </div>
            <ReactModal isOpen={showModal} onRequestClose={() => setShowModal(false)} style={customStyles}
                contentLabel="Notice Modal">
                <div className="modal-notice">
                    <h2>Gửi thông báo</h2>
                    <div className="row">
                        <div className="form-item col-6">
                            <label>Họ tên</label>
                            <p>Hoàng Quý Quỳnh</p>
                        </div>
                        <div className="form-item col-6">
                            <label>Email</label>
                            <p>hoangquynh12a3dqh@gmail.com</p>
                        </div>
                        <div className="form-item">
                            <label>Ngày hẹn trả</label>
                            <p>hoangquynh12a3dqh@gmail.com</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="cancel" onClick={resetBorrowBook}>Hủy</button>
                        <button className="submit" onClick={submit}>Xác nhận</button>
                    </div>
                </div>

            </ReactModal>
        </>
    )
}
export default Borrowing