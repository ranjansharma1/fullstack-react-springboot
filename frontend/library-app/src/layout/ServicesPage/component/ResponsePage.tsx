import { useEffect, useState } from "react"
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import LibraryModel from "../../../models/LibraryModel";
import { useOktaAuth } from "@okta/okta-react";
import { error } from "console";

export const ResponsePage = () => {

  const { authState } = useOktaAuth();
  const [questions, setQuestions] = useState<LibraryModel[]>([])
  const [isLoadingQuestionResponse, setIsLoadingQuestionResponse] = useState(true);
  const [httpError, sethttpError] = useState(null);

  const baseURL: string = "http://localhost:8080/api";

  useEffect(() => {
    const fetchQuestionList = async () => {
      if (authState?.isAuthenticated) {
        const url: string = `${baseURL}/libraries/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok)
          throw new Error("Something went wrong");
        const responseData = await response.json();
        setQuestions(responseData._embedded.libraries);
        setIsLoadingQuestionResponse(false);

      }
    }
    fetchQuestionList().catch((error: any) => {
      setIsLoadingQuestionResponse(false);
      sethttpError(error.massage);
    })

  }, [authState]);


  if (isLoadingQuestionResponse) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5 text-center text-danger">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {questions.length > 0 ?
        <div >
          <h5 className="my-3">Current Q/A:</h5>
          {questions.map(question => (
            <div key={question.id} className="card shadow rounded m-3">
              <div className="card-body">
                <h5 className="card-title">Case #{question.id}: {question.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{question.userEmail}</h6>
                <p className="card-text">{question.question}</p>
                <hr />
                <h5>Response:</h5>
                <p>Pending Response from administration. Please be patient.</p>
              </div>
            </div>

          ))}
        </div>

        :
        <h5>All questions you submit will be shown here</h5>
      }
    </div>
  )
}