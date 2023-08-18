import { FormEvent, useState } from "react";
import LibraryModel from "../../../models/LibraryModel";
import { useOktaAuth } from "@okta/okta-react";
import AlertMassage from "../../Utils/AlertMassage";

export const PostQuestion = () => {
    const { authState } = useOktaAuth();

    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");

    //Display warning massages
    const [displayWarning, setDisplayWarning] = useState(false);
    const [alertMassage, setAlertMassage] = useState("")


    async function submitNewQuestion(event: FormEvent) {
        event.preventDefault();
        const url: string = `${process.env.REACT_APP_API}/libraries/secure/user`;
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
            const submitResponse = await fetch(url, requestOptions);
            if (!submitResponse.ok)
                throw new Error("Something Went Wrong");

            //Display Warning message
            setDisplayWarning(true)
            setAlertMassage("Your query submitted successfully!")
            // Hide the alert after 3 seconds
            setTimeout(() => {
                setDisplayWarning(false);
                setAlertMassage("");
            }, 3000);

            // Clear the form fields
            setTitle("");
            setQuestion("");
        }
    }

    return (
        <div className="card mt-3">
            {displayWarning && <AlertMassage massage={alertMassage} />}
            <div className="card-header">
                Ask Question to DWR Admin
            </div>
            <div className="card-body">
                <form method="POST">
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
