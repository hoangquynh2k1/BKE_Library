import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")

function CategoryCPN() {
  const path = "https://localhost:44366/api/";
  var [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [name, setName] = useState('');
  const [status, setStatus] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const pageSize = 5;
  const [showModal, setShowModal] = useState(false);
  var category = {}
  var formData = {
    page: currentPage,
    pageSize: pageSize,
    loc: searchQuery
  }
  const loadData = (data) => {
    axios.post(path + 'Category/Search', data)
      .then((response) => {
        setCategorys(response.data.data);
        setCurrentPage(response.data.page)
        setTotalItem(response.data.totalItem)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => { loadData(formData) }, []);
  const search = () =>{}
  const handlePageClick = ({ selected }) => {
    formData.page = selected + 1
    loadData(formData)
  };
  const openModal = (item) => {
    if (item != null) {
      setCategoryId(item.borrowerId)
      setName(item.accountBalance)
      setStatus(item.status)
      setShowModal(true)
    }
    else {
      setShowModal(true)
    }
  };
  const handSave = () => {
    category = {
      categoryId: categoryId,
      name: name,
      status: status,
    }
    axios.put(path + 'Book/Put/' + categoryId, category)
      .then(response => {
        if (response) {
          const updatedItems = categorys.map(i => {
            if (i.categoryId === category.categoryId) {
              i = category;
            }
            return i;
          });
          setCategorys(updatedItems);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <>
      <h2 className="title">Quản lý loại sách</h2>
      <div className="search-form row">
        <div className="form-value col-6">
          <label>Tên sách</label>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="form-value col-6">
          <label>Tên sách</label>
          <input type="text" value={searchQuery} />
        </div>
        <div className="button-form col-12">
          <button className="button-search" onClick={search()}>Tìm kiếm</button>
        </div>
      </div>
      <button className="add" onClick={() => openModal(null)}>Thêm</button>
      <div className="row">
        <div className="table">
          <table className="">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Loại</th>
                <th>Trạng Thái</th>
                <th style={{ width: 100 + 'px' }}>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((category, index) => (
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.status ? 'Available' : 'Not Available'}</td>
                  <td>
                    <button className="update"><i className="fas fa-edit" onClick={() => openModal(category)}></i></button>
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
                  <label>Tên Loại</label>
                  <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Mô tả</label>
                  <textarea type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="col-6">
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
export default CategoryCPN
