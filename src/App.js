import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from "./apolloClient"
import Posts from "./Posts"

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Posts />
      </div>
    </ApolloProvider>
  );
}

export default App;
