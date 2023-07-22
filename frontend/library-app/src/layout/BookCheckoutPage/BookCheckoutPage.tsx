import { useEffect, useState } from "react";
import { Checkout } from "./Checkout";
import { StarsReview } from "./ReviewComponents/StarsReview";
import { LatestReview } from "./ReviewComponents/LatestReview";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import ReviewModel from "../../models/ReviewModel";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

/**
 * window.location.pathname.split("/")[2]:---------------------->
 *
 * window.location.pathname: returns the current URL path of the browser window. For example, if the URL is "https://example.com/checkout/123", window.location.pathname would be "/checkout/123".
 *
 * .split("/")[2]: It splits the path string into an array using the "/" character as the separator. In the above example, it would result in the array ["", "checkout", "123"].
 *                                                   0       1         2
 * 
 * 
 * const { authState } = useOktaAuth();: This line of code is using destructuring
 *                  assignment to extract authState, 
 *                  from the return value of the useOktaAuth hook.
 * authState: This represents the current authentication state of the user. 
 *            It contains information like whether the user is authenticated or not,
 *           the access token, and the user profile.
 * 
 * 
 * 
 * useState(()=>{...
 * },[authState, IsBookChecked]); * 
 *      The useEffect hook's dependency array determines when the effect should be re-executed. 
 *        In this case, including authState or IsBookChecked in the dependency array means 
 *        that the effect will be re-executed whenever the authState or IsBookChecked changes. 
 *        This is useful because if the user logs in or logs out, the authState will change,
 *         and you might want to fetch the user's checked-out book status again
 */

