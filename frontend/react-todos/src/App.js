import "./App.css";
import TodoTable from "./container/TodoTable";

function App() {
  const todos = [
    { id: "1", desc: "eat", assignedBy: "Ranjan1" },
    { id: "2", desc: "sleep", assignedBy: "Ranjan2" },
    { id: "3", desc: "study", assignedBy: "Ranjan3" },
    { id: "4", desc: "coding", assignedBy: "Ranjan4" },
    { id: "5", desc: "enjoy", assignedBy: "Ranjan5" },
  ];

  return (
    <TodoTable todos={todos}/>
  );
}

export default App;
