<template>
<div id="app">
  <button @click="id='cj9jbwuz55e8m0165b3e4s066'">Change ID to cj9jbwuz55e8m0165b3e4s066</button>
  <button @click="id='cj9jbx63z6ck10143kvmj59xw'">Change ID to cj9jbx63z6ck10143kvmj59xw</button>
  <h3>From App.vue:</h3>
  <p>ID: {{id}}</p>
  <pre>{{Meetup}}</pre>
  <hr/>
  <SampleComponent :id="id"></SampleComponent>
</div>
</template>

<script>
import gql from 'graphql-tag'
import SampleComponent from './SampleComponent.vue'
export default {
  name: 'app',
  components: {
    SampleComponent
  },
  data() {
    return {
      id: 'cj9jbwuz55e8m0165b3e4s066',
      Meetup: []
    }
  },
  apollo: {
    Meetup: {
      query: gql `query Meetup($id: ID!){
        Meetup(id:$id){
          id
          name
        }
      }`,
      variables() {
        return {
          id: this.id
        }
      },
      fetchPolicy: 'cache-first'
    }
  }
}
</script>
