export const AdminMessages = () => {
  return (
    <div className="m-3">
      <h4 className="mt-3">Pending Q/A :</h4>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Case #6: Default Question Title</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">testuser@email.com</h6>
          <p className="card-text">This is Default Question Description: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, quia quidem nam odio doloremque ut dolore. Fugit, deleniti sequi?</p>
          <hr />
          <div>
            <h5>Response: </h5>
            <form action="PUT">
              <div className='col-md-12 mb-3'>
                <label className='form-label'> Description </label>
                <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} required />
              </div>
              <div>
                <button type='button' className='btn btn-primary mt-3'>
                  Submit Response
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}