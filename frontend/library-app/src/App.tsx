import { Router } from "express";
import "./App.css";
import { Homepage } from "./layout/Hompage/Homepage";
import Footer from "./layout/NavbarAndFooter/Footer";
import Navbar from "./layout/NavbarAndFooter/Navbar";
import { SearchBookPage } from "./layout/SearchBookPage/SearchBookPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NoPage } from "./layout/NoPage";

function App() {
  return (
    <main className="App ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchBookPage />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
