import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import Footerbar from "./components/Footer/Footerbar";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import ScrollToTop from "./components/TopButton/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Footerbar />
      </BrowserRouter>
    </>
  );
};

export default App;
