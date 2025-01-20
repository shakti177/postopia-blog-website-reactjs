import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-7 justify-center h-dvh dark:bg-black p-5">
        <h1 className="text-9xl font-bold">404</h1>
        <h3 className="text-3xl font-bold">Page Not Found</h3>
        <p className="text-lg text-center md:w-1/2">
          We are very sorry for the inconvinience. Its look like you're trying
          to acces a page that has been deleted or never even existed.
        </p>
        <Link to="/">
          <Button className="bg-blue-800 hover:bg-blue-700">
            Back to Home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
