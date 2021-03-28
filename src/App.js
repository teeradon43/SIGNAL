import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginPage, MainPage, NotFound } from "./components";
import Navbar from "./components/Navbar";
function App() {
  //TODO: Fix Routing -> Change BrowserRouter to Router repath by F0Nt
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={MainPage} />
      <Route path="/main-page" component={MainPage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
}

export default App;
