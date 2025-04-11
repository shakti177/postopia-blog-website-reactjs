import React from "react";
import { Link } from "react-router-dom";
import {
  Shirt,
  Laptop,
  Pizza,
  BrainCircuit,
  TicketsPlane,
  Code,
} from "lucide-react";

const Sidebar = () => {
  const categories = [
    {
      id: 1,
      name: "Fashion",
      icon: <Shirt />,
    },
    {
      id: 2,
      name: "Technology",
      icon: <Laptop />,
    },
    {
      id: 3,
      name: "Food",
      icon: <Pizza />,
    },
    {
      id: 4,
      name: "AI",
      icon: <BrainCircuit />,
    },
    {
      id: 5,
      name: "Travel",
      icon: <TicketsPlane />,
    },
    {
      id: 6,
      name: "Coding",
      icon: <Code />,
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
                <span className="float-right">{data.icon}</span>
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
