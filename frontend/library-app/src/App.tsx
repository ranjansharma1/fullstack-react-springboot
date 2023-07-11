import './App.css';
import { Homepage } from './layout/Hompage/Homepage';
import Footer from './layout/NavbarAndFooter/Footer';
import Navbar from './layout/NavbarAndFooter/Navbar';
import { SearchBookPage } from './layout/SearchBookPage/SearchBookPage';

function App() {
  
  return (
    <main className="App ">
      <Navbar/>
      {/* <Homepage/> */}
      <SearchBookPage/>
      <Footer/>
    </main>
  );
}

export default App;
