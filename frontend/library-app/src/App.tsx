  import "./App.css";
import { Homepage } from "./layout/Hompage/Homepage";
import Footer from "./layout/NavbarAndFooter/Footer";
import Navbar from "./layout/NavbarAndFooter/Navbar";
import { SearchBookPage } from "./layout/SearchBookPage/SearchBookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./layout/NoPage";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <main className="App" style={{ flex: "1" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchBookPage />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="/checkout/:id" element={<BookCheckoutPage/>} />
          
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
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
