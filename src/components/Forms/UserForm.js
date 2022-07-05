import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import { GET_USER } from "../../utils/graphQL/query";
import { UPDATE_USER, ADD_USER } from "../../utils/graphQL/mutation";
import { useQuery, useMutation } from "@apollo/client";
const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  admin: false,
  password: "",
  department: "",
  reTypedPassword: "",
};
export const UserForm = ({ currentUser, setUser }) => {
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    setError,
    formState: { errors },
    reset,
  } = useForm({ initialValues: initialState });
  const { data } = useQuery(GET_USER, { variables: { userId: currentUser } });
  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  useEffect(() => {
    reset();
    if (data) {
      clearErrors();
      scroll.scrollToBottom();
      let { createdAt, id, __typename, password, ...userInfo } = data.user;
      Object.entries(userInfo).map(([key, value]) => setValue(key, value));
    }
  }, [data, currentUser, reset, setValue, clearErrors]);
  const handleFormSubmit = async (userData) => {
    let { reTypedPassword, ...userInfo } = userData;
    if (reTypedPassword !== userInfo.password) {
      setError("reTypedPassword", {
        type: "custom",
        message: "Mật khẩu không trùng khớp",
      });
    } else {
      try {
        if (currentUser) {
          if (userInfo.password === "") {
            const { password, ...info } = userInfo;
            const { data } = await updateUser({
              variables: {
                updateUserId: currentUser,
                updatedUser: {
                  ...info,
                },
              },
            });
            if (data) {
              window.location.assign(`/taikhoan`);
            }
          } else {
            const { data } = await updateUser({
              variables: {
                updateUserId: currentUser,
                updatedUser: {
                  ...userInfo,
                },
              },
            });
            if (data) {
              window.location.assign(`/taikhoan`);
            }
          }

        } else {
          const { data } = await addUser({
            variables: {
              newUser: {
                ...userInfo,
              },
            },
          });
          if (data) {
            window.location.assign(`/taikhoan`);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const clear = () => {
    setUser(null);
    clearErrors();
    reset();
  };
  return (
    <div className="md:container mt-10 border-t-2 border-gray mx-10">
      <div className="mt-10 sm:mt-0">
        <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
          <div className="overflow-hidden sm:rounded-md">
            <div className=" m-auto bg-white sm:p-6">

              <label
                htmlFor="lastName"
                className="block text-sm font-medium"
              >
                Họ
                      </label>
              <input
                type="text"
                {...register("lastName", {
                  required: "Nhập Họ",
                })}
                className="mt-1 px-3 py-2 mb-2 w-1/3 border-b-2 border-turquoise text-black focus:outline-none sm:text-sm"
              />
              {errors ?.lastName && (
                <p className="text-brown-light text-sm font-medium italic">
                  {errors.lastName.message}
                </p>
              )}
              <label
                htmlFor="firstName"
                className="block text-sm font-medium"
              >
                Tên
                      </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "Vui lòng nhập tên",
                })}
                className="mt-1 px-3 py-2 mb-2 w-1/3 border-b-2 border-turquoise text-black focus:outline-none sm:text-sm"
              />
              {errors ?.firstName && (
                <p className="text-brown-light text-sm font-medium italic">
                  {errors.firstName.message}
                </p>
              )}
              <label
                htmlFor="department"
                className="block text-sm font-medium  "
              >
                Khoa
                    </label>
              <input
                type="text"
                {...register("department", {
                  required: "Nhập Khoa",
                })}
                className="mt-1 px-3 py-2 mb-2 w-1/3 border-b-2 border-turquoise text-black focus:outline-none sm:text-sm"
              />
              {errors ?.department && (
                <p className="text-brown-light text-sm font-medium italic">
                  {errors.department.message}
                </p>
              )}
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium  "
                >
                  UserName
                      </label>
                <input
                  type="text"
                  {...register("userName", {
                    required: "Vui lòng nhập userName",
                  })}
                  className="mt-1 px-3 py-2 mb-2 w-1/3 border-b-2 border-turquoise text-black focus:outline-none sm:text-sm"
                />
                {errors ?.userName && (
                  <p className="text-brown-light text-sm font-medium italic">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-4">
                <input type="checkbox" {...register("admin")} />
                <label
                  htmlFor="admin"
                  className=" text-sm font-medium   px-4"
                >
                  Admin
                      </label>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium  "
                >
                  Mật Khẩu {currentUser && `Mới`} (Trên 7 ký tự)
                      </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu" | currentUser,
                  })}
                  className="mt-1 px-3 py-2 mb-2 w-1/3 border-b-2 border-turquoise text-black focus:outline-none sm:text-sm"
                />
                {errors ?.password && (
                  <p className="text-brown-light text-sm font-medium italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="reTypedPassword"
                  className="block text-sm font-medium  "
                >
                  Xác Nhận Mật Khẩu
                      </label>
                <input
                  type="password"
                  autoComplete="false"
                  {...register("reTypedPassword")}
                  className="mt-1 px-3 py-2 mb-2 w-1/3 border-b-2 border-turquoise text-black focus:outline-none sm:text-sm"
                />
                {errors ?.reTypedPassword && (
                  <p className="text-brown-light text-sm font-medium italic">
                    {errors.reTypedPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <button className="group relative w-1/3  flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue duration-500 ease-out">
              Nhập
                  </button>
          </div>
        </form>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            className="group relative w-1/3 flex justify-center  py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-gray to-gray-darkest duration-500 ease-out"
            onClick={() => clear()}
          >
            Clear
              </button>
        </div>
      </div>
    </div>
  );
};
