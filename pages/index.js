import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      title: "Task 1",
      isDone: false,
    },
  ]);
  const [taskName, setTaskName] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: taskName,
        isDone: false,
      },
    ]);
    setTaskName("");
    toast.success("Task added successfully");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filterdTasks = tasks.filter((task) => task.id !== id);
        setTasks(filterdTasks);
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
        <form onSubmit={addTask} className="flex mb-4">
          <input
            type="text"
            placeholder="Enter your task name"
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            className="w-full px-4 py-2 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Task
          </button>
        </form>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg shadow-sm flex justify-between items-center ${
                task.isDone
                  ? "bg-green-800 text-green-100"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p
                className={`text-lg ${
                  task.isDone ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {task.title}
              </p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, isDone: !t.isDone } : t
                      )
                    );
                  }}
                  className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none flex gap-2 items-center"
                >
                  {task.isDone ? "Undo" : "Done"}
                </button>
                |
                <FaTrashAlt
                  color="white"
                  className="text-2xl cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
