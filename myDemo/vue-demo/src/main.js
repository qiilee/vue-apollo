import Vue from 'vue'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import App from './App'

const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj9jbvp2387as0189u5fmer98',
  }),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)

new Vue({
  el: '#app',
  apolloProvider,
  template: '<App/>',
  components: { App }
})
