import { FormEvent, useState } from "react";
import LibraryModel from "../../../models/LibraryModel";
import { useOktaAuth } from "@okta/okta-react";

export const PostQuestion = () => {
    const { authState } = useOktaAuth();

    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const baseURL: string = "http://localhost:8080/api";

    async function submitNewQuestion(event: FormEvent) {
        event.preventDefault();
        const url: string = `${baseURL}/libraries/secure/user`;
        if (authState?.isAuthenticated && title !== "" && question !== "") {
            const postRequest: LibraryModel = new LibraryModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postRequest)
            };
            setShowAlert(true);
            // console.log(postRequest)
            const submitResponse = await fetch(url, requestOptions);
            // console.log(submitResponse)
            if (!submitResponse.ok)
                throw new Error("Something Went Wrong");

            // Show the alert
            setAlertMessage("Your query submitted successfully!");

            // Hide the alert after 3 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            // Clear the form fields
            setTitle("");
            setQuestion("");
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                Ask Question to DWR Admin
            </div>
            <div className="card-body">
                <form method="POST">
                    {showAlert && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {alertMessage}
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="form-control" id="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="textareaId" className="form-label">Describe Problem Statement</label>
                        <textarea onChange={e => setQuestion(e.target.value)} value={question} className="form-control" id="textareaId" rows={3} required />
                    </div>
                    <button
                        disabled={!authState?.isAuthenticated || title === "" || question === ""}
                        onClick={submitNewQuestion}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit Question
                    </button>
                </form>
            </div>
        </div>
    )
}
