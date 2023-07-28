import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import HistoryModel from "../../../models/HistoryModel";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";


export const HistoryBookPage = () => {

  const { authState } = useOktaAuth();

  const [bookHistories, setbookHistories] = useState<HistoryModel[]>([])
  const [isLoadingHistoryPage, setIsLoadingHistoryPage] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const baseUrl: string = 'http://localhost:8080/api';

  useEffect(() => {
    const fetchHistories = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${baseUrl}/histories/search/findBookByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
        console.log(url);
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const responseJSON = await response.json();
        const responseJSONData = responseJSON._embedded.histories;
        setbookHistories(responseJSONData);
        setIsLoadingHistoryPage(false);
      }
    }
    fetchHistories().catch((error: any) => {
      setIsLoadingHistoryPage(false);
      setHttpError(error.massage);
    });
  },[authState]);



  if (isLoadingHistoryPage) {
    return <SpinnerLoading />
  }
  if (httpError) {
    return (
      <div className="container m-5 text-center text-danger">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className='m-3'>
      {bookHistories.length > 0 ?
        <div>
          <h5>Recent History:</h5>
          {bookHistories.map(history => (
            <div key={history.id} className="card shadow my-5 rounded">
              <div className="row p-3 ">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                  {history.img ? (
                    <img src={history.img} width="123" height="196" alt="book" />
                  ) : (
                    <img src={require("../../../images/BooksImages/book1.png")} width="123" height="196" alt="default" />
                  )}
                </div>
                <div className="col-md-9 card-body">
                  <h5 className="card-subtitle text-secondary">{history.author}</h5>
                  <h4 className="card-title">{history.title}</h4>
                  <p>{history.description.slice(0, 300)}...</p>
                  <hr />
                  <p className="card-text text-success">Issued Date: {history.checkoutDate}</p>
                  <p className="card-text text-danger">Returned Date: {history.returnedDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        :
        <>
          <h3 className='mt-3'>Currently no history: </h3>
          <Link className='btn btn-primary' to={'search'}>
            Search for new book
          </Link>
        </>
      }
    </div>
  )
}
