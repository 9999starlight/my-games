<template>
  <div class="singleItem">
    <!-- <img :src="listItem.image" alt="game image" /> -->
    <h4>{{ listItem.name }}</h4>
    <p>{{ listItem.year }}</p>
    <p>{{ listItem.genre }}</p>
    <p>{{ listItem.gbLink }}</p>
    <p>{{ listItem.favorite }}</p>
    <button @click="addFavorite">Add to favorites</button>
    <font-awesome-icon
      :icon="['fa', 'trash-alt']"
      class="delete"
      @click="deleteItem"
      title="Remove from the list"
    ></font-awesome-icon>
  </div>
</template>
<script>
import { db } from '../firebaseConfig'
export default {
  name: 'ListItem',

  props: {
    listItem: {
      type: Object,
      required: true
    }
  },

  methods: {
    addFavorite () {},

    deleteItem () {}
  }
}
</script>
<style lang="scss" scoped></style>
