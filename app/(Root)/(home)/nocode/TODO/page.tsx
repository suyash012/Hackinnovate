"use client";
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: todos.length + 1,
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg text-white">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your todo"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        onClick={addTodo}
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button className="text-red-500" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
