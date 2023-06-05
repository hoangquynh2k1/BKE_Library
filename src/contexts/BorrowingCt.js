import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

const BorrowingCt = (isCreat) => {
    const path = "https://localhost:44366/api/";
    const [showModal, setShowModal] = useState(false);
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
    const [durability, setDurability] = useState(0.0);
    const [description, setDescription] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [borrowStatus, setBorrowStatus] = useState(0);
    var borrowing = {}
    var borrowingDetail = {}
    const openModal = (item) => {
        if (item != null) {
          isCreat = false
          setBorrowingId(item.borrowingId)
          setBorrowerId(item.borrowerId)
          setStaffId(item.staffId)
          setBorrowedDate(item.borrowedDate)
          setAppointmentDate(item.appointmentDate)
          setStatus(item.status)
          setDetails(item.details)
          setName(item.name)
          resetBorrowBook()
          setShowModal(true)
        }
        else {
          isCreat = true
          setBorrowingId(0)
          setBorrowerId(0)
          setStaffId(0)
          setBorrowedDate("")
          setAppointmentDate("")
          setStatus(true)
          setDetails([])
          setName("")
          resetBorrowBook()
          setShowModal(true)
        }
      };
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
    return (
        <>
            <ReactModal isOpen={showModal} onRequestClose={() => setShowModal(false)}
                contentLabel="Example Modal">
                <div className="rc-modal">
                    <div className="modal-body">
                        <h2>Thông tin</h2>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-item check-wrap">
                                    <label>Mã độc giả</label>
                                    {isCreat ?
                                        <input type="text" disabled value={borrowerId} onChange={(e) => setBorrowerId(e.target.value)} /> :
                                        <>
                                            <input type="text" value={borrowerId} onChange={(e) => setBorrowerId(e.target.value)} />
                                            <i class="fas fa-check checK-item"></i>
                                        </>}
                                </div>
                                <div className="form-item">
                                    <label>Tên độc giả</label>
                                    <input type="text" disabled value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Ngày mượn</label>
                                    {borrowerId > 0 ?
                                        <input type="text" disabled value={borrowedDate} onChange={(e) => setBorrowedDate(e.target.value)} />
                                        :
                                        <>
                                            <input type="text" value={borrowedDate} onChange={(e) => setBorrowedDate(e.target.value)} />
                                        </>}
                                </div>
                                <div className="form-item">
                                    <label>Ngày hẹn trả</label>
                                    <input type="text" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Trạng thái</label>
                                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-item check-wrap">
                                            <label>Mã quyển</label>
                                            {isCreat ?
                                                <input type="text" disabled value={copyId} onChange={(e) => setCopyId(e.target.value)} /> :
                                                <>
                                                    <input type="text" value={copyId} onChange={(e) => setCopyId(e.target.value)} />
                                                    <i class="fas fa-check checK-item"></i>
                                                </>}
                                        </div>
                                        <div className="form-item">
                                            <label>Trạng thái</label>
                                            <select value={borrowStatus} onChange={(e) => setBorrowStatus(e.target.value)}>
                                                <option value={1}></option>
                                                <option value={2}>Đã trả</option>
                                                <option value={3}>Làm mất</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-item">
                                            <label>Độ mới</label>
                                            <input type="number" max="100" value={durability} onChange={(e) => setDurability(e.target.value)} />
                                        </div>
                                        {copyId > 0 ? <div className="form-item">
                                            <label>Ngày trả</label>
                                            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                                        </div> : <></>}

                                    </div>
                                    <div className='col-4'>
                                        <div className="form-item">
                                            <label>Mô tả</label>
                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
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
                                                <th style={{ width: 80 + 'px' }}>Bản sao</th>
                                                <th style={{ width: 80 + 'px' }}>Độ mới</th>
                                                <th >Mô tả</th>
                                                <th style={{ width: 180 + 'px' }}>Ngày trả</th>
                                                <th style={{ width: 160 + 'px' }}>Tình trạng mượn</th>
                                                <th style={{ width: 120 + 'px' }}>Tác vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details.map((detail, index) => (
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
                                                                {/* <button className="btn pending" ></button> */}
                                                            </td>
                                                        </>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {borrowerId > 0 ? <button className="btn done">Trả toàn bộ sách</button> : <></>}
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
export default BorrowingCt