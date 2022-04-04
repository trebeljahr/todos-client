import { useEffect, useState } from "react";
import { AddNewTodo } from "./components/AddNewTodo";
import { DeleteAllTodosButtons } from "./components/DeleteAllButtons";
import { FilterForm } from "./components/FilterForm";
import { SingleTodo } from "./components/Todo";

export default function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [filters, setFilters] = useState({ name: "", done: "both" });

  useEffect(() => {
    async function fetchAllTodos() {
      const response = await fetch("http://localhost:5005/api/todos");
      const data = await response.json();
      if (!data.todos) return;
      setAllTodos(data.todos);
    }
    fetchAllTodos();
  }, []);

  const updateSingleTodo = async (idToUpdate, updatedTodo) => {
    try {
      const response = await fetch("http://localhost:5005/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const message = await response.json();
      console.log(message);
      setAllTodos((oldTodos) => {
        return oldTodos.map((todo) => {
          if (idToUpdate === todo._id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    } catch (error) {
      console.error("Error in updating the todo on the server!", error);
    }
  };

  const deleteSingleTodo = async (idToDelete) => {
    try {
      const response = await fetch("http://localhost:5005/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idToDelete }),
      });
      const message = await response.json();
      console.log(message);
      setAllTodos((oldTodos) => {
        return oldTodos.filter((todo) => {
          return idToDelete !== todo._id;
        });
      });
    } catch (error) {
      console.error("Error in updating the todo on the server!", error);
    }
  };
  const clean = (str) => {
    return str.toLowerCase().trim();
  };

  const byCustomFilters = (todo) => {
    if (!clean(todo.name).includes(clean(filters.name))) {
      return false;
    }
    const todoState = todo.done ? "done" : "undone";
    if (filters.done !== "both" && todoState !== filters.done) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <AddNewTodo setAllTodos={setAllTodos} />
      <FilterForm filters={filters} setFilters={setFilters} />
      {allTodos.filter(byCustomFilters).map((todo) => (
        <SingleTodo
          key={todo._id}
          todo={todo}
          updateSingleTodo={updateSingleTodo}
          deleteSingleTodo={deleteSingleTodo}
        />
      ))}
      <DeleteAllTodosButtons
        deleteSingleTodo={deleteSingleTodo}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
      />
    </div>
  );
}
