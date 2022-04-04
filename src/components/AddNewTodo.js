import { useState } from "react";

export function AddNewTodo({ setAllTodos }) {
  const [newTodo, setNewTodo] = useState({ name: "", done: false });
  const handleFormInput = (event) => {
    setNewTodo({ ...newTodo, [event.target.name]: event.target.value });
  };

  const handleAddNewTodo = async () => {
    if (newTodo.name.length === 0) {
      alert("Please enter a name for the todo!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const serverResponse = await response.json();
      console.log(serverResponse);
      setAllTodos((oldTodos) => {
        return [...oldTodos, serverResponse.todo];
      });
    } catch (error) {
      console.error("Error in updating the todo list on the server!", error);
    }
  };

  return (
    <div>
      <input name="name" value={newTodo.name} onChange={handleFormInput} />
      <button onClick={handleAddNewTodo}>Add New Todo!</button>
    </div>
  );
}
