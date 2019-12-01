<template>
  <div
    class="singleItem fullWidth pd1 grid"
    ref="itemId"
    v-bind:id="listItem.dbId"
  >
    <img :src="listItem.image" alt="game image" class="block mg1" />
    <div class="mainInfo flex sectionDiv">
      <h4 class="mgb1">{{ listItem.name }}</h4>
      <p class="mgb1"><strong>Year: </strong>{{ listItem.year }}</p>
      <p><strong>Genre: </strong>{{ listItem.genre }}</p>
    </div>
    <div class="linkAndFav">
      <a :href="listItem.gbLink" target="_blank" class="block link">Details</a>
      <p class="star" :class="{ yellow: listItem.favorite }">&#10031;</p>
      <button @click="addFavorite" :disabled="listItem.favorite" class="btnFavorite">
        Add to favorites
      </button>
    </div>
    <div class="buttons flex sectionDiv">
      <font-awesome-icon
        :icon="['fa', 'trash-alt']"
        class="delete"
        @click="deleteItem"
        title="Remove from the list"
      >
      </font-awesome-icon>
    </div>
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
    addFavorite (e) {
      let id = this.$refs['itemId'].id
      db.collection('games')
        .doc(id)
        .update({
          favorite: true
        })
        .then(() => {
          this.$emit('updating')
        })
        .catch(err => {
          console.log(err.message)
        })
    },

    deleteItem (e) {
      let id = this.$refs['itemId'].id
      db.collection('games')
        .doc(id)
        .delete()
        .then(() => {
          this.$emit('updating')
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.singleItem {
  @include alignment($justifyGrid: center, $align: center, $textAlign: center);
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, 4);
  grid-template-areas:
    "image"
    "mainInfo"
    "linkAndFav"
    "buttons";
  grid-row-gap: 10px;
  border-bottom: inset 2px $turquoise;
  border-top: inset 2px rgb(55, 92, 88);
  border-radius: 10px 40px 10px 40px;
  background: linear-gradient(to bottom, #787780 0%, #3b3a44 0%, #8287a1 0%, #3e3b3f 50%);

  .sectionDiv {
    @include alignment($direction: column, $justify: flex-start);
    @include boxSize($height: 100%);
  }

  img {
    @include boxSize($width: auto, $height: 80px);
    grid-area: image;
  }

  .mainInfo {
    // @include alignment($direction: column, $justify: space-around);
    grid-area: mainInfo;

    p {
      @include fonts($size: 0.8rem);
    }

  }

  .linkAndFav {
    grid-area: linkAndFav;

    .link {
      color: darken($color: $yellow, $amount: 10%);
      text-decoration: underline;
    }

    .btnFavorite {
      background: linear-gradient(to bottom, rgba(43, 181, 142, 0.836) 0%,
      rgba(7, 84, 57, 0.808) 52%,
      rgba(8, 86, 61, 0.808) 54%,
      rgba(13, 105, 67, 0.836) 70%
      rgba(43, 181, 133, 0.849) 100%);
      padding: 0.3rem;
      padding: 7px 25px;
      @include fonts($color: $white, $size: 0.8rem);
    }

    .star {
      @include fonts($color: rgb(72, 73, 66), $size: 1.7rem);
      padding: 0.4rem;
    }

    .yellow {
      color: $yellow;
    }
  }

  .buttons {
    grid-area: buttons;
    // @include alignment($direction: column); 
    .delete {
      @include fonts($color: rgb(175, 11, 44), $size: 1.4rem);
      padding: 0.7rem 0;
      // align-self: flex-end;

      &:hover {
        filter: brightness(40%);
      }
    }
  }
}

@media(min-width:768px) {
  .singleItem {
    grid-template-columns: 1fr 3fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'image mainInfo linkAndFav buttons';
    @include alignment($justifyGrid: start, $align: center, $textAlign: center);
    grid-row-gap: 0;
    
     .sectionDiv {
       @include alignment($justify: center, $align: center, $textAlign: left);
     }

     .mainInfo {
       @include alignment($align: flex-start);
     }

    .buttons {
      @include alignment($justify: space-between);
    }
  }
}
</style>
