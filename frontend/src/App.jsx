import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import Footerbar from "./components/Footer/Footerbar";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/TopButton/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Write from "./pages/Write";
import Dashboard from "./pages/Dashboard";
import EditBlog from "./pages/EditBlog";
import Blog from "./pages/Blog";
import Search from "./pages/Search";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/write" element={<Write />} />
          <Route path="/editblog/:id" element={<EditBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footerbar />
      </BrowserRouter>
      <ScrollToTop />
    </>
  );
};

export default App;
