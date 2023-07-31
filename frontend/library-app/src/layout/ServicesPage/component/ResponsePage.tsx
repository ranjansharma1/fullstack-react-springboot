import { useEffect, useState } from "react"
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import LibraryModel from "../../../models/LibraryModel";
import { useOktaAuth } from "@okta/okta-react";
import InfiniteScroll from "react-infinite-scroll-component";

export const ResponsePage = () => {

  const { authState } = useOktaAuth();
  const [questions, setQuestions] = useState<LibraryModel[]>([])
  const [isLoadingQuestionResponse, setIsLoadingQuestionResponse] = useState(true);
  const [httpError, sethttpError] = useState(null);

  //Infifnite Loading
  const [page, setPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  const baseURL: string = "http://localhost:8080/api";

  useEffect(() => {
    const fetchQuestionList = async () => {
      if (authState?.isAuthenticated) {
        const url: string = `${baseURL}/libraries/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=0&size=5`;
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


  const fetchMoreData = async () => {
    setIsLoadingQuestionResponse(true);
    const nextPage = page + 1;
    const url: string = `${baseURL}/libraries/search/findByUserEmail?userEmail=${authState?.accessToken?.claims.sub}&page=${nextPage}&size=5`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const parseData = await response.json();
    // the spread operator (...) is used to create a new array that contains the previous books (prevBooks) as well as the new books fetched from parseData._embedded.libraries. It is concating the array adding to the previos array...
    setQuestions((prevBooks) => [...prevBooks, ...parseData._embedded.libraries]);
    setTotalResult(parseData.page.totalElements);
    setIsLoadingQuestionResponse(false);
    setPage(nextPage);
  };

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
          {isLoadingQuestionResponse && <SpinnerLoading />}
          <InfiniteScroll
            dataLength={questions.length}
            next={fetchMoreData}
            hasMore={questions.length !== totalResult}
            loader={<SpinnerLoading />}
          >
            {questions.map(question => (
              <div key={question.id} className="card shadow rounded m-3">
                <div className="card-body">
                  <h5 className="card-title">Case #{question.id}: {question.title}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{question.userEmail}</h6>
                  <p className="card-text bg-light text-danger">{question.question}</p>
                  <hr />
                  <h5>Response:</h5>
                  {question.closed ?
                    <>
                      <h6 className="card-subtitle mb-2 text-body-secondary">Admin ({question.adminEmail})</h6>
                      <p className="card-text bg-light text-success">{question.response}</p>
                    </>
                    :
                    <p className="card-text bg-light ">Pending Response from administration. Please be patient.</p>
                  }
                </div>
              </div>
            ))}
          </InfiniteScroll>

        </div>
        :
        <>
          {isLoadingQuestionResponse ? <SpinnerLoading /> :
            <h5>All questions you submit will be shown here</h5>
          }
        </>
      }
    </div>
  )
}