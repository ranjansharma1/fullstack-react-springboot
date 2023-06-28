import { useState } from "react";
import "./App.css";
import TodoTable from "./container/TodoTable";
import TodoForm from "./container/TodoForm";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, desc: "eat", assignedBy: "Ranjan1" },
    { id: 2, desc: "sleep", assignedBy: "Ranjan2" },
    { id: 3, desc: "study", assignedBy: "Ranjan3" },
    { id: 4, desc: "coding", assignedBy: "Ranjan4" },
    { id: 5, desc: "enjoy", assignedBy: "Ranjan5" },
  ]);

  const [showTodoForm, setshowTodoForm] = useState(false);

  const addTodo = (desc, assgn) => {
    let rowNumber = 0;
    if (todos.length > 0) {
      rowNumber = todos[todos.length - 1].id + 1;
    } else {
      rowNumber = 1;
    }
    const newTodo = { id: rowNumber, desc: desc, assignedBy: assgn };

    //The callback function uses the spread operator (...) to create a new array. It takes all the elements from the original array and includes them in the new array.
    setTodos((todos) => [...todos, newTodo]);
  };

  return (
    <>
      <div>
        <div className="container mt-5 ">
          <div className="card">
            <div className="card-header"> Your To do List</div>
            <div className="card-body">
              <TodoTable todos={todos} />

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setshowTodoForm(!showTodoForm);
                }}
              >
                {!showTodoForm ? "Show New To Do" : "Hide New To Do"}
              </button>
              {showTodoForm && <TodoForm addTodo={addTodo} />}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
