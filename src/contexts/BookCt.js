import React, { Component } from 'react'
import axios from 'axios';
import ReactModal from 'react-modal';

const BookCt = () => {
    const path = "http://greenlibrary.somee.com/api/";
    var [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(1);
    const pageSize = 5;
    var formData = {
        page: currentPage,
        pageSize: pageSize,
        loc: searchQuery
    }
    const search = () => {
        loadData(formData)
    }
    const loadData = (data) => {
        axios.post(path + 'Book/Search', data)
            .then((response) => {
                setBooks(response.data.data);
                setCurrentPage(response.data.page)
                setTotalItem(response.data.totalItem)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const openModal = (id) => {
        if (id != null) {
            setBookId(id.bookId)
            setAuthor(id.author)
            setTitle(id.title)
            setPageNumber(id.pageNumber)
            setDescription(id.description)
            setPublisher(id.publisher)
            setStatus(id.status)
            setLanguageId(id.languageId)
            setPositionId(id.positionId)
            setCategoryId(id.categoryId)
            setPrice(id.price)
            setShowModal(true)
        }
        else {
            setShowModal(true)
        }
    };

    return (
        <>
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
            <div className="row">
                <div className="table">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Nhà xuất bản</th>
                                <th>Số trang</th>
                                <th>Giá</th>
                                <th>Category ID</th>
                                <th>Status</th>
                                <th style={{ width: 100 + 'px' }}>Xem chi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    {/* <td>{book.bookId}</td> */}
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.pageNumber}</td>
                                    <td>{book.price}</td>
                                    <td>{book.categoryId}</td>
                                    <td>{book.status ? 'Available' : 'Not Available'}</td>
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
                                    <h6>Tên sách</h6>
                                    <h3></h3>
                                </div>
                                <div className="form-item">
                                    <img src="https://localhost:44366/api/Files?fileName=suy-ngam-dau-tien-vao-buoi-sang1.jpg"></img>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-item">
                                    <h6>Tên sách</h6>
                                    <h3></h3>
                                </div>
                            </div>
                            <div className="col-6"></div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-item">
                                    <label>Tên sách</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Số trang</label>
                                    <input type="number" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Mô tả</label>
                                    <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-item">
                                    <label>Tác giả</label>
                                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Vị trí</label>
                                    <input type="text" value={positionId} onChange={(e) => setPositionId(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Ngôn ngữ</label>
                                    <input type="text" value={languageId} onChange={(e) => setLanguageId(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label>Nhà xuất bản</label>
                                    <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
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
export default BookCt
