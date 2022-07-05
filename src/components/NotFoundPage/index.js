import React from "react";
import { NavLink } from "react-router-dom";
import Astronaut from "./astronaut.png";
const index = () => {
  return (
    <div class="container m-auto flex px-5 py-24 items-center justify-center flex-col">
      <img
        class="lg:w-2/6 md:w-3/6 w-4/6 mb-10 object-cover object-center rounded"
        alt="Astronaut is lost"
        src={Astronaut}
      />
      <div class="text-center lg:w-2/3 w-full">
        <h1 class="title-font sm:text-4xl text-2xl mb-4 font-medium  ">
          This Page is Lost in Space
        </h1>
        <div class="flex justify-center">
          <NavLink
            to="/"
            className="text-white rounded-lg shadow-md py-2 px-4 bg-gradient-to-r from-turquoise to-blue hover:from-blue hover:to-turquoise duration-500 ease-out"
          >
            Quay lại trang chủ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default index;
