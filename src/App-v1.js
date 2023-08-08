import { useState } from "react";

let tasks = [
  { id: 123, task: "groom kitty", priority: "low" },
  { id: 234, task: "eat", priority: "high" },
];

export default function App() {
  const [allTasks, setAllTasks] = useState([tasks]);

  function addNewTask(task) {
    setAllTasks((allTasks) => [...allTasks, task]);
  }

  function deleteTask(id) {
    setAllTasks((allTasks) => allTasks.filter((task) => task.id !== id));
  }

  return (
    <div className="App">
      <h2>Todo App</h2>
      <AddTodos onAddTask={addNewTask} />
      <ShowTodos allTasks={allTasks} onDeleteTask={deleteTask} />
    </div>
  );
}

function AddTodos({ onAddTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("low");

  function handleAddTask(e, task, priority) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newTask = { id, task, priority };

    // setTask((tasks) => [...tasks, newTask]);
    // tasks = [...tasks, newTask];
    onAddTask(newTask);
    // console.log("tasks", tasks);
    setTask("");
    setPriority("low");
  }

  return (
    <form onSubmit={handleAddTask}>
      <label>Add Task</label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      ></input>
      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
        }}
      >
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      <button>Add</button>
    </form>
  );
}
// onClick={(e) => handleAddTask(e, task, priority)}

function ShowTodos({ allTasks, onDeleteTask }) {
  return (
    <div>
      <ul>
        {allTasks.map((todo) => (
          <Todo todo={todo} key={todo.id} onDeleteTask={onDeleteTask} />
        ))}
      </ul>
    </div>
  );
}

function Todo({ todo, onDeleteTask }) {
  return (
    <li>
      <span>
        {" "}
        Task : {todo.task} || Priority : {todo.priority}{" "}
      </span>
      <button onClick={() => onDeleteTask(todo.id)}>X</button>
    </li>
  );
}
