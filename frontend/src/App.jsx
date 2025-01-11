import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import Footerbar from "./components/Footer/Footerbar";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import ScrollToTop from "./components/TopButton/ScrollToTop";

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
        </Routes>
        <Footerbar />
      </BrowserRouter>
    </>
  );
};

export default App;
