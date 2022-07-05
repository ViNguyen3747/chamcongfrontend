import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { animateScroll as scroll } from "react-scroll";
import Auth from "../../utils/auth";
import { ADD_TASK, UPDATE_TASK } from "../../utils/graphQL/mutation";
import { GET_TASK } from "../../utils/graphQL/query";
import formatDate from "../../utils/formatDate";
const initialState = {
  employee: "",
  task: Array(31).fill(Array(3).fill(" ")),
};
const TaskForm = ({ currentTask, setcurrentTask }) => {
  const {
    handleSubmit,
    clearErrors,
    setValue,
    register,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialState,
  });
  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [lastUpdate, setLastUpdate] = useState({
    updatedBy: null,
    updatedAt: null,
  });
  const { data } = useQuery(GET_TASK, { variables: { taskId: currentTask } });

  useEffect(() => {
    reset();
    if (data) {
      clearErrors();
      scroll.scrollToTop();
      let { createdAt, id, __typename, updatedAt, updatedBy, ...taskInfo } =
        data.task;
      setLastUpdate({ updatedBy, updatedAt: formatDate(updatedAt) });
      console.log(taskInfo);
      Object.entries(taskInfo).map(([key, value]) => setValue(key, value));
    }
  }, [data, getValues, reset, setValue, clearErrors]);

  const handleFormSubmit = async (taskData) => {
    try {
      if (currentTask) {
        const { data } = await updateTask({
          variables: {
            updateTaskId: currentTask,
            input: {
              ...taskData,
            },
          },
        });
        if (data) {
          window.location.assign(`/bangchamcong`);
        }
      } else {
        const { data } = await addTask({
          variables: {
            input: {
              ...taskData,
            },
          },
        });
        if (data) {
          window.location.assign(`/bangchamcong`);

        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clear = () => {
    setcurrentTask(null);
    clearErrors();
    setLastUpdate({
      updatedBy: null,
      updatedAt: null,
    });
    reset();
  };
  const taskList = (event, i, j) => {
    const list = getValues("task");
    list[i][j] = event.target.value;
    setValue("task", list);
  };
  return (
    <>
      <div className="md:container pb-10 border-b-2 border-gray">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <label
                      htmlFor="employee"
                      className="block text-sm font-medium"
                    >
                      Nhân Viên
                    </label>
                    <input
                      type="text"
                      {...register("employee", {
                        required: "Vui lòng nhập tên nhân viên",
                      })}
                      className="mt-1 relative block px-3 py-2 mb-2 border-b-2 border-turquoise placeholder-gray text-black focus:outline-none sm:text-sm"
                    />
                    {errors ?.employee && (
                      <p className="text-brown-light text-sm font-medium italic">
                        {errors.employee.message}
                      </p>
                    )}
                    <label
                      htmlFor="task"
                      className="block mt-4 text-sm font-medium"
                    >
                      Công Việc
                    </label>
                    <div className="mt-6  overflow-x-auto overflow-y-scroll width-set-media ">
                      <table className="divide-y w-full divide-turquois">
                        <thead>
                          <tr>
                            {[...Array(31)].map((e, i) => (
                              <th className=" text-center border-x-2 font-medium border-gray">
                                {i + 1}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <Controller
                            control={control}
                            name="task"
                            render={({ field: { onChange } }) => (
                              <>
                                {getValues("task").map((value, i) => (
                                  <td className=" h-10 whitespace-nowrap border-x-2 border-t-2 border-gray">
                                    {value.map((v, j) => (
                                      <input
                                        type="text"
                                        value={getValues("task")[i][j]}
                                        onChange={(event) =>
                                          taskList(event, i, j)
                                        }
                                        className={`text-black pl-3 w-28 h-10 ${
                                          j === 1
                                            ? " bg-table-first"
                                            : j === 2
                                              ? "bg-table-second"
                                              : ""
                                          }  focus:outline-none text-base`}
                                      />
                                    ))}
                                  </td>
                                ))}
                              </>
                            )}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {lastUpdate.updatedBy && (
                    <p className="px-4 py-5 bg-white sm:p-6">
                      Last updated by {lastUpdate.updatedBy} at{" "}
                      {lastUpdate.updatedAt}
                    </p>
                  )}
                  <div className="px-4 py-3  text-left sm:px-6">
                    <button className="w-1/3 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-turquoise to-blue duration-500 ease-out">
                      Nhập
                    </button>
                  </div>
                </div>
              </form>

              <div className="px-4 py-3 text-left sm:px-6">
                <button
                  className=" w-1/3 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gradient-to-r from-gray to-gray-darkest duration-500 ease-out"
                  onClick={clear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
