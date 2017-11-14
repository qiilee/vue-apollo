<template>
<div>
  <h3>From SampleComponent.vue:</h3>
  <p>ID: {{id}}</p>
  <pre>{{Meetup}}</pre>
</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      Meetup: []
    }
  },
  props: ['id'],
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
      fetchPolicy: 'cache-only'
    }
  }
}
</script>
