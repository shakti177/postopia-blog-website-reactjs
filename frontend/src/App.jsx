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
import Category from "./pages/Category";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* public Routes */}

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* public Routes */}

          <Route path="/search" element={<Search />} />

          {/* private Routes */}

          <Route
            path="/write"
            element={
              <PrivateRoute>
                <Write />
              </PrivateRoute>
            }
          />
          <Route
            path="/editblog/:id"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* private Routes */}

          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footerbar />
      </BrowserRouter>
      <ScrollToTop />
    </>
  );
};

export default App;
