import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../graphQL/apollo-config'

export default function App({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}
