import { useParams } from "react-router-dom";
import book1 from "../../images/BooksImages/book1.png";
import { Checkout } from "./Checkout";
import { StarsReview } from "./ReviewComponents/StarsReview";
import { LatestReview } from "./ReviewComponents/LatestReview";

/**
 * window.location.pathname.split("/")[2]:---------------------->
 *
 * window.location.pathname: returns the current URL path of the browser window. For example, if the URL is "https://example.com/checkout/123", window.location.pathname would be "/checkout/123".
 *
 * .split("/")[2]: It splits the path string into an array using the "/" character as the separator. In the above example, it would result in the array ["", "checkout", "123"].
 *                                                   0       1         2
 */

export const BookCheckoutPage = () => {
  const bookId = window.location.pathname.split("/")[2];
  console.log(`BookCheckoutPage  ` + bookId);

  const id = useParams();
  console.log(`BookCheckoutPage  ` + id.toString());

  return (
    <div className="container mt-5">
      <div className="row me-3">
        <div className="col-md-2 mt-3 d-flex justify-content-center">
          <img src={book1} width="151" height="233" alt="book" />
        </div>
        <div className="col-md-6 ">
          <div className="card pe-5 border-0" >
            <div className="card-body">
              <h5 className="card-title">Book Title</h5>
              <h6 className="card-subtitle mb-2 text-primary">
                Book Author
              </h6>
              <p className="card-text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, ipsum quos. Fuga quasi, vitae quisquam
                exercitationem, ipsa aliquam, eius non labore perspiciatis alias
                earum! Iusto mollitia voluptas quae necessitatibus ea optio
                consectetur animi fuga et officia. Quidem ipsam in sequi
                doloremque doloribus nam eum deserunt eos dicta pariatur aliquid
                obcaecati architecto cum ut possimus, numquam, nulla ex. At,
                amet odio? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni quo ab sunt qui reprehenderit? Et quam optio doloribus nemo, assumenda aspernatur, beatae aliquam soluta temporibus impedit accusantium eveniet, debitis architecto nisi saepe libero hic dolor vero ducimus est. Sed officiis dolore ex voluptates. Iure aliquam soluta amet ullam! Quas repudiandae iusto hic incidunt esse. Doloribus alias aliquid sequi molestiae obcaecati!
              </p>
            </div>
          </div>
          <div>
          <StarsReview size={32}/>
          </div>
        </div>
        <div className="col-md-4 d-flex my-3">
        <Checkout/>
        </div>
      </div>
      <hr />
      <LatestReview/>
      
      
    </div>
  );
};
