import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showBtn && (
        <button
          onClick={goToTop}
          className="fixed bottom-5 right-5 p-3 bg-blue-800 dark:bg-neutral-900 text-white rounded-full shadow-lg focus:outline-none"
        >
          <ChevronUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
