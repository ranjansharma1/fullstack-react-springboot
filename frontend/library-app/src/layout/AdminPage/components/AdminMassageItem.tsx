import React from "react"
import LibraryModel from "../../../models/LibraryModel"

export const AdminMassageItem:React.FC<{response:LibraryModel}> = (props) => {
    return (
        <div className="card shadow my-4">
            <div className="card-body">
                <h5 className="card-title">Case #{props.response.id}: {props.response.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.response.userEmail}</h6>
                <p className="card-text">{props.response.question}</p>
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
    )
}