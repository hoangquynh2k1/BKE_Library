import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

const Borrowing = () => {
    const path = "https://localhost:44366/api/";
    const [borrowings, setBorrowings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownSearch, setDropdownSearch] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const pageSize = 10;
    var formData = {
        page: currentPage,
        pageSize: pageSize,
        loc: searchQuery,
        dropdown: 1
    }
    const customStyles = {
        content: {
          width: '500px', // Chỉnh kích thước chiều rộng
          height: '300px', // Chỉnh kích thước chiều cao
          margin: 'auto', // Căn giữa theo chiều ngang
        }
      };
    const [showModal, setShowModal] = useState(false);
    const [noticeContent, setNoticeContent] = useState("");
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
        if (type == "email") {
            let content = "<h1>Thông báo sắp đến hạn trả sách</h1>"+
            "<span>2 ngày nữa là ngày trả sách của bạn. Mong bạn trả sách đúng hẹn</span>"
            setNoticeContent(content)
            setShowModal(true)
        }
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
                                        {borrowing.notificationStatus == false ?
                                            <>
                                                <button className="update" title="Gửi email">
                                                    <i className="fas fa-envelope" onClick={() =>
                                                        openModalSendNotice("email",borrowing)}></i>
                                                </button>
                                                <button className="update" title="Gửi tin nhắn">
                                                    <i className="fas fa-bell" onClick={() =>
                                                        openModalSendNotice("sms",borrowing)}></i>
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
                    <h2>Gửi thông báo</h2>
                    {noticeContent}
            </ReactModal>
        </>
    )

}
export default Borrowing