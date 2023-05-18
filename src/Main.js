import { BrowserRouter as Router, Routes, Route, Link, NavLink, Outlet, withRouter, Redirect } from "react-router-dom";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import BookCPN from "./pages/BookCPN";
import CategoryCPN from "./pages/CategoryCPN";
import BorrowerCPN from "./pages/BorrowerCPN";
import Home from "./pages/Home";
import BorrowingCPN from "./pages/BorrowingCPN";
import { useState } from "react";

function Main() {
  return (
    <Router>
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookCPN />} />
          <Route path="/category" element={<CategoryCPN />} />
          <Route path="/borrower" element={<BorrowerCPN />} />
          <Route path="/borrowing" element={<BorrowingCPN />} />
        </Routes>
      </div>
    </Router>
  );
}
export default Main

