import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { LoginPage, MainPage, NotFound } from "./components";
import Navbar from "./components/Navbar";
import LoginNav from "./components/LoginNav";

const LoginContainer = () => (
  <Router>
      <LoginNav/>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
  </Router>
)

const DefaultContainer = () => (
  <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
  </Router>
)

function App() {
  //TODO: Fix Routing -> Change BrowserRouter to Router repath by F0Nt
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginContainer}/>
        <Route exact path="/main-page" component={DefaultContainer}/>
      </Switch>
    </Router>
  );
}

export default App;
