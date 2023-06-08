import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import ReactModal from 'react-modal';

const BorrowingCt = ({ isCreate, isOpen, onClose, books }) => {
    const path = "https://localhost:44366/api/";
    const [borrowingId, setBorrowingId] = useState(0);
    const [borrowerId, setBorrowerId] = useState(0);
    const [staffId, setStaffId] = useState(0);
    const [borrowedDate, setBorrowedDate] = useState(Date.now);
    const [appointmentDate, setAppointmentDate] = useState(Date.now);
    const [status, setStatus] = useState(true);
    const [details, setDetails] = useState([]);
    const [name, setName] = useState('');
    const [borrowingDetailId, setBorrowingDetailId] = useState(0);
    const [copyId, setCopyId] = useState(0);
    const [bookId, setBookId] = useState(0);
    const [durability, setDurability] = useState(0.0);
    const [description, setDescription] = useState('');
    const [bookName, setBookName] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [borrowStatus, setBorrowStatus] = useState(0);
    var borrowing = {}
    var borrowingDetail = {}
    const resetCopyDetail = () => {
        setBorrowingDetailId(0)
        setCopyId(0)
        setDurability(0)
        setDescription("")
        setReturnDate("")
        setBorrowStatus(0)
        setBookName("")
    }
    const resetBorrowBook = () => {
        setBorrowingId(0)
        setBorrowerId(0)
        setName("")
        setBorrowedDate(Date.now)
        setBorrowingDetailId("")
        setAppointmentDate(Date.now)
        setBorrowingId(0)
        setBorrowingDetailId(0)
        setCopyId(0)
        setDurability(0)
        setDescription("")
        setReturnDate("")
        setBorrowStatus(0)
        setDetails([])
        setBorrowStatus(0)
        setStatus(true)
    }
    const formatDay = (day) => {
        const date = new Date(day);
        return date.toISOString().substr(0, 10);
    }
    const openCopyModal = (item) => {
        if (item) {
            setBorrowingDetailId(item.borrowingDetailId)
            setCopyId(item.copyId)
            setDurability(item.durability)
            setDescription(item.description)
            setReturnDate(item.returnDate)
            setBorrowStatus(item.borrowStatus)
        }
        else {
            resetBorrowBook()
        }
    }
    const onCheckBorrower = () => {
        if (isCreate == true) {
            axios.get(path + 'Borrowing/Get/' + borrowerId)
                .then((response) => {
                    if (response.data) {
                        if (response.data.borrowStatus == false)
                            alert("Bạn vẫn đang mượn sách. Vui lòng trả sách để có thể tiếp tục mượn thêm!")
                        else {
                            setName(response.data.name)
                        }
                    }
                    else {
                        axios.get(path + 'Borrower/Get/' + borrowerId)
                            .then((response) => {
                                setName(response.data.name)
                            })
                    }

                })
        }
        else {
            axios.get(path + 'Borrowing/Get/' + borrowerId)
                .then((response) => {
                    setBorrowingId(response.data.borrowingId)
                    setName(response.data.name)
                    setBorrowerId(response.data.borrowerId)
                    setStatus(response.data.status)
                })
        }
    }

    const onCheckCopy = () => {
        if (isCreate) {
            axios.get(path + 'Copy/Get/' + copyId).then(response => {
                if (response.data.borrowStatus == 0) {
                    setDurability(response.data.durability)
                    setDescription(response.data.description)
                    setBookId(response.data.bookId)
                    checkBookName(response.data.bookId)
                }
                else {
                    alert("Bản sao này đang được mượn. Vui lòng chọn bản sao khác!")
                }
            })
        }
        else {

        }
    }
    const checkBookName = (bookId) => {
        for (let i = 0; i < books.length; i++) {
            if (books[i].bookId == bookId) {
                setBookName(books[i].title)
            }
        }
        return "";
    }
    const confirmReturn = () => {
        if (isCreate) {
            borrowingDetail = {
                borrowingDetailId: borrowingDetailId,
                borrowingId: borrowingId,
                copyId: copyId,
                durability: durability,
                description: description,
                borrowStatus: 1,
                returnDate: null,
                status: true
            }
            let newDetail = [...details]; // Tạo một bản sao của mảng details
            newDetail.push(borrowingDetail); // Thêm phần tử mới vào mảng newDetail
            setDetails(newDetail); // Cập nhật giá trị của details
            resetCopyDetail()
        }
        else {
            // axios.put(path + 'BorrowingDetail/Put/' + borrowingDetailId, borrowingDetail)
            // .then(response => {
            //     if (response) {
            //         const updatedItems = details.map(i => {
            //             if (i.borrowingDetailId === borrowingDetail.borrowingDetailId) {
            //                 i = borrowingDetail;
            //             }
            //             return i;
            //         });
            //         setDetails(updatedItems);
            //     }
            // })
            // .catch(error => {
            //     console.log(error);
            // });
        }
    }
    const handSave = () => {
        borrowing = {
            borrowerId: borrowerId,
            borrowingId: borrowingId,
            staffId: staffId,
            borrowedDate: borrowedDate,
            appointmentDate: appointmentDate,
            status: status,
        }
        if (isCreate) {
            axios.put(path + 'Borrowing/Post/' + borrowingId, borrowing)
                .then(response => {
                    if (response) {
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            axios.put(path + 'Borrowing/Put/' + borrowingId, borrowing)
                .then(response => {
                    if (response) {
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }
    return (
        <>
            <ReactModal isOpen={isOpen} onRequestClose={onClose}
                contentLabel="Example Modal">
                <div className="rc-modal">
                    <div className="modal-body">
                        {isCreate ? <h2>Mượn sách</h2> : <h2>Trả sách</h2>}
                        <div className="row">
                            <div className="col-4">
                                <div className="form-item check-wrap">
                                    <label>Mã độc giả</label>
                                    <input type="text" value={borrowerId} onChange={(e) => setBorrowerId(e.target.value)} />
                                    <i class="fas fa-check checK-item" onClick={() => onCheckBorrower()}></i>
                                </div>
                                <div className="form-item">
                                    <label>Tên độc giả</label>
                                    <input type="text" disabled value={name} />
                                </div>
                                <div className="form-item">
                                    <label>Ngày mượn</label>
                                    <input type="date" value={formatDay(borrowedDate)}
                                        onChange={(e) => setBorrowedDate(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Ngày hẹn trả</label>
                                    <input type="date" value={formatDay(appointmentDate)} onChange={(e) => setAppointmentDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-item check-wrap">
                                            <label>Mã bản sao</label>
                                            <input type="text" value={copyId} onChange={(e) => setCopyId(e.target.value)} />
                                            <i class="fas fa-check checK-item" onClick={() => onCheckCopy()}></i>
                                        </div>
                                        <div className="form-item check-wrap">
                                            <label>Tên sách</label>
                                            <input type="text" value={bookName} />
                                        </div>
                                        {!isCreate ? <div className="form-item">
                                            <label>Trạng thái</label>
                                            <select value={borrowStatus} onChange={(e) => setBorrowStatus(e.target.value)}>
                                                <option value={1}></option>
                                                <option value={2}>Đã trả</option>
                                                <option value={3}>Làm mất</option>
                                            </select>
                                        </div> : <></>}
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-item">
                                            <label>Độ mới</label>
                                            <input type="number" max="100" value={durability} onChange={(e) => setDurability(e.target.value)} />
                                        </div>
                                        <div className="form-item">
                                            <label>Mô tả</label>
                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        {!isCreate ? <div className="form-item">
                                            <label>Ngày trả</label>
                                            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                                        </div> : <></>}
                                    </div>
                                    <div className='col-4'>

                                    </div>
                                </div>
                                <div>
                                    <button className="btn pending" onClick={() => openCopyModal()}>Làm mới</button>
                                    <button className="btn done" onClick={() => confirmReturn()}>Xác nhận</button>

                                </div>
                                <div className="table table-copy">
                                    <table className="">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '40px', textAlign: 'center' }}>STT</th>
                                                <th style={{ width: 80 + 'px' }}>Tên sách</th>
                                                <th style={{ width: 80 + 'px' }}>Độ mới</th>
                                                <th >Mô tả</th>
                                                <th style={{ width: 180 + 'px' }}>Ngày trả</th>
                                                <th style={{ width: 120 + 'px' }}>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isCreate ?
                                                details.map((detail, index) => (
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        <td>{detail.copyId}</td>
                                                        <td>{detail.durability}</td>
                                                        <td>{detail.description}</td>
                                                        <td>{formatDay(detail.returnDate)}</td>
                                                        <td>
                                                            <button className="btn remove" onClick={() => openCopyModal(detail)}>Xóa</button>
                                                        </td>
                                                    </tr>
                                                )) :
                                                details.map((detail, index) => (
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        <td>{detail.copyId}</td>
                                                        <td>{detail.durability}</td>
                                                        <td>{detail.description}</td>
                                                        <td>{formatDay(detail.returnDate)}</td>
                                                        {detail.borrowStatus === 1 ?
                                                            <>
                                                                <td ><button className="info-text pending">Đang mượn</button></td>
                                                                <td>
                                                                    <button className="btn pending" onClick={() => openCopyModal(detail)}>Trả sách</button>
                                                                </td>
                                                            </>
                                                            :
                                                            <>
                                                                <td><button className="info-text done">Đã trả</button></td>
                                                                <td>
                                                                </td>
                                                            </>
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {!isCreate ? <button className="btn done">Trả toàn bộ sách</button> : <></>}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="cancel" onClick={onClose}>Hủy</button>
                        <button className="submit" onClick={onClose}>Xác nhận</button>
                    </div>
                </div>
            </ReactModal>

        </>
    )
}
export default BorrowingCt