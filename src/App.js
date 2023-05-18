import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Login from "./pages/Login";
import BookCPN from "./pages/BookCPN";
import CategoryCPN from "./pages/CategoryCPN";
import BorrowerCPN from "./pages/BorrowerCPN";
import Home from "./pages/Home";
import BorrowingCPN from "./pages/BorrowingCPN";

function Main() {
  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  const checklogined = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && Date.now() < user.expiration) {
      return true;
    }
    return false;
  }
  const [isAuthenticated, setIsAuthenticated] = useState(checklogined());
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <Route path="" element={<Main />}>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookCPN />} />
            <Route path="/category" element={<CategoryCPN />} />
            <Route path="/borrower" element={<BorrowerCPN />} />
            <Route path="/borrowing" element={<BorrowingCPN />} />
          </Route>
        ) : (
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        )}
      </Routes>
    </Router>
  );
}
export default App

