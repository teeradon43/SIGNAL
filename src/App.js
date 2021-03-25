import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { LoginPage, MainPage, NotFound } from './components';

function App() {

  //TODO: Fix Routing
  return (
    <BrowserRouter>
      <Switch>
        <Route exact to="/login" component={LoginPage} />
        <Route to="/main-page" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
