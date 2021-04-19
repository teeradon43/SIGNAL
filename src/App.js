import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  LoginPage,
  MainPage,
  CreatePost,
  NotFound,
  Navbar,
  Admin,
  EventDetails,
  UserDetails,
} from "./components";
import LoginNav from "./components/LoginNav";
import { auth } from "./database/firebase";
import { useState, useEffect } from "react";

function App() {
  //TODO: Add routes: userProfile, SpecificPost, CreatePost, Calendar, SearchPage
  let [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }); //unsubscribe when component unmount
  }, []);

  const Navigation = user ? <Navbar /> : <LoginNav />;

  return (
    <Router>
      {Navigation}
      <Switch>
        <Route exact path="/" component={user ? MainPage : LoginPage} />
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/create-post" component={CreatePost} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/Admin" component={Admin} />
        <Route exact path="/events/:eventId" component={EventDetails} />
        <Route exact path="/u/:userId" component={UserDetails} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
