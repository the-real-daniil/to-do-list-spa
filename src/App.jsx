import { useMemo, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const completedCount = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks],
  );

  const addTask = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, done: false },
    ]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="app">
      <section className="card">
        <h1>To-Do List</h1>
        <p className="subtitle">
          Выполнено: {completedCount} / {tasks.length}
        </p>

        <form className="form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Новая задача..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit">Добавить</button>
        </form>

        <ul className="list">
          {tasks.map((task) => (
            <li className="item" key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.done ? "done" : ""}>{task.title}</span>
              </label>
              <button
                className="delete"
                type="button"
                onClick={() => removeTask(task.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
