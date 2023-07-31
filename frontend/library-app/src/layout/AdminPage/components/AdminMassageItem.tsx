import React, { useState } from "react"
import LibraryModel from "../../../models/LibraryModel"
import AdminResponseModel from "../../../models/AdminResponseModel"
import { useOktaAuth } from "@okta/okta-react"

export const AdminMassageItem: React.FC<{ response: LibraryModel, handleSubmitResponse: any }> = (props) => {

    const { authState } = useOktaAuth();
    const [adminResponse, setAdminResponse] = useState('');
    function submitBtn() {
        if (props.response.id !== null && props.response.response !== '') {
            props.handleSubmitResponse(props.response.id, adminResponse);
        }
    }
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
                            <textarea onChange={e => setAdminResponse(e.target.value)} value={adminResponse} className='form-control' id='exampleFormControlTextarea1' rows={3} required />
                        </div>
                        <div>
                            <button disabled={!authState?.isAuthenticated || adminResponse === ""} onClick={submitBtn} type='button' className='btn btn-primary mt-3'>
                                Submit Response
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}