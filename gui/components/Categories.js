import React from "react";

const Categories = ({ categories }) => {
  return (
    <div className="container m-auto">
      <h1 className=" text-center font-bold text-3xl mb-5">CATEGORIES</h1>
      <div className="grid grid-cols-1 px-5 sm:px-0 gap-5 sm:grid-cols-3">
        {categories.map((category) => {
          return (
            <div
              key={category._id}
              className="relative group duration-300 sm:cursor-pointer sm:hover:opacity-90"
            >
              <img
                src={`http://localhost:9000${category.imageUrl}`}
                alt={category.name}
                className="h-[450px] w-[100%] sm:h-[500px] object-cover rounded-md duration-300 sm:group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-0 right-0 left-0 duration-300 flex flex-col justify-center items-center text-white h-20 bg-[rgba(0,0,0,0.3)] lg:opacity-0 lg:group-hover:opacity-90">
                <h2 className="font-semibold text-2xl tracking-widest sm:text-lg">
                  {category.name}
                </h2>
                <p className="text-neutral-200 sm:text-sm sm:text-center">
                  {category.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
