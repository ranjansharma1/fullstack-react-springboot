export const PostQuestion = () => {
    return (
        <div className="card mt-3">
            <div className="card-header">
                Ask Question to DWR Admin
            </div>
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Describe Queries</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea >
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Question</button>
                </form>
            </div>
        </div>
    )
}