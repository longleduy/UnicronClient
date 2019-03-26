import "regenerator-runtime/runtime";
import ReactDOM from 'react-dom'
import React, { Fragment } from 'react'
import { BrowserRouter,HashRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from "react-apollo"
import { ApolloLink,split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import { WebSocketLink } from 'apollo-link-ws'
import $ from 'jquery'
import 'typeface-roboto'
import Favicon from 'react-favicon'
import App from './App.jsx'
import Logo from "../public/images/logo/favicon.png"
//Todo: Utils
import {mutationUserInfo,mutationChatChanel} from './graphql/local/mutation'
import { getCacheLocalStorage } from './graphql/local/defaults'
import ApolloProviderPropsRender from './ApolloProviderHOC'
const cache = new InMemoryCache({
    dataIdFromObject: object => object.id
});
const wsLink = new WebSocketLink({
    uri: `${process.env.WSS}`,
    options: {
      reconnect: true,
    },
    credentials: 'include'
});
//Todo: Apollo link state
const stateLink = withClientState({
    cache,
    resolvers: {
        Mutation: {
            mutationUserInfo: mutationUserInfo,
            mutationChatChanel: mutationChatChanel
        }
    },
    defaults: getCacheLocalStorage()
})
//Todo: Apollo link context
const contextLink = setContext((_, { headers }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token != null && token != '') {
        return {
            headers: {
                ...headers,
                authorization: `Beare ${token}`
            }
        }
    }
})
//Todo: afterwareLink 
const afterWareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const context = operation.getContext();
        const { response: { headers } } = context;
        if (headers) {
            const newJWT = headers.get('x-refresh-token');
            if (newJWT) {
                localStorage.setItem('token', JSON.stringify(newJWT))
            }
        }
        return response;
    });
});
//Todo: Http link
const httpLink = createHttpLink({
    uri: `${process.env.HOST}`,
    credentials: 'include'
});
const link0 = ApolloLink.from([afterWareLink, httpLink]);
const link = ApolloLink.from([stateLink, contextLink, split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    wsLink,
    link0,
)]);
const client = new ApolloClient({
    cache,
    link
})
ReactDOM.render(<Fragment>
    <Favicon url={Logo} />
        <ApolloProviderPropsRender client={client} provider={() => {
            return <ApolloProvider client={client}>
                <HashRouter>
                    <App />
                </HashRouter>
            </ApolloProvider>
        }} />
</Fragment>, document.querySelector('#root'));
