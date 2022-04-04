export function SingleTodo({ todo, updateSingleTodo, deleteSingleTodo }) {
  const handleUpdateTodo = () => {
    updateSingleTodo(todo._id, { ...todo, done: !todo.done });
  };
  const handleDeleteTodo = () => {
    deleteSingleTodo(todo._id);
  };
  return (
    <div>
      <h2 style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.name}
      </h2>
      <button onClick={handleUpdateTodo}>
        {todo.done ? "Re-open" : "Done!"}
      </button>
      <button onClick={handleDeleteTodo}>Delete!</button>
    </div>
  );
}
