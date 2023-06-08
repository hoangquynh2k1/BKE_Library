import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")

function BorrowerCPN() {
    const path = "http://greenlibrary.somee.com/api/";
    const [borrowers, setBorrowers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const pageSize = 5;
    const formatDay = (day) => {
        let d = new Date(day);
        let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
        let MM = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)
        return d.getFullYear() + "-" + MM + "-" + dd;
    }
    const [borrowerId, setBorrowerId] = useState(0);
    const [accountBalance, setAccountBalance] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [startDay, setStartDay] = useState("");
    const [gender, setGender] = useState(true);
    const [status, setStatus] = useState(true);
    const [showModal, setShowModal] = useState(false);
    var formData = {
        page: currentPage,
        pageSize: pageSize,
        loc: searchQuery
    }
    var borrower = {}
    const loadData = (data) => {
        axios.post(path + 'Borrower/Search', data)
            .then((response) => {
                setBorrowers(response.data.data);
                setCurrentPage(response.data.page)
                setTotalItem(response.data.totalItem)

            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => { loadData(formData) }, []);
    const handlePageClick = ({ selected }) => {
        formData.page = selected + 1
        loadData(formData)
    };
    const openModal = (item) => {
        if (item != null) {
            setBorrowerId(item.borrowerId)
            setName(item.name)
            setEmail(item.email)
            setPhone(item.phone)
            setAddress(item.address)
            setStartDay(formatDay(item.startDay))
            setGender(item.gender)
            setAccountBalance(item.accountBalance)
            setStatus(item.status)
            setShowModal(true)
        }
        else {
            setBorrowerId(0)
            setName("")
            setEmail("")
            setPhone("")
            setAddress("")
            setStartDay(formatDay(Date.now()))
            setGender(true)
            setAccountBalance(0)
            setStatus(true)
            setShowModal(true)
        }
    };
    const handSave = () => {
        borrower = {
            borrowerId: borrowerId,
            name: name,
            email: email,
            phone: phone,
            address: address,
            startDay: startDay,
            gender: gender,
            accountBalance: accountBalance,
            status: status,
        }
        if (borrower.borrowerId != 0) {
            axios.put(path + 'Borrower/Put/' + borrowerId, borrower)
                .then(response => {
                    if (response) {
                        const updatedItems = borrowers.map(i => {
                            if (i.borrowerId === borrower.borrowerId) { i = borrower; }
                            return i;
                        });
                        setBorrowers(updatedItems);
                        alert("Cập nhật thông tin thành công!");
                        setShowModal(false)
                    }
                    else
                        alert("Có lỗi xảy ra, vui lòng thử lại sau.")
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            axios.post(path + 'Borrower/Post', borrower)
                .then(response => {
                    if (response) {
                        const updatedItems = borrowers.push(borrower)
                        alert("Thêm thông tin thành công!")
                        loadData(formData)
                        setShowModal(false)
                    }
                    else
                        alert("Có lỗi xảy ra, vui lòng thử lại sau.")
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    return (
        <>
            <h2 className="title">Quản Lý Độc Giả</h2>
            <div className="search-form row">
                <div className="form-value col-6">
                    <label>Họ Tên</label>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="form-value col-6">
                    <label>Email</label>
                    <input type="text" value={searchQuery} />
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
                                <th style={{ width: 180 + 'px' }}>Tác vụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowers.map((borrower, index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{borrower.name}</td>
                                    <td>{borrower.gender ? 'Nam' : 'Nữ'}</td>
                                    <td>{borrower.email}</td>
                                    <td>{borrower.startDay}</td>
                                    <td>{borrower.accountBalance}</td>
                                    <td>
                                        <button className="update"><i className="fas fa-edit" onClick={() =>
                                            openModal(borrower)}></i></button>
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
                            <div className="col-4">
                                <div className="form-item">
                                    <label>Họ Tên</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Giới Tính</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="true">Nam</option>
                                        <option value="false">Nữ</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <label>Địa Chỉ</label>
                                    <textarea type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-item">
                                    <label>Số Điện Thoại</label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Ngày Đăng Ký</label>
                                    <input type="date" value={startDay} onChange={(e) => setStartDay(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Số Dư</label>
                                    <input type="text" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Trạng thái</label>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="true">Hoạt động</option>
                                        <option value="false">Không hoạt động</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-item">
                                    <label>Email</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
export default BorrowerCPN
