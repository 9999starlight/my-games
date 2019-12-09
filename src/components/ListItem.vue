<template>
  <div
    class="singleItem fullWidth pd1 mg1 grid"
    ref="itemId"
    v-bind:id="listItem.dbId"
  >
    <figure class="listImage">
      <img :src="listItem.image" alt="game image" class="block" />
    </figure>
    <div class="mainInfo flex sectionDiv">
      <h4 class="mgb1">{{ listItem.name }}</h4>
      <p class="mgb1"><strong>Year: </strong>{{ listItem.year }}</p>
      <p><strong>Genre: </strong>{{ listItem.genre }}</p>
    </div>
    <div class="linkAndFav">
      <a
      :href="listItem.gbLink"
      target="_blank"
      class="block link"
      title="Giant Bomb Details">
      Details
      </a>
      <p class="star" :class="{ yellow: listItem.favorite }">&#10031;</p>
      <button
        @click="addFavorite"
        :disabled="listItem.favorite"
        class="btn btnFavorite"
        title="Mark as favorite"
      >
        Add to favorites
      </button>
    </div>
    <div class="buttons flex flexCenter">
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
    addFavorite () {
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

    deleteItem () {
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
  border-top: inset 2px rgb(233, 238, 238);
  border-radius: 10px 40px 10px 40px;
  background: linear-gradient(
    to bottom,
    #787780 0%,
    #3b3a44 0%,
    #8287a1 0%,
    #3e3b3f 50%
  );
  box-shadow: $shadowBox;

  .sectionDiv {
    @include alignment($direction: column, $justify: flex-start);
    @include boxSize($height: 100%);
  }

  .listImage {
    @include boxSize($width: 70px, $height: 90px);
    grid-area: image;
    margin-bottom: 0.8rem;
    box-shadow: $shadowSmall;
    img {
      @include boxSize($width: 100%, $height: 100%);
      object-fit: cover;
    }
  }

  .mainInfo {
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
      background: linear-gradient(
        to bottom,
        rgba(43, 181, 142, 0.836) 0%,
        rgba(7, 84, 57, 0.808) 52%,
        rgba(8, 86, 61, 0.808) 54%,
        rgba(13, 105, 67, 0.836) 70% rgba(43, 181, 133, 0.849) 100%
      );
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
    .delete {
      @include fonts($color: rgb(216, 15, 55), $size: 1.6rem);
      padding: 0.7rem 0;
      text-shadow: 3px 3px 5px #000000;

      &:hover {
        filter: brightness(40%);
      }
    }
  }
}

@media (min-width: 768px) {
  .singleItem {
    grid-template-columns: 1fr 3fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "image mainInfo linkAndFav buttons";
    @include alignment($justifyGrid: start, $align: center, $textAlign: center);
    grid-row-gap: 0;

    .listImage {
      margin: 0;
    }

    .sectionDiv {
      @include alignment($justify: center, $align: center, $textAlign: left);
      @include fonts($size: 120%);
    }

    .mainInfo {
      @include alignment($align: flex-start);
    }

    .buttons {
      align-self: end;
      justify-self: end;
      margin-right: 1rem;
    }
  }
}
</style>
