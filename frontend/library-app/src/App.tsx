import './App.css';
import { Homepage } from './layout/Hompage/Homepage';
import Footer from './layout/NavbarAndFooter/Footer';
import Navbar from './layout/NavbarAndFooter/Navbar';

function App() {
  
  return (
    <main className="App ">
      <Navbar/>
      <Homepage/>
      <Footer/>
    </main>
  );
}

export default App;
