import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const signup = async () => {
    const res = await fetch("https://team-task-manager-production-f04b.up.railway.app/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "Admin" }),
    });

    const data = await res.json();
    alert(data.message);
  };

  const login = async () => {
    const res = await fetch("https://team-task-manager-production-f04b.up.railway.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);

    if (data.message === "Login Success") {
      setLoggedIn(true);
      getTasks();
    }
  };

  const getTasks = async () => {
    const res = await fetch("https://team-task-manager-production-f04b.up.railway.app/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    const res = await fetch("https://team-task-manager-production-f04b.up.railway.app/api/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, dueDate }),
    });

    const data = await res.json();
    alert(data.message);

    setTitle("");
    setDueDate("");
    getTasks();
  };

  const completeTask = async (id) => {
    const res = await fetch(`https://team-task-manager-production-f04b.up.railway.app/api/tasks/complete/${id}`, {
      method: "PUT",
    });

    const data = await res.json();
    alert(data.message);
    getTasks();
  };

  const deleteTask = async (id) => {
    const res = await fetch(`https://team-task-manager-production-f04b.up.railway.app/api/tasks/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);
    getTasks();
  };

  const pending = tasks.filter((t) => t.status === "Pending").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const overdue = tasks.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== "Completed"
  ).length;

  if (loggedIn) {
    return (
      <div style={pageStyle}>
        <h1>Team Task Manager Dashboard</h1>

        <div style={cardRow}>
          <div style={card}>
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div style={card}>
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>

          <div style={card}>
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>

          <div style={card}>
            <h2>{overdue}</h2>
            <p>Overdue</p>
          </div>
        </div>

        <h2>Add Task</h2>

        <input
          style={inputStyle}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <input
          style={inputStyle}
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <br /><br />

        <button onClick={addTask}>Add Task</button>

        <h2>All Tasks</h2>

        {tasks.map((task) => (
          <div key={task._id} style={taskBox}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate?.slice(0, 10)}</p>

            <button onClick={() => completeTask(task._id)}>
              Complete
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}

        <br />

        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h1>Team Task Manager</h1>

      <button onClick={() => setIsLogin(false)}>Signup</button>
      <button onClick={() => setIsLogin(true)} style={{ marginLeft: "10px" }}>
        Login
      </button>

      <br /><br />

      {!isLogin && (
        <>
          <input
            style={inputStyle}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />
        </>
      )}

      <input
        style={inputStyle}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        style={inputStyle}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {isLogin ? (
        <button onClick={login}>Login</button>
      ) : (
        <button onClick={signup}>Signup</button>
      )}
    </div>
  );
}

const pageStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const cardRow = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const card = {
  border: "1px solid gray",
  padding: "20px",
  width: "160px",
  borderRadius: "10px",
};

const inputStyle = {
  padding: "8px",
  width: "250px",
};

const taskBox = {
  border: "1px solid gray",
  margin: "10px auto",
  padding: "10px",
  width: "320px",
  borderRadius: "10px",
};

export default App;