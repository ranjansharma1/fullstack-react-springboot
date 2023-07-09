import './App.css';
import Carousel from './layout/Hompage/components/Carousel';
import ExploreNewBooks from './layout/Hompage/components/ExploreNewBooks';
import Heros from './layout/Hompage/components/Heros';
import { LibraryServices } from './layout/Hompage/components/LibraryServices';
import Navbar from './layout/NavbarAndFooter/Navbar';

function App() {
  
  return (
    <main className="App ">
      <Navbar/>
      <ExploreNewBooks/>
      <Carousel/>
      <Heros/>
      <LibraryServices/>
    </main>
  );
}

export default App;
