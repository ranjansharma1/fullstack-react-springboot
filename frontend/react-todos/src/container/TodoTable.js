import React from "react";
import TodoRowItem from "./TodoRowItem";

// Here we define props that will take the valiue from its parent component (App.js) where it has defined properties
//like from below in App.js file
/* <TodoTable todos={todos}/> */
/* It using in this component using 'props.todos.map'  */
function TodoTable(props) {
  return (
    <table className="table table-hover">
      <thead className="table-primary">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Description</th>
          <th scope="col">Assigned</th>
          <th scope="col">Delete</th>
          <th scope="col">Update</th>
        </tr>
      </thead>
      <tbody>
        {props.todos.map((todo) => (
          <TodoRowItem
            key={todo.id}
            id={todo.id}
            desc={todo.desc}
            assign={todo.assignedBy}
            deleteTodo={props.deleteTodo}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TodoTable;
