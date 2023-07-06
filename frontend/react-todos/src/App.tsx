import { useState } from "react";
import "./App.css";
import TodoTable from "./container/TodoTable";
import TodoForm from "./container/TodoForm";

interface Todo {
  id: number;
  desc: string;
  assignedBy: string;
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, desc: "eat", assignedBy: "Ranjan1" },
    { id: 2, desc: "sleep", assignedBy: "Ranjan2" },
    { id: 3, desc: "study", assignedBy: "Ranjan3" },
    { id: 4, desc: "coding", assignedBy: "Ranjan4" },
    { id: 5, desc: "enjoy", assignedBy: "Ranjan5" },
  ]);

  const [showTodoForm, setshowTodoForm] = useState(false);

  const addTodo = (desc:string, assgn:string) => {
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

  const deleteTodo = (deleteTodoRowNumber:number) => {
    let filtered = todos.filter(function (value) {
      return value.id !== deleteTodoRowNumber;
    });
    setTodos(filtered);
  }


  // If you want to perform any task in child components, you can define here and take there using props
  const handleUpdate = (id: number, updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };
  

  return (
    <>
      <div>
        <div className="container mt-5 ">
          <div className="card">
            <div className="card-header"> Your To do List</div>
            <div className="card-body">
              <TodoTable todos={todos} deleteTodo={deleteTodo} handleUpdate={handleUpdate}/>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setshowTodoForm(!showTodoForm);
                }}
              >
                {!showTodoForm ? "New To Do" : "Hide New To Do"}
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
