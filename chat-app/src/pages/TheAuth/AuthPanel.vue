<template>
  <base-badge>
    <div class="container">
      <form @submit.prevent="submitForm">
        <p v-if="!formIsValid">Invalid data</p>
        <div class="optionsBtn">
          <base-button @click.prevent @focus.prevent="changeLoginMode" :mode="loginMode ? 'filledBtn' : 'borderBtn'" :disabled="loginMode" >Sign In</base-button>
          <base-button @click.prevent @focus.prevent="changeLoginMode" :mode="loginMode ? 'borderBtn' : 'filledBtn'" :disabled="!loginMode">Sign Up</base-button>
        </div>
        <div class="textInput" v-if="!loginMode">
          <label for="firstName">first name</label>
          <input @keydown.enter="submitForm" type="text" name="firstName" v-model="firstName" autocomplete="name"/>
        </div>
        <div class="textInput" v-if="!loginMode">
          <label for="lastName">last name</label>
          <input @keydown.enter="submitForm" type="text" name="lastName" v-model="lastName" autocomplete="lastname"/>
        </div>
        <div class="textInput">
          <label for="email">email</label>
          <input @keydown.enter="submitForm" type="email" name="email" autocomplete="username" v-model="email"/>
        </div>
        <div class="passwordInput">
          <label for="password">password</label>
          <input @keydown.enter="submitForm"
            type="password" name="password" autocomplete="current-password" v-model="password" placeholder="*****"/>
        </div>
        <div class="passwordRepeatInput" v-if="!loginMode">
          <label for="repeatPassword">repeat password</label>
          <input @keydown.enter="submitForm" type="password" name="repeatPassword" autocomplete="current-password" v-model="repeatPassword" placeholder="*****"/>
        </div>
        <div class="loginBtn">
          <base-button mode="filledBtn">{{ submitButtonCaption }}</base-button>
        </div>
      </form>
    </div>
  </base-badge>
</template>

<script>
export default {
  data() {
    return {
      loginMode: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    changeLoginMode() {
      this.loginMode = !this.loginMode;
    },
    async submitForm() {
      let actionPayload = null;
      if (this.loginMode) {
        if (!this.email.includes('@') || this.password.length < 8) {
          this.formIsValid = false;
          return;
        }
        actionPayload = {
          email: this.email,
          password: this.password,
        };
      } else {
        if (
          this.firstName === '' ||
          this.lastName === '' ||
          !this.email.includes('@') ||
          this.password.length < 8 ||
          this.password !== this.repeatPassword
        ) {
          this.formIsValid = false;
          return;
        }
        actionPayload = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          repeatPassword: this.repeatPassword,
        };
      }
      try {
        if (this.loginMode) {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('register', actionPayload);
        }
        if (this.isLoggedIn) this.$router.replace('/');
      } catch (error) {
        this.error = error;
      }
    },
  },
  computed: {
    submitButtonCaption() {
      return this.loginMode ? 'Zaloguj' : 'Zarejestruj';
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

form p {
  margin: 1rem;
}

.optionsBtn {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.textInput,
.passwordInput,
.passwordRepeatInput {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  margin: 20px 10px 0 10px;
}

.textInput label,
.passwordInput label,
.passwordRepeatInput label {
  position: relative;
  left: 10px;
  color: hsl(0, 0%, 69%);
}

.textInput input,
.passwordInput input,
.passwordRepeatInput input {
  width: 100%;
  height: 40px;
  border: 2px solid hsl(0, 0%, 28%);
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin: 10px 0;
  outline: none;
  transition: 0.1s linear;
}

.textInput input:focus,
.passwordInput input:focus,
.passwordRepeatInput input:focus {
  border: 2px solid hsl(0, 0%, 28%);
}

.loginBtn {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin: 20px 0px 0px 0px;
}
</style>
