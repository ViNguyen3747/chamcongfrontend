import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useMutation } from "@apollo/client";
import auth from "../../utils/auth";
import { SIGN_IN } from "../../utils/graphQL/mutation";
const initialState = {
  userName: "",
  password: "",
};

const Signin = () => {
  const [error, setEror] = useState(null);
  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const [signin] = useMutation(SIGN_IN, {
    onError: (err) => {
      if (
        err.message === "userName không tồn tại trong hệ thống" ||
        err.message === "Vui lòng nhập lại mật khẩu"
      )
        setEror(err);
    },
  });

  const handleFormSubmit = async (userData) => {
    try {
      const { data } = await signin({
        variables: { ...userData },
      });
      if (data) {
        auth.login(
          data.signin.token,
          data.signin.user.userName,
          data.signin.user.admin
        );
        clearErrors();
        window.location.assign("/bangchamcong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="text-gray-darkest body-font static m-auto">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl  900">
            Welcome to Chấm Công Application
          </h1>
          <p className="leading-relaxed mt-4">
            Vận hành bởi Trung Tâm Y Tế Huyện Phú Vang
          </p>
        </div>
        <div className="lg:w-3/6 md:w-1/2 bg-gray-lightest rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="m-6 text-center text-2xl font-extrabold text-gray-dark">
            {!auth.loggedIn()
              ? "Đăng Nhập Vào Tài Khoản"
              : `Welcome back ${localStorage.getItem("name")}`}
          </h2>
          {error && (
            <p className="text-brown-light text-sm font-medium italic">
              {error.message}
            </p>
          )}
          {!auth.loggedIn() && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="relative mb-4">
                <label
                  htmlFor="userName"
                  className="leading-7 text-sm text-gray-darkest"
                >
                  Username
                </label>

                <input
                  type="text"
                  {...register("userName", {
                    required: "Vui lòng nhập userName",
                  })}
                  className="w-full px-3 py-2 mb-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                />
                {errors?.userName && (
                  <p className="text-brown-light text-sm font-medium italic">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-darkest"
                >
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                  })}
                  className="w-full px-3 py-2 border-l-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                />
                {errors?.password && (
                  <p className="text-brown-light text-sm font-medium italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button className="group relative w-full flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue hover:from-blue hover:to-turquoise duration-500 ease-out">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                Nhập
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signin;
