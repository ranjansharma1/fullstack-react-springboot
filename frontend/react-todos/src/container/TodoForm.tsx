import { useState } from "react";

const TodoForm: React.FC<{addTodo: Function}> = (props) => {
  const [desc, setDesc] = useState("");
  const [assignee,setAssignee] = useState("");
  const submitToDO =()=>{
    if(desc !== "" && assignee !== "" ){
        props.addTodo(desc, assignee);
        setAssignee("");
        setDesc("");
    }
  }

  return (
    <form>
      <div className="my-3 ">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          type="text"
          id="desc"
          className="form-control"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="assgn" className="form-label">
          Assignee
        </label>
        <input
          type="textarea"
          id="assgn"
          className="form-control"
          onChange={(e) => {
            setAssignee(e.target.value);
          }}
          value={assignee}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={submitToDO}
      >
        Submit
      </button>
    </form>
  );
}

export default TodoForm;
