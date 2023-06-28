import React from "react";

// Here we define props that will take the valiue from its parent component (TodoTable.js) where it has defined properties
//like from below in App.js file
/* <TodoRowItem
key={todo.id}
id={todo.id}
desc={todo.desc}
assign={todo.assignedBy}
/> */
function TodoRowItem(props) {
  const handleUpdate = () => {
    var desc = prompt("Enter description:");
    var assignedBy = prompt("Enter assigned by:");
    
    // Handle the user input as desired (e.g., store in an array, send to server, etc.)
    console.log("Description:", desc);
    console.log("Assigned By:", assignedBy);

    let updatedTodo={ id: props.id, desc: desc, assignedBy: assignedBy };
    console.log("Updated Todo:", updatedTodo);
    props.handleUpdate(props.id, updatedTodo);
  }
  return (
    <tr> 
      <th scope="row">{props.id}</th>
      <td>{props.desc}</td>
      <td>{props.assign}</td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {props.deleteTodo(props.id); console.log("Deleting Todo Item...")}}
        >
          Delete
        </button>
      </td>
      <td>
        <button className="btn btn-warning"  onClick={handleUpdate} type="button">Update</button>
      </td>
    </tr>
  );
}

export default TodoRowItem;
