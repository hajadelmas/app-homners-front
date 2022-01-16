import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";




const token = 'c9e4af15fd364a7dd10d7f4446945a';
const link = new HttpLink({
  uri: 'https://graphql.datocms.com/',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(
      headers || {},
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    )
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
