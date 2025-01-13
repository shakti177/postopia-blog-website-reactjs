import React from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 py-24 ">
      <div className="flex flex-col items-center justify-center px-8 py-14 md:py-28 text-center bg-gray-100 dark:bg-black rounded-2xl">
        <h2 className="text-3xl font-bold">Subscribe to our newsletter!</h2>
        <p className="text-lg text-gray-500 mt-1">
          We'll send you the best of our blog just once a month. We promise.
        </p>
        <form className="flex flex-col md:flex-row items-center justify-center w-full md:w-[50%] mt-10 gap-4">
          <Input
            type="email"
            placeholder="Email address"
            required
            className="outline-none py-7"
          />
          <Button className="bg-blue-800 hover:bg-blue-700 py-7 px-10 w-full md:w-fit text-md font-bold">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
