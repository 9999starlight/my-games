<template>
  <transition appear name="fadeIn">
    <div class="loginContainer">
      <div class="loginOverlay" @click="closeLogin"></div>
      <div class="loginWrapper">
        <div class="formWrapper">
          <form class="loginForm flex">
            <font-awesome-icon
              :icon="['fa', 'window-close']"
              class="close"
              @click="closeLogin"
              title="Close"
            >
            </font-awesome-icon>
            <div class="formHeader flex flexCenter mgt2">
              <h2 v-if="!showSignUp" class="mgb1">Login</h2>
              <h2 v-else class="mgb1">Sign Up</h2>
              <p v-if="!showSignUp">
                Dont'have an account?&nbsp;
                <span @click="toggleSignUp" class="signupLink">Sign Up</span>
              </p>
              <p v-if="showSignUp">
                Already have an account?&nbsp;
                <span @click="toggleSignUp" class="signupLink"
                  >Sign in</span
                >
              </p>
            </div>
            <div class="formGroup">
              <label for="email" class="block">Email</label>
              <input type="email" v-model.trim="email" id="email" />
            </div>
            <div class="formGroup">
              <label for="password" class="block">Password</label>
              <input type="password" v-model.trim="password" id="password" />
            </div>
            <div class="messageWrapper">
              <transition name="expand">
                <p class="message" v-if="this.errorMessage !== ''">
                  {{ errorMessage }}
                </p>
              </transition>
            </div>
            <button
              v-if="!showSignUp"
              type="submit"
              class="btn loginBtn"
              @click.prevent="loginUser"
            >
              Login
            </button>
            <button
              v-if="showSignUp"
              type="submit"
              class="btn signUpBtn"
              @click.prevent="signUpUser"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { auth } from '../firebaseConfig'

export default {
  name: 'login',
  data () {
    return {
      showSignUp: false,
      email: '',
      password: '',
      errorMessage: '',
      timeSet: null
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeSet)
    this.timeSet = null
  },

  methods: {
    updateMessage (mess) {
      this.errorMessage = mess
      this.timeSet = setTimeout(() => {
        this.errorMessage = ''
      }, 4000)
    },

    // toggle login/sign up forms
    toggleSignUp () {
      this.showSignUp = !this.showSignUp
    },

    closeLogin () {
      this.$router.push('home')
    },

    validation () {
      const regEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
      if (!regEmail.test(this.email) || this.password.length < 6) {
        this.updateMessage('Invalid e-mail or password, please try again!')
        return false
      } else return true
    },

    // firebase functions for creating new account & login
    signUpUser () {
      const isValid = this.validation()
      if (!isValid) return
      else {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(data => {
            this.closeLogin()
          })
          .catch(err => {
            console.log(err.message)
            this.updateMessage(err.message)
          })
      }
    },

    loginUser () {
      const isValid = this.validation()
      if (!isValid) return
      else {
        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(res => {
            this.closeLogin()
          })
          .catch(err => {
            console.log(err.message)
            this.updateMessage(err.message)
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loginOverlay {
  @include boxSize($width: 100%, $minHeight: 100vh);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 2;
  background-image: linear-gradient(
    330deg,
    #943838bf 0%,
    #546e3bbd 25%,
    #278a8ae8 50%,
    #5c387e 75%,
    #875532c7 100%
  );
}

.loginWrapper {
  @include boxSize($height: 100vh, $width: 100vw);
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  background-color: transparent;
  z-index: 3;
  overflow: auto;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.096),
    0 6px 20px 0 rgba(0, 0, 0, 0.219);
}

.formWrapper {
  @include boxSize($height: 100%, $width: 100%);
}

.loginForm {
  @include boxSize($height: 100%);
  @include alignment(
    $direction: column,
    $justify: space-evenly,
    $align: center
  );
  color: darken($color: $turquoise, $amount: 30%);
  background-color: rgba(240, 242, 243, 0.658);
  // edge support
  @supports (-ms-ime-align: auto) {
        @include alignment($justify: space-around);
    }

  .close {
    @include fonts($size: 1.8rem, $color: rgba(68, 109, 126, 0.897));
    position: absolute;
    top: 5px;
    right: 5px;
    &:hover {
      opacity: 0.7;
    }
  }

  .formHeader {
    @include alignment($direction: column);
    color: darken($color: $turquoise, $amount: 25%);
    .signupLink {
      @include fonts($color: rgb(14, 92, 122), $weight: 700);
      cursor: pointer;
      text-decoration: underline;
      margin: 0 auto;
      &:hover {
        filter: brightness(40%);
      }
    }
  }

  .messageWrapper {
    text-align: center;
    margin: 0 1rem;
  }

  button {
    @include boxSize($width: 220px, $height: 40px);
    background-color: rgb(27, 170, 202);
    background-image: linear-gradient(180deg, #1faac1 0%, #106d82 100%);
    @include fonts($size: 1rem, $color: $white);
  }

  .signUpBtn {
    background-color: #ff3cef;
    background-image: linear-gradient(
      180deg,
      #ff3cef 0%,
      #bc2baf 50%,
      #c52bb3 100%
    );
  }
  .formGroup {
    text-align: left;
    input {
      @include boxSize($width: 250px);
      padding: 0.3rem 0;
      background-color: transparent;
      border-bottom: 1px solid darken($color: $turquoise, $amount: 20%);
      @include fonts(
        $size: 0.9rem,
        $color: darken($color: $turquoise, $amount: 30%)
      );
      -webkit-transition: all 2s ease-in-out;
      transition: all 0.2s ease-in-out;
      &:-webkit-autofill,
      &:focus:-webkit-autofill {
        box-shadow: 0 0 0 100px rgb(250, 255, 189) inset;
        -webkit-box-shadow: 0 0 0 100px rgb(250, 255, 189) inset;
      }
    }
  }
}

@media (min-width: 600px) {
  .loginWrapper {
    @include boxSize($width: 400px, $maxHeight: 500px);

    button {
      @include boxSize($width: 300px);
    }
    .formGroup {
      input {
        @include boxSize($width: 300px);
      }
    }
  }
}
</style>
