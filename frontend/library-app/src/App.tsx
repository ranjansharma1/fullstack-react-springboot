import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main className="App mt-5">
      <div>This app is working fine :) <button type="button" className='btn btn-primary mt-6' onClick={()=>{alert('Congratulations !!!')}}>Open Surprize</button></div>
    </main>
  );
}

export default App;
