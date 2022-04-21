import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Navigation/NavBar";
import SiteRoutes from "./components/Navigation/SiteRoutes";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <SiteRoutes/>
    </div>
  );
}

export default App;
