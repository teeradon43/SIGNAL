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
  EditPost,
  NotFound,
  Navbar,
  Admin,
  EventDetails,
  UserDetails,
  ReviewPage,
} from "./components";
import LoginNav from "./components/LoginNav";
import { auth } from "./database/firebase";
import { useState, useEffect } from "react";

function App() {
  //TODO: Add routes: userProfile, SpecificPost, CreatePost, Calendar, SearchPage
  let [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => authUnsubscribe(); //unsubscribe when component unmount
  }, []);

  const Navigation = user ? <Navbar /> : <LoginNav />;

  return (
    <Router>
      {Navigation}
      <Switch>
        <Route exact path="/" component={user ? MainPage : LoginPage} />
        <Route exact path="/main-page" component={MainPage} />
        <Route exact path="/create-post" component={CreatePost} />
        <Route exact path="/edit-post/:eventId" component={EditPost} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/Admin" component={Admin} />
        <Route exact path="/events/:eventId" component={EventDetails} />
        <Route exact path="/review-user/:userID" component={ReviewPage} /> {/*TODO: Use separate route+prop for user and event */}
        <Route exact path="/review-event/:eventID" component={ReviewPage} />
        <Route exact path="/u/:userId" component={UserDetails} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
