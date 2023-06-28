import logo from "./logo.svg";
import "./App.css";
import TodoRowItem from "./container/TodoRowItem";

function App(props) {
  const todos = [
    { id: "1", desc: "eat", assignedBy: "Ranjan1" },
    { id: "2", desc: "sleep", assignedBy: "Ranjan2" },
    { id: "3", desc: "study", assignedBy: "Ranjan3" },
    { id: "4", desc: "coding", assignedBy: "Ranjan4" },
    { id: "5", desc: "enjoy", assignedBy: "Ranjan5" },
  ];

  return (
    <div className="container mt-5 ">
      <div className="card">
        <div className="card-header"> Your To do List</div>
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Description</th>
                <th scope="col">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <TodoRowItem
                  key={todo.id}
                  id={todo.id}
                  desc={todo.desc}
                  assign={todo.assignedBy}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
