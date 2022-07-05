import React from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import auth from "../../utils/auth";

const Navbar = () => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-turquoise-dark hover:text-turquoise focus:outline-none">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {auth.loggedIn() && (
              <div className="-m-3 p-3 flex items-start text-base font-medium text-turquoise-dark">
                Xin Chào {localStorage.getItem("name")}
              </div>
            )}
            <NavLink
              to="bangchamcong"
              className="-m-3 p-3 flex items-start text-base font-medium text-turquoise-dark hover:text-turquoise"
            >
              Bảng Chấm Công
            </NavLink>
            {auth.isAdmin() && (
              <NavLink
                to="taikhoan"
                className="-m-3 p-3 flex items-start text-base font-medium text-turquoise-dark hover:text-turquoise"
              >
                Tài Khoản
              </NavLink>
            )}
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={() => auth.logout()}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-turquoise-dark hover:bg-turquoise ease-out"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-turquoise-dark">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-end">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset ">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {auth.loggedIn() && (
                    <div className="-m-3 p-3 flex items-center rounded-md  text-turquoise-dark">
                      Xin Chào {localStorage.getItem("name")}
                    </div>
                  )}
                  <NavLink
                    to="bangchamcong"
                    className="-m-3 p-3 flex items-center rounded-md  text-turquoise-dark hover:text-turquoise"
                  >
                    <span className="ml-3 text-base font-medium ">
                      Bảng Chấm Công
                    </span>
                  </NavLink>
                  {auth.isAdmin() && (
                    <NavLink
                      to="taikhoan"
                      className="-m-3 p-3 flex items-center rounded-md text-turquoise-dark hover:text-turquoise"
                    >
                      <span className="ml-3 text-base font-medium ">
                        Tài Khoản
                      </span>
                    </NavLink>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
