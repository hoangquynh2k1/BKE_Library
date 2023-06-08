import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")
function BookCPN() {
  const path = "https://localhost:44366/api/";
  var [books, setBooks] = useState([]);
  var [positions, setPositions] = useState([]);
  var [languages, setLanguages] = useState([]);
  var [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const pageSize = 5;
  const [showModal, setShowModal] = useState(false);
  const handleInputChange = (event) => { setSearchQuery(event.target.value); };
  const [bookId, setBookId] = useState(0);
  const [title, setTitle] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [status, setStatus] = useState(true);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [positionId, setPositionId] = useState(0);
  const [languageId, setLanguageId] = useState(0);
  const [isCreate, setIsCreate] = useState(false);

  var book = {};
  var formData = {
    page: currentPage,
    pageSize: pageSize,
    loc: searchQuery
  }
  useEffect(() => {
    loadData(formData)
    axios.get(path + 'Position/Get')
      .then((response) => {
        setPositions(response.data)
      })
    axios.get(path + 'Language/Get')
      .then((response) => {
        setLanguages(response.data)
      })
    axios.get(path + 'Category/Get')
      .then((response) => {
        setCategories(response.data)
      })
  }, []);
  const handlePageClick = ({ selected }) => {
    formData.page = selected + 1
    loadData(formData)
  };
  const search = () => {
    // loadData(formData)
  }
  const loadData = (data) => {
    axios.post(path + 'Book/Search', data)
      .then((response) => {
        console.log(response.data.data);
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
      setIsCreate(false)
      setShowModal(true)
    }
    else {
      setBookId(0)
      setAuthor("")
      setTitle("")
      setPageNumber(0)
      setDescription('')
      setPublisher('')
      setStatus(true)
      setLanguageId(0)
      setPositionId(0)
      setCategoryId(0)
      setPrice(0)
      setIsCreate(true)
      setShowModal(true)
    }
  };
  const handSave = () => {
    book = {
      bookId: bookId,
      title: title,
      author: author,
      pageNumber: pageNumber,
      description: description,
      publisher: publisher,
      categoryId: categoryId,
      languageId: languageId,
      positionId: positionId,
      categoryId: categoryId,
      price: price,
      status: status,
    }
    if (isCreate) {
      axios.post(path + 'Book/Post/', book)
        .then(response => {
          if (response) {
            alert("Thêm thành công!")
            loadData(formData)
            setShowModal(false)
          }
        })
        .catch(error => {
          console.log(error);
        });

    }
    else {
      axios.put(path + 'Book/Put/' + bookId, book)
        .then(response => {
          if (response) {
            const updatedItems = books.map(i => {
              if (i.bookId === book.bookId) {
                i = book;
              }
              return i;
            });
            setBooks(updatedItems);
            alert("Sửa thành công!")
            setShowModal(false)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  const showCategoryName = (id) => {
    for(let i =0; i < categories.length; i++)
    {
      if(categories[i].categoryId == id)
        return categories[i].name
    }
  }
  return (
    <>
      <h2 className="title">Quản lý sách</h2>
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
                <th>Title</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Nhà xuất bản</th>
                <th>Số trang</th>
                <th>Giá</th>
                <th>Loại sách</th>
                <th>Status</th>
                <th style={{ width: 100 + 'px' }}>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.pageNumber}</td>
                  <td>{book.price}</td>
                  {/* <td>{book.categoryName}</td> */}
                  <td>{showCategoryName(book.categoryId)}</td>
                  <td>{book.status ? 'Available' : 'Not Available'}</td>
                  <td>
                    <button className="update"><i className="fas fa-edit" onClick={() => openModal(book)}></i></button>
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
                  <label>Tên sách</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Thể loại</label>
                  <select className="" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value={0}></option>
                    {categories.map((category) => (
                      <option value={category.categoryId}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-item">
                  <label>Mô tả</label>
                  <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Số trang</label>
                  <input type="number" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-item">
                  <label>Tác giả</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-item">
                  <label>Vị trí</label>
                  <select className="" value={positionId} onChange={(e) => setPositionId(e.target.value)}>
                  <option value={0}></option>
                    {positions.map((position) => (
                      <option value={position.positionId}>Kệ thứ {position.shelf} tầng thứ {position.floor}</option>
                    ))}
                  </select>
                </div>
                <div className="form-item">
                  <label>Ngôn ngữ</label>
                  <select className="" value={languageId} onChange={(e) => setLanguageId(e.target.value)}>
                  <option value={0}></option>
                    {languages.map((language) => (
                      <option value={language.languageId}>{language.name} </option>
                    ))}
                  </select>
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
  );
}

export default BookCPN;