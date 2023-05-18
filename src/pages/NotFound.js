function NotFound() {
    return (
        NotFound
    )
}
export default NotFound

// export class Bookcpn extends Component {
//   api = new apilib()
//   loadData() {
//     this.api.Get("Book/Get").then((data) => {
//       this.listBooks = data;
//       return data
//     });
//   }
//   render() {

//     return (
//       <this.TableBook props={this.loadData()}/>
//     )
//   }
//   TableBook({ list }) {
//     <div className="content">
// <h2 className="title">Giảng viên</h2>
// <button className="add">Thêm</button>
// <div className="row">
//         <table className="table-teacher">
//           <tbody>
//             <tr>
//               <th>STT</th>
//               <th>Họ Tên</th>
//               <th>Giới tính</th>
//               <th>SDT</th>
//               <th>Email</th>
//               <th>Môn giảng dạy</th>
//               <th>Tác vụ</th>
//             </tr>
//             <this.Book props={this.loadData()} />
//             {list.map(book => (
//               <this.Book props={book} />

//             ))}
//             <tr>
//               <td>1</td>
//               <td>Doãn Thị Lương</td>
//               <td>Nữ</td>
//               <td>0987654321</td>
//               <td>doanluong123@gmail.com</td>
//               <td>Toán</td>
//               <td>
//                 <button className="update"><i className="fas fa-edit"></i></button>
//                 <button className="delete"><i className="fas fa-trash"></i></button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
// <div className="page">
//   <a href="">&lt;</a>
//   <a href="" className="active">1</a>
//   <a href="">2</a>
//   <a href="">3</a>
//   <a href="">4</a>
//   <a href="">5</a>
//   <a href="">6</a>
//   <a href="">&gt;</a>
// </div>
//       </div>
//     </div>
//   }
//   Book(book) {
//     return (
//       <tr>
//         <td>1</td>
//         <td></td>
//         <td>1</td>
//         <td>{book.Title}</td>
//         <td>Nữ</td>
//         <td>0987654321</td>
//         <td>doanluong123@gmail.com</td>
//         <td>Toán</td>
//         <td>
//           <button className="update"><i className="fas fa-edit"></i></button>
//           <button className="delete"><i className="fas fa-trash"></i></button>
//         </td>
//       </tr >
//     );
//   }
// }

// export default Bookcpn

// function handleSearch(keyword, books) {
//   // Nếu từ khóa là chuỗi rỗng hoặc không có sách, trả về mảng rỗng
//   if (!keyword) return books;
//   // Chuyển đổi từ khóa sang chữ thường để so sánh dễ dàng hơn
//   keyword = keyword.toLowerCase();
//   // Lọc các cuốn sách phù hợp với từ khóa
//   const filteredBooks = books.filter((book) => {
//     // const { title, author } = book;
//     return book.title.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword);
//   });
//   return filteredBooks;
// }

/*123 */
