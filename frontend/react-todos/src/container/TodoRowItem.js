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
  return (
        <tr>
          <th scope="row">{props.id}</th>
          <td>{props.desc}</td>
          <td>{props.assign}</td>
        </tr>
  );
}

export default TodoRowItem;
