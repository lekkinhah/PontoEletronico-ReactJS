import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';

import ContentWrapper from './components/ContentWrapper';

import Login from './screens/Login';
import Register from './screens/Register';
import Admin from './screens/Admin';
import Worker from './screens/Worker';

import { client } from './graphql/client';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin">
            <ContentWrapper>
              <Admin />
            </ContentWrapper>
          </Route>
          <Route path="/worker">
            <ContentWrapper>
              <Worker />
            </ContentWrapper>
          </Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
