import "./App.css";
import { Homepage } from "./layout/Hompage/Homepage";
import Footer from "./layout/NavbarAndFooter/Footer";
import Navbar from "./layout/NavbarAndFooter/Navbar";
import { SearchBookPage } from "./layout/SearchBookPage/SearchBookPage";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { oktaConfig } from "./lib/oktaConfig";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import LoginWidget from "./auth/LoginWidget";
import { ReviewsListPage } from "./layout/BookCheckoutPage/ReviewComponents/ReviewsListPage";
import { BookSelfPage } from "./layout/BookSelfPage/BookSelfPage";
import { ServicesPage } from "./layout/ServicesPage/ServicesPage";
import { AdminMainPage } from "./layout/AdminPage/AdminMainPage";
import { RazorpayPayment } from "./layout/PaymentModel/RazorpayPayment";
import { PaymentStatusPage } from "./layout/PaymentModel/PaymentStatusPage";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="App" style={{ flex: "1" }}>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <Homepage />
          </Route>
          <Route path='/search'>
            <SearchBookPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </Route>
          <Route path='/reviewlist/:bookId'>
            <ReviewsListPage/>
          </Route>
          <Route path='/login' render={
            () => <LoginWidget config={oktaConfig} /> 
            } 
          />
          <Route path='/login/callback' component={LoginCallback} />

          
          {/* <SecureRoute> is not a built-in component provided by the library. Instead, it's typically a custom component that developers create to implement authentication and access control for certain routes. */}
          <SecureRoute path="/shelf">
            <BookSelfPage/>
          </SecureRoute>
          <SecureRoute path="/services">
            <ServicesPage/>
          </SecureRoute>
          <SecureRoute path="/admin">
            <AdminMainPage/>
          </SecureRoute>
          <SecureRoute path='/payment'>
            <RazorpayPayment/>
          </SecureRoute>
          <SecureRoute path='/paymentpage'>
            <PaymentStatusPage/>
          </SecureRoute>
        </Switch>
        </Security>
      </main>
      <Footer />
    </div>
  );
}

export default App;

/*
Notes:
<Route path="/checkout/:id" element={<BookCheckoutPage/>} />

/checkout/: This part of the path is a static segment, indicating that the URL should start with "/checkout/".

:id: This is a dynamic segment, indicated by the :id syntax. It signifies a placeholder in the URL for a specific value. The value assigned to id can vary and will be available as a parameter in the BookCheckoutPage component.


*/
