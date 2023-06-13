import React, { Component, useState, useEffect } from 'react'
import Pagination from "../components/Pagination";
import axios from 'axios';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")
function BookCPN() {
  const path = "http://greenlibrary.somee.com/api/";
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
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(true);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [positionId, setPositionId] = useState(0);
  const [languageId, setLanguageId] = useState(0);
  const [isCreate, setIsCreate] = useState(false);
  const [imageFile, SetImageFile] = useState(new FormData());
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
      setBookId(id.bookId); setAuthor(id.author); setTitle(id.title); setPageNumber(id.pageNumber); setDescription(id.description); setPublisher(id.publisher); setStatus(id.status); setLanguageId(id.languageId);
      setPositionId(id.positionId); setCategoryId(id.categoryId); setPrice(id.price); setIsCreate(false); setShowModal(true)
    }
    else {
      setBookId(0); setAuthor(""); setTitle(""); setPageNumber(0); setDescription('');
      setPublisher(''); setStatus(true); setLanguageId(0); setPositionId(0);
      setCategoryId(0); setPrice(0); setIsCreate(true); setShowModal(true)
    }
  };
  const handSave = () => {
    if (isCreate) {
      axios.post(path + 'Files', imageFile)
        .then((response) => {
          console.log(response.data);
          var image = { bookId: bookId, path: response.data, status: true }
          const newImages = []
          newImages.push(image)
          setImages(newImages)
        })
        .catch((error) => {
          console.log(error);
        });
      book = {
        bookId: bookId, title: title, author: author, pageNumber: pageNumber, description: description,
        publisher: publisher, categoryId: categoryId, languageId: languageId, positionId: positionId, images: images,
        categoryId: categoryId, price: price, status: status,
      }
      axios.post(path + 'Book/Post/', book)
        .then(response => {
          if (response) {
            alert("Thêm thành công!")
            loadData(formData)
            setShowModal(false)
          }
        })
        .catch(error => { console.log(error); });
    }
    else {
      book = {
        bookId: bookId, title: title, author: author, pageNumber: pageNumber, description: description,
        publisher: publisher, categoryId: categoryId, languageId: languageId, positionId: positionId, images: images,
        categoryId: categoryId, price: price, status: status,
      }
      axios.put(path + 'Book/Put/' + bookId, book)
        .then(response => {
          if (response) {
            const updatedItems = books.map(i => {
              if (i.bookId === book.bookId) { i = book; }
              return i;
            });
            setBooks(updatedItems);
            alert("Sửa thành công!")
            setShowModal(false)
          }
        })
        .catch(error => { console.log(error); });
    }
  }
  const onDelete = (id) => {
    var result = window.confirm("Bạn có muốn xóa loại sách này không?");
    if (result) {
      axios.delete(path + 'Book/Delete/' + id)
        .then((response) => {
          if(response)
          alert("Xóa thành công!")
        })
    }
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('formFile', file)
    SetImageFile(data)
  };

  const showCategoryName = (id) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].categoryId == id)
        return categories[i].name
    }
  }
  const onSetPath = (book) => {
    var images = []
    images = book.images
    if (Object.keys(book).length !== 0) {
      console.log(book.images.length);
      if (book.images.length > 0)
        return "http://greenlibrary.somee.com/api/Files?fileName=" + book.images[0].path
    }
    return ""
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
                <th style={{ width: 100 + 'px' }}>Ảnh bìa</th>
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
                  <td>{showCategoryName(book.categoryId)}</td>
                  <td><img className="img_small" src={onSetPath(book)} /></td>
                  <td>
                    <button className="update"><i className="fas fa-edit" onClick={() => openModal(book)}></i></button>
                    <button className="delete"><i className="fas fa-trash" onClick={() => onDelete(book.bookId)}></i></button>
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
                  <label>Ảnh bìa</label>
                  <input type="file" onChange={handleImageUpload} />
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