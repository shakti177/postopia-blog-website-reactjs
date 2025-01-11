import React from "react";

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
      name: "News",
    },
    {
      id: 4,
      name: "Lifestyle",
    },
    {
      id: 5,
      name: "Travel",
    },
    {
      id: 6,
      name: "Programming",
    },
    {
      id: 7,
      name: "Health",
    },
    {
      id: 8,
      name: "Beauty",
    },
    {
      id: 9,
      name: "Fitness",
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-8">Stories from all interests</h2>
        {categories.map((data) => (
          <div key={data.id}>
            <h3 className="text-lg font-semibold bg-white dark:bg-neutral-900 rounded-xl px-4 py-4 mb-3 shadow-sm">
              {data.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
