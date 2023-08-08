import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function onAddNewTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleIsCompleted(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function handleShowDescription(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, showDescription: !task.showDescription }
          : task
      )
    );
  }

  function onShowDetails() {}

  return (
    <>
      <Navbar onShowDetails={onShowDetails} />
      <div className="container">
        <TodoForm onAddNewTask={onAddNewTask} />
        <List
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          handleIsCompleted={handleIsCompleted}
          handleShowDescription={handleShowDescription}
        />
      </div>
    </>
  );
}

function Navbar({ onShowDetails }) {
  return (
    <div className="navbar">
      <img
        src="https://i.ibb.co/qNsPNq6/Logo.png"
        alt="Logo"
        border="0"
        className="img-logo"
      />
      <a href="https://github.com/shrutilicensed/OIBSIP/tree/todo-app/react-todoapp#readme">
        <img
          src="https://i.ibb.co/55RxPYk/info-icon.png"
          alt="info-icon"
          border="0"
          className="img-info-icon"
        />{" "}
      </a>
    </div>
  );
}

function TodoForm({ onAddNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // const id = crypto.randomUUID;
    const id = Date.now();
    const newTask = {
      id,
      title,
      description,
      isEditing: false,
      isCompleted: false,
      showDescription: false,
    };
    if (!title) return;
    onAddNewTask(newTask);
    setTitle("");
    setDescription("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-heading">What do you want to do today?</label>
      <input
        type="text"
        placeholder="Enter task"
        className="input-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter description"
        className="input-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="button"> Add +</button>
    </form>
  );
}

function List({
  tasks,
  onDeleteTask,
  handleIsCompleted,
  handleShowDescription,
}) {
  return (
    <ul>
      <h3 className="list-heading">Buckle up, you've got work to do !</h3>
      {tasks.map((todo) => (
        <Task
          todo={todo}
          key={todo.id}
          onDeleteTask={onDeleteTask}
          handleIsCompleted={handleIsCompleted}
          handleShowDescription={handleShowDescription}
        />
      ))}
    </ul>
  );
}

function Task({
  todo,
  onDeleteTask,
  handleIsCompleted,
  handleShowDescription,
}) {
  return (
    <li>
      <span style={todo.isCompleted ? { textDecoration: "line-through" } : {}}>
        {todo.title} {todo.showDescription && ` : ${todo.description}`}
      </span>

      <div className="options">
        <span onClick={() => handleShowDescription(todo.id)}>📜</span>
        <span onClick={() => handleIsCompleted(todo.id)}>✔️</span>
        <span onClick={() => onDeleteTask(todo.id)}>❌</span>
      </div>
    </li>
  );
}
