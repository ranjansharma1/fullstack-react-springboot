import './App.css';
import Carousel from './layout/Hompage/components/Carousel';
import ExploreNewBooks from './layout/Hompage/components/ExploreNewBooks';
import Navbar from './layout/NavbarAndFooter/Navbar';

function App() {
  
  return (
    <main className="App ">
      <Navbar/>
      <ExploreNewBooks/>
      <Carousel/>
    </main>
  );
}

export default App;
