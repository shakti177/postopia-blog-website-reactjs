import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const categories = [
    {
      id: 1,
      name: "Fashion",
    },
    {
      id: 2,
      name: "Technology",
    },
    {
      id: 3,
      name: "Food",
    },
    {
      id: 4,
      name: "AI",
    },
    {
      id: 5,
      name: "Travel",
    },
    {
      id: 6,
      name: "Coding",
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-8">Stories from all interests</h2>
        {categories.map((data) => (
          <div key={data.id}>
            <Link to={`/category/${data.name}`}>
              <h3 className="text-lg font-semibold bg-gray-100 dark:bg-neutral-900 rounded-xl px-4 py-4 mb-3 shadow-sm">
                {data.name}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
