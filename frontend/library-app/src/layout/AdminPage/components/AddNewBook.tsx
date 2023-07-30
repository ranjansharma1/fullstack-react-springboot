export const AddNewBook = () => {
  return (
    <div>
      <div className="card rounded m-3">
        <div className="card-header">
          Add a New Book
        </div>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="validationAuthor" className="form-label">Title</label>
              <input type="text" className="form-control" id="validationAuthor" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="validationAuthor" className="form-label">Author</label>
              <input type="text" className="form-control" id="validationAuthor" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="validationCategory" className="form-label">Category</label>
              <select className="form-select" aria-label="Default select example" id="validationCategory" defaultValue="" required>
                <option value="">All</option>
                <option value="1">Frontend</option>
                <option value="2">Backend</option>
                <option value="3">Data Science</option>
                <option value="4">Devops</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="validationDesc" className="form-label">Description</label>
              <textarea className="form-control" id="validationDesc" required rows={3} />
            </div>
            <div className="col-md-5">
              <label htmlFor="validationCopies" className="form-label">Copies</label>
              <input type="number" className="form-control" id="validationCopies" style={{ width: "200px" }} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationImage" className="form-label">Upload Image</label>
              <input type="file" className="form-control" aria-label="file example" id="validationImage" />
            </div>
            <div className="col-12 mt-5" >
              <button style={{ width: "inherit" }} className="btn btn-primary" type="submit" >Add Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}