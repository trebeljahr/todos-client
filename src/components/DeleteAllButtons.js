export function DeleteAllTodosButtons({
  deleteSingleTodo,
  allTodos,
  setAllTodos,
}) {
  const deleteAllDone = async () => {
    const filteredOutTodos = allTodos.filter(({ done }) => done);
    const remainingTodos = allTodos.filter(({ done }) => !done);
    const deletePromises = filteredOutTodos.map(({ _id }) => {
      return deleteSingleTodo(_id);
    });
    await Promise.all(deletePromises);
    setAllTodos(remainingTodos);
  };
  const deleteAll = async () => {
    const deletePromises = allTodos.map(({ _id }) => {
      return deleteSingleTodo(_id);
    });
    await Promise.all(deletePromises);
    setAllTodos([]);
  };
  return (
    <div>
      <button onClick={deleteAllDone}>Delete All Done!</button>
      <button onClick={deleteAll}>Delete All!</button>
    </div>
  );
}
