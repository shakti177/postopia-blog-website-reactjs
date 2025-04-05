import React from "react";
import { useTheme } from "../../context/ThemeProvider";
import logoDark from "../../assets/logo/blacklogo.png";
import logoLight from "../../assets/logo/whitelogo.png";
import { Link } from "react-router-dom";

const Footerbar = () => {
  const { theme } = useTheme();

  const getCurrentYear = () => new Date().getFullYear();

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="pt-7 bg-gray-100  dark:bg-neutral-900">
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-4 md:gap-8 md:px-[60px] lg:px-[120px]">
          <div className="col-span-1">
            <div className="flex items-center justify-center w-44 md:w-35 lg:w-52">
              <img src={theme === "light" ? logoDark : logoLight} alt="Logo" />
            </div>
            <p className="py-6">
              Postopia - Where Your Ideas Take Flight, transforming creativity
              into seamless posts, efficient management, and a captivating
              reader journey.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Recent Posts</h2>
            <ul className="py-2">
              <li className="py-1">
                <a href="#">
                  <p>3 New Outfit Formulas To Add To Your Capsule Wardrobe</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    February 27, 2021
                  </span>
                </a>
              </li>
              <li className="py-1">
                <a href="#">
                  <p>Blog Guide: How to Start a Personal Blog on WordPress</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    February 27, 2021
                  </span>
                </a>
              </li>
              <li className="py-1">
                <a href="#">
                  <p>The technical setup when starting a personal blog</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    February 27, 2021
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Categories</h2>
            <ul className="py-2" onClick={ScrollToTop}>
              <li className="py-1">
                <Link to={`/category/Fashion`}>Fashion</Link>
              </li>
              <li className="py-1">
                <Link to={`/category/Technology`}>Technology</Link>
              </li>
              <li className="py-1">
                <Link to={`/category/Food`}>Food</Link>
              </li>
              <li className="py-1">
                <Link to={`/category/AI`}>AI</Link>
              </li>
              <li className="py-1">
                <Link to={`/category/Travel`}>Travel</Link>
              </li>
              <li className="py-1">
                <Link to={`/category/Coding`}>Coding</Link>
              </li>
            </ul>
          </div>
          <div className="text-xl font-bold">
            <h2>Download Official App</h2>
          </div>
        </div>
        <div className="py-4">
          <p className="text-sm text-gray-500 text-center dark:text-gray-400">
            © {getCurrentYear()} Postopia. All Rights Reserved | Designed and
            developed by{" "}
            <a
              href="https://github.com/kritikhedau"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1d40af", textDecoration: "none" }}
            >
              Kritik Hedau
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/shakti177"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1d40af", textDecoration: "none" }}
            >
              Shakti Tamrakar
            </a>{" "}
            with ❤️
          </p>
        </div>
      </div>
    </>
  );
};

export default Footerbar;
