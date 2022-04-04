import { useEffect } from "react";

export function FilterForm({ filters, setFilters }) {
  // { name: "hello", done: "done" || "both" || "undone" }
  const handleFilterFormInput = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div>
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleFilterFormInput}
      />
      All:
      <input
        type="radio"
        name="done"
        value="both"
        checked={filters.done === "both"}
        onChange={handleFilterFormInput}
      />
      Only Done:
      <input
        type="radio"
        name="done"
        value="done"
        checked={filters.done === "done"}
        onChange={handleFilterFormInput}
      />
      Only Undone:
      <input
        type="radio"
        name="done"
        value="undone"
        checked={filters.done === "undone"}
        onChange={handleFilterFormInput}
      />
    </div>
  );
}
