import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react"
import { AdminMassageItem } from "./AdminMassageItem";
import LibraryModel from "../../../models/LibraryModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminResponseModel from "../../../models/AdminResponseModel";
import AlertMassage from "../../Utils/AlertMassage";

export const AdminMessages = () => {
  const { authState } = useOktaAuth();
  const [responses, setResponses] = useState<LibraryModel[]>([])
  const [isLoadingQuestionResponse, setIsLoadingQuestionResponse] = useState(true);
  const [httpError, sethttpError] = useState(null);

  //Infifnite Loading
  const [page, setPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  //Check if response is submitted
  const [isResponseSubmitted, setIsResponseSubmitted] = useState(false);

  //Display warning massages
  const [displayWarning, setDisplayWarning] = useState(false);
  const [alertMassage, setAlertMassage] = useState("");

  useEffect(() => {
    const fetchAdminResponse = async () => {
      if (authState?.isAuthenticated) {
        const url: string = `${process.env.REACT_APP_API}/libraries/search/findByClosed?closed=false&page=0&size=5`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseData = await response.json();
        setResponses(responseData._embedded.libraries);
        setIsLoadingQuestionResponse(false);
        // console.log(responseData._embedded.libraries);

      }
    }
    fetchAdminResponse().catch((error: any) => {
      setIsLoadingQuestionResponse(false);
      sethttpError(error.massage);
    });
  }, [authState, isResponseSubmitted])

  const fetchMoreData = async () => {
    setIsLoadingQuestionResponse(true);
    const nextPage = page + 1;
    const url: string = `${process.env.REACT_APP_API}/libraries/search/findByClosed?closed=false&page=${nextPage}&size=5`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const parseData = await response.json();
    // the spread operator (...) is used to create a new array that contains the previous books (prevBooks) as well as the new books fetched from parseData._embedded.libraries. It is concating the array adding to the previos array...
    setResponses((prevBooks) => [...prevBooks, ...parseData._embedded.libraries]);
    setTotalResult(parseData.page.totalElements);
    setIsLoadingQuestionResponse(false);
    setPage(nextPage);
  };

  //handling response suubmit button
  async function handleSubmitResponse(questionId: number, questionResponse: string) {
    const url: string = `${process.env.REACT_APP_API}/libraries/secure/admin`
    if (authState?.isAuthenticated && questionId !== null && questionResponse !== '') {
      const adminResponse: AdminResponseModel = new AdminResponseModel(questionId, questionResponse);
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminResponse)
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok)
        throw new Error("Something went wrong");
      setIsResponseSubmitted(!isResponseSubmitted);
    }
  }


  if (httpError) {
    return (
      <div className="container m-5 text-center text-danger">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="m-3">
      {responses.length > 0 ?
        <>
          {displayWarning && <AlertMassage massage={alertMassage} />}
          <h4 className="mt-3">Pending Q/A :</h4>
          {isLoadingQuestionResponse && <SpinnerLoading />}
          <InfiniteScroll
            dataLength={responses.length}
            next={fetchMoreData}
            hasMore={responses.length !== totalResult}
            loader={<SpinnerLoading />}
          >
            {responses.map(response => (
              <AdminMassageItem key={response.id} response={response} handleSubmitResponse={handleSubmitResponse} setDisplayWarning={setDisplayWarning} setAlertMassage={setAlertMassage}/>
            ))}
          </InfiniteScroll>
        </>
        :
        <>
          {isLoadingQuestionResponse ? <SpinnerLoading /> :
            <h4 className="mt-3"> No Pending Q/A :</h4>
          }
        </>
      }
    </div>
  )
}