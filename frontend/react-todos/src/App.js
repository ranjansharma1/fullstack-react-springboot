import logo from "./logo.svg";
import "./App.css";

function App() {
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
              <tr>
                <th scope="row">1</th>
                <td>Feed Dog</td>
                <td>Ranjan</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Get Haircut</td>
                <td>Ranjan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
