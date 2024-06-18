"use client";

import { Todo } from "@/types/todo";
import useTodoStore from "@/utils/store/useTodoStore";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/utils/schema/todoFormSchema";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

function TodoList() {
  const todos: Todo[] = useTodoStore((state) => state.todos as Todo[]);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const updateTodoText = useTodoStore((state) => state.updateTodoText);
  const [editingTodoId, setEditingTodoId] = useState(-1);
  const [newTodoText, setNewTodoText] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleDoubleClick = (todo: Todo) => {
    var id = todo.id;
    setEditingTodoId(id);
    setNewTodoText(todo.text);
  };

  const handleUpdate = (todo: Todo) => {
    updateTodoText(todo.id, newTodoText);
    setEditingTodoId(-1);
  };

  return (
    <div className="mt-5">
      <ul className="list-none space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-150"
          >
            <div className="flex items-center">
              <Checkbox
                className="form-checkbox h-5 w-5 rounded-full text-indigo-600 mr-3"
                checked={todo.done}
                onClick={() => toggleTodo(todo.id)}
              />
              {editingTodoId === todo.id ? (
                <>
                  <Input
                    defaultValue={todo.text}
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                  />
                  <Button size="sm" onClick={() => handleUpdate(todo)}>
                    Modifier
                  </Button>
                </>
              ) : (
                <p
                  className={`text-gray-700 font-medium ${
                    todo.done ? "line-through opacity-75" : ""
                  }`}
                  onDoubleClick={() => handleDoubleClick(todo)}
                >
                  {todo.text}
                </p>
              )}
            </div>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => removeTodo(todo.id)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19.708 2.292a1 1 0 0 1 0 1.414L14.396 10.604l5.312 5.312a1 1 0 0 1-1.414 1.414L12 13.414l-5.312 5.312a1 1 0 0 1-1.414-1.414L10.586 12L5.274 6.688a1 1 0 0 1 1.414-1.414L12 7.586l5.312-5.312z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
