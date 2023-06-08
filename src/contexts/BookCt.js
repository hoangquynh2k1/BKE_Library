import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import ReactModal from 'react-modal';
import Pagination from "../components/Pagination";

const BookCt = () => {
    // const path = "http://greenlibrary.somee.com/api/";
    const path = "https://localhost:44366/api/";
    var [books, setBooks] = useState([]);
    var [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const pageSize = 5;
    var formData = {
        page: currentPage,
        pageSize: pageSize,
        loc: searchQuery,
        categoryId: category
    }
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
    const loadData = (data) => {
        axios.post(path + 'Book/Search', data)
            .then((response) => {
                setBooks(response.data.data);
                setCurrentPage(response.data.page)
                setTotalItem(response.data.totalItem)
                console.log(books);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handlePageClick = ({ selected }) => {
        formData.page = selected + 1
        loadData(formData)
    };
    const openModal = (book) => {
        console.log(book);
        setBook(book)
        if (book != null) {
            setBookId(book.bookId)
            setAuthor(book.author)
            setTitle(book.title)
            // setPageNumber(book.pageNumber)
            // setDescription(book.description)
            setPublisher(book.publisher)
            setStatus(book.status)
            setLanguageId(book.languageId)
            setPositionId(book.positionId)
            setCategoryId(book.categorybook)
            setPrice(book.price)
            setShowModal(true)
        }
        else {
            setShowModal(true)
        }
    };
    const onChangeCategory = (e) => {
        setCategory(e)
    }
    const onSetPath = (book) => {
        // if(book.images != undefined)
        //     if(book.images[0].path != undefined)
        //         return "https://localhost:44366/api/Files?fileName=" + book.images[0].path
        return ""
    }
    useEffect(() => {
        axios.get(path + 'Category/Get')
            .then((response) => {
                setCategories(response.data)
            })
    }, []);

    return (
        <>
            <div className="search-form row">
                <div className="form-value col-6">
                    <label>Loại sách</label>
                    <select className="dropdowm_category" onChange={(e) => onChangeCategory(e.target.value)}>
                        <option value={0}></option>
                        {categories.map((category) => (
                            <option value={category.categoryId}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-value col-6">
                    <label>Tên sách</label>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                {/* <div className="form-value col-6">
                    <label>Nhà xuất bản</label>
                    <select className="dropdown_search" onChange={(e) => onChangeCategory(e.target.value)}>
                        <option value={0}></option>
                        <option value={1}>Đang mượn</option>
                        <option value={2}>Đã trả</option>
                        <option value={3}>Available</option>
                        <option value={4}>Unavailable</option>
                    </select>
                </div> */}
                <div className="button-form col-12">
                    <button className="button-search" onClick={() => search()}>Tìm kiếm</button>
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
                            {books.map((book, index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>
                                        <img className="img_small" src={onSetPath(book)} />
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.pageNumber}</td>
                                    <td>{book.categoryName}</td>
                                    <td>
                                        <button className="update"><i className="fas fa-eye" onClick={() => openModal(book)}></i></button>
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
                            <div className="col-3">
                                <div className="form-item">
                                    <h3>Tên sách</h3>
                                    <h3>{book.title}</h3>
                                </div>
                                <div className="form-item">
                                    <img src={onSetPath(book)}></img>
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
                                    {/* <p>Kệ thứ {book.position.shelf} tầng thứ {book.position.floor}</p> */}
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
