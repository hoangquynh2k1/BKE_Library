import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")

function BorrowingCPN() {
  const path = "https://localhost:44366/api/";
  const [borrowings, setBorrowings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const pageSize = 5;
  var formData = {
    page: currentPage,
    pageSize: pageSize,
    loc: searchQuery
  }
  const [showModal, setShowModal] = useState(false);
  const [borrowingId, setBorrowingId] = useState(0);
  const [borrowerId, setBorrowerId] = useState(0);
  const [staffId, setStaffId] = useState(0);
  const [borrowedDate, setBorrowedDate] = useState(Date.now);
  const [appointmentDate, setAppointmentDate] = useState(Date.now);
  const [status, setStatus] = useState(true);
  var borrowing = {}

  const loadData = (data) => {
    axios.post(path + 'Borrower/Search', data)
      .then((response) => {
        setBorrowings(response.data.data);
        setCurrentPage(response.data.page)
        setTotalItem(response.data.totalItem)
      })
      .catch((error) => { console.log(error); });
  }

  useEffect(() => { loadData(formData) }, []);

  const handlePageClick = ({ selected }) => {
    formData.page = selected + 1;
    loadData(formData)
  };

  const openModal = (item) => {
    if (item != null) {
      setBorrowingId(item.borrowingId)
      setBorrowerId(item.borrowerId)
      setStaffId(item.staffId)
      setBorrowedDate(item.borrowedDate)
      setAppointmentDate(item.appointmentDate)
      setStatus(item.status)
      setShowModal(true)
    }
    else {
      setShowModal(true)
    }
  };

  const handSave = () => {
    borrowing = {
      borrowerId: borrowerId,
      borrowingId: borrowingId,
      staffId: staffId,
      borrowedDate: borrowedDate,
      appointmentDate: appointmentDate,
      status: status,
    }
    axios.put(path + 'Book/Put/' + borrowingId, borrowing)
      .then(response => {
        if (response) {
          const updatedItems = borrowings.map(i => {
            if (i.borrowingId === borrowing.borrowingId) {
              i = borrowing;
            }
            return i;
          });
          setBorrowings(updatedItems);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <h2 className="title">Quản Lý Mượn Sách</h2>
      <div className="search-form row">
        <div className="form-value col-6">
          <label>Họ Tên</label>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="form-value col-6">
          <label>Email</label>
          <input type="date" value={searchQuery} />
        </div>
        <div className="button-form col-12">
          <button className="button-search">Tìm kiếm</button>
        </div>
      </div>
      <button className="add" onClick={() => openModal(null)}>Thêm</button>
      <div className="row">
        <div className="table">
          <table className="">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ Tên</th>
                <th>Giới Tính</th>
                <th>Email</th>
                <th>Ngày Đăng Ký</th>
                <th>Số Dư Tài Khoản</th>
                <th>Trạng Thái</th>
                <th style={{ width: 100 + 'px' }}>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map((borrowing, index) => (
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td>{borrowing.name}</td>
                  <td>{borrowing.gender ? 'Nam' : 'Nữ'}</td>
                  <td>{borrowing.email}</td>
                  <td>{borrowing.startDay}</td>
                  <td>{borrowing.accountBalance}</td>
                  <td>{borrowing.status ? 'Available' : 'Not Available'}</td>
                  <td>
                    <button className="update"><i className="fas fa-edit" onClick={() =>
                      openModal(borrowing)}></i></button>
                    <button className="delete"><i className="fas fa-trash"></i></button>
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
      <ReactModal isOpen={showModal} onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal">
        <div className="rc-modal">
          <div className="modal-body">
            <h2>Thông tin</h2>
            <div className="row">
              <div className="col-6">
                <div className="form-item">
                  <label>Ngườn mượn</label>
                  <input type="text" value={borrowingId} onChange={(e) => setBorrowerId(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Nhân viên</label>
                  <input type="number" value={staffId} onChange={(e) => setStaffId(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Ngày mượn</label>
                  <textarea type="text" value={borrowedDate} onChange={(e) => setBorrowedDate(e.target.value)} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-item">
                  <label>Ngày hẹn trả</label>
                  <input type="text" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Trạng thái</label>
                  <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="cancel" onClick={() => setShowModal(false)}>Hủy</button>
            <button className="submit" onClick={() => handSave()}>Xác nhận</button>
          </div>
        </div>
      </ReactModal>
    </>
  )
}
export default BorrowingCPN