export const BookCheckoutPage = () => {
  const {authState}=useOktaAuth();

  //Book Checkout State
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([])
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  //Book Review Added By user
  const [isReviewAdded, setIsReviewAdded] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  //Current User checkout State
  const [totalCheckedBook, setTotalCheckedBook] = useState(0);
  const [isLoadingTotalCheckedBook, setIsLoadingTotalCheckedBook] = useState(true)

  //Is Book Checkout?
  const [isBookChecked, setIsBookChecked] = useState(false);
  const [isLoadingCheckoutBook, setIsLoadingCheckoutBook] = useState(true)

  const bookId = window.location.pathname.split("/")[2]; //check Note for more details
  // console.log(`Book ID  ` + bookId);

  const baseUrl: string = "http://localhost:8080/api";

  //It will load book for checkout
  useEffect(() => {
    const fetchBooks = async () => {
      const bookurl: string = `${baseUrl}/books/${bookId}`;
      // console.log("Bookurl: " + bookurl);

      const response = await fetch(bookurl);
      if (!response.ok) {
        throw new Error("Something Went wrong with fetch");
      }

      const responseJSON = await response.json();
      const loadedBookfromDatabase: BookModel = {
        id: responseJSON.id,
        title: responseJSON.title,
        author: responseJSON.author,
        description: responseJSON.description,
        copies: responseJSON.copies,
        copiesAvailable: responseJSON.copiesAvailable,
        category: responseJSON.category,
        img: responseJSON.img,
      };
      setBook(loadedBookfromDatabase);
      setisLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setisLoading(false);
      sethttpError(error.message);
    });
  }, [isBookChecked]);

  //It will show reviews
  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewurl: string = `${baseUrl}/reviews/search/findByBookId?bookId=${bookId}`;
      // console.log("reviewurl: " + reviewurl);
      const response = await fetch(reviewurl);
      const responseJSON = await response.json();
      const responseJSONData = responseJSON._embedded.reviews;
      const loadReviewsFromDatabse: ReviewModel[] = [];
      let totalRating:number=0;
      for (const key in responseJSONData) {
        loadReviewsFromDatabse.push({
          id: responseJSONData[key].id,
          book_id: responseJSONData[key].book_id,
          userEmail: responseJSONData[key].userEmail,
          date: responseJSONData[key].date,
          rating: responseJSONData[key].rating,
          reviewDescription: responseJSONData[key].reviewDescription,
        });
        totalRating=totalRating+responseJSONData[key].rating;
      }

      //This will execute when loadReviewFromDatabase is null
      if(loadReviewsFromDatabse){
        setTotalStars(Number((Math.round((totalRating / loadReviewsFromDatabse.length) * 2) / 2).toFixed(1)))
      }      
      setReviews(loadReviewsFromDatabse);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      sethttpError(error.message);
    });
  }, [isReviewAdded]); //It will reload whenever isReviewAdded value changed
  
  useEffect(()=>{
    const fetchUserReviewBook= async()=>{
      if(authState && authState.isAuthenticated){
        const bookReviewUrl:string=`${baseUrl}/reviews/secure?bookId=${bookId}`;
        console.log(bookReviewUrl);
        const requestOptions = {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              'Content-Type': 'application/json'
          }
        };
        const userReview = await fetch(bookReviewUrl, requestOptions);
        if(!userReview.ok)
          throw new Error(`Something Went Wrong`);
        const userReviewJSON= await userReview.json();
        setIsReviewAdded(userReviewJSON);
      }
      setIsLoadingUserReview(false);
    }
    fetchUserReviewBook().catch((error: any) => {
      setIsLoadingUserReview(false)
      sethttpError(error.message);
    });
  },[authState])

  /**It will count total book checkout for user
   * The if statement is using both authState and authState.isAuthenticated to 
   *    check if the user is authenticated. 
   *    The condition authState checks if authState is truthy (i.e., not null or undefined), 
   *    and then authState.isAuthenticated checks if the user is authenticated.
   * 
   */
  useEffect(()=>{
    const fetchUserCurrentCheckedBook=async () => {
      if(authState && authState.isAuthenticated ){
        const url= `${baseUrl}/books/secure/totalcheckedbooks`
        // console.log("current checkout url: " + url)
        const requestedOption={
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'content-type': 'application/json'
          }
        };
        const response = await fetch(url, requestedOption);
        if(!response.ok){
          throw new Error("Something Went Wrong");
        }
        const responseJSON= await response.json();
        // console.log("responseJSON: " + responseJSON);
        setTotalCheckedBook(responseJSON);
      }
      setIsLoadingTotalCheckedBook(false)
    }

    fetchUserCurrentCheckedBook().catch((error:any)=>{
      setIsLoadingTotalCheckedBook(false);
      sethttpError(error.massage);
    })

  },[authState,isBookChecked]);

  //It will check whether book has been checked or not
  useEffect(()=>{
    const fetchBookCheckoutState= async()=>{
      if(authState && authState.isAuthenticated){
        const url=`${baseUrl}/books/secure/ischeckout?bookId=${bookId}`;
        const requestedOption={
          method:'GET',
          headers:{
            Authorization:`Bearer ${authState.accessToken?.accessToken}`,
            'content-type': 'application/json'
          }
        }
        const response= await fetch(url,requestedOption);
        if(!response){
          throw new Error("Something went wrong");
        }
        const responseJSON=await response.json();
        setIsBookChecked(responseJSON);
      }
      setIsLoadingCheckoutBook(false);
    };

    fetchBookCheckoutState().catch((error:any)=>{
      setIsLoadingCheckoutBook(false);
      sethttpError(error.massage);
    });  

  },[authState]);//authstate will be executed, wheneve page is loaded , It will retain data


  async function checkoutBook(){
    const url=`${baseUrl}/books/secure/checkout?bookId=${bookId}`;
    console.log("url: " + url);
      const requestedOption={
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
        }
      }
      const response= await fetch(url,requestedOption);
      if(!response){
        throw new Error("Something went wrong");
      }
      setIsBookChecked(true);
  }

  async function submitReview(starRating: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
        bookId = book.id;
    }

    const reviewRequestModel = new ReviewRequestModel(starRating, bookId, reviewDescription);
    const url = `http://localhost:8080/api/reviews/secure`;
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewRequestModel)
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
        throw new Error('Something went wrong!');
    }
    setIsReviewAdded(true);
  }


  if (isLoading || isLoadingReview  || isLoadingTotalCheckedBook ||isLoadingCheckoutBook ||isLoadingUserReview) {
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
    <div className="container mt-5">
      <div className="row me-3">
        <div className="col-md-2 mt-3 d-flex justify-content-center">
          {/*The ?. operator is used to access the img property of the book object.*/}
          {book?.img ? (
            <img src={book?.img} width="151" height="233" alt="book" />
          ) : (
            <img
              src={require("../../images/BooksImages/book1.png")}
              width="151"
              height="233"
              alt="book"
            />
          )}
        </div>
        <div className="col-md-6 ">
          <div className="card pe-5 border-0">
            <div className="card-body">
              <h5 className="card-title">{book?.title}</h5>
              <h6 className="card-subtitle mb-2 text-primary">
                {book?.author}
              </h6>
              <p className="card-text">{book?.description}</p>
            </div>
          </div>
          <div>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <div className="col-md-4 d-flex my-3">
          <Checkout book={book} currentCheckedBook={totalCheckedBook} isBookChecked={isBookChecked} isAuthenticated={authState?.isAuthenticated} checkoutBook={checkoutBook} isReviewAdded={isReviewAdded} submitReview={submitReview}/>
        </div>
      </div>
      <hr />
      <LatestReview reviews={reviews} bookId={book?.id}/>
    </div>
  );
};
