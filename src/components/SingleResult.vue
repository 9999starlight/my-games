<template>
  <div class="singleResultWrapper pd1 mgb1">
    <div class="singleResult grid">
      <img
        :src="result.image.medium_url"
        alt="game image"
        class="smallImage block"
      />
      <div class="gameInfo">
        <h3 class="mgb1">{{ result.name }}</h3>
        <p class="mgb1">
          Year:
          <strong>{{
            result.expected_release_year === null
              ? "N/A"
              : result.expected_release_year
          }}</strong>
        </p>
        <p class="mgb1">
          Type: <strong>{{ result.resource_type }}</strong>
        </p>
      </div>
      <button class="btn btnDetails" @click="toggleDetails()">
        More details &nbsp;<font-awesome-icon
          :icon="['fa', 'angle-double-down']"
          font-size="15px"
        ></font-awesome-icon>
      </button>
    </div>
    <gameDetails
      v-if="showDetails"
      :result="result"
      @closingDetails="toggleDetails"
    />
  </div>
</template>
<script>
import gameDetails from './GameDetails'

export default {
  name: 'SingleResult',

  data () {
    return {
      showDetails: false
    }
  },

  props: {
    result: {
      type: Object,
      required: true
    }
  },

  components: {
    gameDetails
  },
  methods: {
    toggleDetails () {
      this.showDetails = !this.showDetails
    }
  }
}
</script>
<style lang="scss" scoped>
.singleResultWrapper {
  background: linear-gradient(
    to bottom right,
    #000000d4 0%,
    rgba(33, 21, 43, 0.82) 51%,
    #000000cf 100%
  );
  background: -webkit-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.849) 0%,
    rgba(33, 21, 43, 0.82) 51%,
    rgba(0, 0, 0, 0.795) 100%
  );
  border-radius: 30px 30px 0px 0px;
  border: 2px inset #f5e7f5;
  box-shadow: $shadowBox;

  .singleResult {
    grid-template-columns: 3fr 5fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 30px;
    grid-gap: 10px;
    grid-template-areas:
      "smallImage gameInfo"
      "smallImage gameInfo"
      "smallImage gameInfo"
      "smallImage gameInfo"
      "btnDetails btnDetails";
    @include alignment($textAlign: left);
    padding: 1rem 1rem 0 1rem;
    @include fonts($color: $white);

    .smallImage {
      @include boxSize($height: auto, $width: 80px);
      grid-area: smallImage;
      box-shadow: $shadowSmall;
    }
    .gameInfo {
      grid-area: gameInfo;
      p {
        @include fonts($size: 0.8rem);
      }
    }

    .btnDetails {
      grid-area: btnDetails;
      @include boxSize($width: 100%);
      background: $turquoiseGradient;
      background-size: 600% 600%;
      @include fonts($color: $white, $size: 1rem);
      text-shadow: 2px 2px 4px #000;
      mask-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 0%,
        #fff 25%,
        #fff 75%,
        rgba(255, 255, 255, 0) 100%
      );
      -webkit-mask-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 0%,
        #fff 25%,
        #fff 75%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    @supports (-ms-ime-align: auto) {
      .btnDetails {
        background: rgba(201, 135, 218, 0.445);
        filter: brightness(80%);
      }
    }
  }
}

@media (min-width: 600px) {
  .singleResultWrapper {
    .singleResult {
      grid-template-columns: 1fr 4fr;
      grid-template-rows: 1fr 1fr 30px;
      grid-template-areas:
        "smallImage gameInfo"
        "smallImage gameInfo"
        "btnDetails btnDetails";
      max-height: 200px;

      .gameInfo {
        p {
          @include fonts($size: 1rem);
        }
      }
    }
  }
}
</style>
