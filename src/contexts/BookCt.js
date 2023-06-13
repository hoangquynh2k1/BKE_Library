import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import ReactModal from 'react-modal';
import Pagination from "../components/Pagination";

const BookCt = () => {
    const path = "http://greenlibrary.somee.com/api/";
    // const path = "https://localhost:44366/api/";
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const pageSize = 5;
    const [bookId, setBookId] = useState(0);
    const [book, setBook] = useState(new Object);
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState(true);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [positionId, setPositionId] = useState(0);
    const [languageId, setLanguageId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const search = () => {
        loadData(formData)
    }
    var formData = { page: currentPage, pageSize: pageSize, loc: searchQuery, categoryId: category }
    useEffect(() => {
        loadData(formData)
        axios.get(path + 'Category/Get')
            .then((response) => {
                setCategories(response.data)
            })
    }, []);
    const loadData = (data) => {
        axios.post(path + 'Book/Search', data)
            .then((response) => {
                setBooks(response.data.data);
                console.log(response.data.data);
                setCurrentPage(response.data.page);
                setTotalItem(response.data.totalItem);
            })
            .catch((error) => { console.log(error); });
    }
    const handlePageClick = ({ selected }) => {
        formData.page = selected + 1
        loadData(formData)
    };
    const openModal = (book) => {
        setBook(book)
        setShowModal(true)
    };
    const onChangeCategory = (e) => {
        setCategory(e)
    }
    const onSetPath = (book) => {
        var images = []
        images = book.images
        if (Object.keys(book).length !== 0) {
            if (book.images.length > 0)
                return "http://greenlibrary.somee.com/api/Files?fileName=" + book.images[0].path
        }
        return ""
    }

    return (
        <>
            <div className="search-form row">
                <div className="form-value col-6">
                    <label>Loại sách</label>
                    <select className="dropdowm_category" onChange={(e) => onChangeCategory(e.target.value)}>
                        <option value={0}></option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.categoryId}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-value col-6">
                    <label>Tên sách</label>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="button-form col-12">
                    <button className="btn" onClick={() => search()}>Tìm kiếm</button>
                </div>
            </div>
            <div className="row">
                <div className="table">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Stt</th>
                                <th>Hình ảnh</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Nhà xuất bản</th>
                                <th>Số trang</th>
                                <th style={{ width: 160 + 'px' }}>Thể loại</th>
                                <th style={{ width: 100 + 'px' }}>Xem chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img className="img_small" src={onSetPath(book)} /></td>
                                        <td>{book?.title}</td>
                                        <td>{book?.author}</td>
                                        <td>{book?.publisher}</td>
                                        <td>{book?.pageNumber}</td>
                                        <td>{book?.categoryName}</td>
                                        <td>
                                            <button className="update">
                                                <i className="fas fa-eye" onClick={() => openModal(book)}></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
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
                            <div className="col-3">
                                <div className="form-item">
                                    <h3>Tên sách</h3>
                                    <h3>{book.title}</h3>
                                </div>
                                <div className="form-item">
                                    <img className="big-img" src={onSetPath(book)}></img>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-item">
                                    <h3>Mô tả</h3>
                                    <p>{book.description}</p>
                                </div>
                                <div className="form-item">
                                    <h3>Tác giả</h3>
                                    <p>{book.author}</p>
                                </div>
                                <div className="form-item">
                                    <h3>Số trang</h3>
                                    <p>{book.pageNumber}</p>
                                </div>
                                <div className="form-item">
                                    <h3>Số trang</h3>
                                    <h3>{book.language}</h3>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-item">
                                    <h3>Mô tả</h3>
                                    <p>{book.description}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-item">
                                    <h3>Vị trí</h3>
                                    {Object.keys(book).length !== 0 &&<p>Kệ thứ { book.position.shelf} tầng thứ {book.position.floor}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="cancel" onClick={() => setShowModal(false)}>Trở về</button>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}
export default BookCt
