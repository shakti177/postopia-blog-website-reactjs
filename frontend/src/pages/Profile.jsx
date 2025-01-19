import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

const Profile = () => {
  return (
    <>
      <div className="bg-white dark:bg-black">
        <div className="container mx-auto px-5 md:px-10 py-4">
          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
            {/* Blog */}

            <div className="basis-[60%]">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Blog Posts
              </h1>
            </div>

            {/* user Profile */}
            <div className="basis-[40%] sticky top-28 h-full overflow-auto lg:block">
              <div className="flex flex-col border-l gap-5 p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://pbs.twimg.com/profile_images/1612332480685838337/DtMNGDSQ_400x400.jpg"
                    alt="profile"
                    className="w-32 h-32 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    John Doe
                  </h2>
                </div>
                <div className="flex flex-col space-y-4">
                  <p className="text-gray-500 dark:text-gray-300">
                    johndoe@example.com
                  </p>
                </div>
                <div>
                  <p>0 Blogs</p>
                </div>
                <div>
                  <Button className="bg-blue-800 hover:bg-blue-700">
                    Edit Profile
                  </Button>
                </div>
                <div>
                  <p>Joined on 21 Dec 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
