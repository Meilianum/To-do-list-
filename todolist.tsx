"use client";
import { Button } from "./ui/button" 
import { Input } from "./ui/input"
import { Checkbox } from "@radix-ui/react-checkbox";
import { icons } from "lucide-react";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

 interface Task {
    id: number;
  text: string;
   completed: boolean;  }
  

   interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editedTaskText, setEditedTaskText] = useState<string>("");
    const [isMounted, setIsMounted] = useState<boolean>(false);
  
    useEffect(() => {
      setIsMounted(true);
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks) as Task[]);
      }
    }, []);
  
    useEffect(() => {
      if (isMounted) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }, [tasks, isMounted]);
  
    const addTask = (): void => {
      if (newTask.trim() !== "") {
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
      }
    };
  
    const toggleTaskCompletion = (id: number): void => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    const startEditingTask = (id: number, text: string): void => {
      setEditingTaskId(id);
      setEditedTaskText(text);
    };
  
    const updateTask = (): void => {
      if (editedTaskText.trim() !== "") {
        setTasks(
          tasks.map((task) =>
            task.id === editingTaskId ? { ...task, text: editedTaskText } : task
          )
        );
        setEditingTaskId(null);
        setEditedTaskText("");
      }
    };
  
    const deleteTask = (id: number): void => {
      setTasks(tasks.filter((task) => task.id !== id));
    };
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXAZl2YylNWrZcFY8T4E7jsaEJcXfS-kIklQ&s" className="m-3.5 border-8 border-gray-600 translate-x-7
      duration-500 transition-all ease-in-out delay-100 transform rotate-[700deg] border-spacing-y-3.5 hue-rotate-180 border-double hover:default:" alt="Logo">
</img>
        <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Todo List
          </h1>
          <div className="flex items-center mb-4">
            <Input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTask(e.target.value)
              }
              className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
            <Button
              onClick={addTask}
              className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={task.completed}
                    className="mr-2"
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                  {editingTaskId === task.id ? (
                    <Input
                      type="text"
                      value={editedTaskText}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditedTaskText(e.target.value)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          updateTask();
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                    />
                  ) : (
                    <span
                      className={`flex-1 text-gray-800 dark:text-gray-200 ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {editingTaskId === task.id ? (
                    <Button
                      onClick={updateTask}
                      className="bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-md mr-2"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => startEditingTask(task.id, task.text)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                  >
                    Delete
                    <img src="images/img2.jfif" alt="demopic" className="m-3.5 border-4 border-gray-600 translate-x-7 h-12 w-12 hover:bg-slate-800"></img>
                    
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

