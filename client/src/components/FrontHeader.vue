<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-fixed-top">
      <div class="container">
        <div class="logo">
          <a class="navbar-brand" href="#">
            <img src="../assets/logo.png" alt="logo" />
          </a>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa fa-bars text-white"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li role="presentstation" class="nav-item">
              <router-link class="nav-link" :to="{name: 'front'}">
                <i class="fas fa-home"></i> Home
              </router-link>
            </li>
            <li role="presentstation" class="nav-item">
              <router-link class="nav-link" :to="{name: 'shop'}">
                <i class="fas fa-store"></i> BookShop
              </router-link>
            </li>
            <li v-if="!isUserLoggedIn" role="presentstation" class="nav-item pt-2">
              <a v-on:click.prevent="showlogin = true" href="#">Login</a>
            </li>
            <transition name="fade">
              <li v-if="isUserLoggedIn" role="presentstation" class="nav-item pt-2">
                <router-link v-bind:to="{name: 'cartlistClient'}">
                  <i class="fas fa-user"></i>
                  {{user.name}}
                </router-link>
              </li>
            </transition>
            <li v-if="isUserLoggedIn" role="presentstation" class="nav-item">
              <a class="nav-link" v-on:click.prevent="logout">Logout</a>
            </li>
            <li v-if="!isUserLoggedIn" role="presentstation" class="nav-item pt-2">
              <a v-on:click.prevent="showRegister = true" href="#">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="modal" v-if="showlogin">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Client Login</h3>
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <label class="com-md-12">Email:</label>
              <div class="col-md-12">
                <input type="email" class="form-control" v-model="email" />
              </div>
            </div>
            <div class="form-group">
              <label class="com-md-12">Password:</label>
              <div class="col-md-12">
                <input type="password" class="form-control" v-model="password" />
              </div>
            </div>
            <div class="form-group d-flex justify-content-end">
              <button class="btn btn-success mr-3" type="submit">
                <i class="fas fa-sign-in-alt"></i> Sign In
              </button>
              <button class="btn btn-danger" v-on:click.prevent="showlogin = false">
                <i class="fas fa-times-circle"></i> Close
              </button>
            </div>
            <p>{{error}}</p>
          </form>
        </div>
      </transition>
    </div>
    <div class="modal" v-if="showRegister">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Register</h3>
          <form v-on:submit.prevent="Register">
            <div class="form-group">
              <label class="com-md-12">Name:</label>
              <div class="col-md-12">
                <input type="text" class="form-control" v-model="users.name" required />
              </div>
            </div>
            <div class="form-group">
              <label class="com-md-12">Lastname:</label>
              <div class="col-md-12">
                <input type="text" class="form-control" v-model="users.lastname" required />
              </div>
            </div>
            <div class="form-group">
              <label class="com-md-12">Email:</label>
              <div class="col-md-12">
                <input type="email" class="form-control" v-model="users.email" required />
              </div>
            </div>
            <div class="form-group">
              <label class="com-md-12">Password:</label>
              <div class="col-md-12">
                <input type="password" class="form-control" v-model="users.password" required />
              </div>
            </div>
            <div class="form mt-3 d-flex justify-content-end">
              <button class="btn btn-success mr-3" type="submit">
                <i class="fas fa-sign-in-alt"></i> Register
              </button>
              <button class="btn btn-danger" v-on:click.prevent="showRegister = false">
                <i class="fas fa-times-circle"></i> Close
              </button>
            </div>
            <p>{{error}}</p>
          </form>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-if="resuleUpdated" class="popup-msg">
        <p>{{resuleUpdated}}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import AuthenServices from "@/services/AuthenServices";
import UsersServices from "@/services/UsersServices";
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      users: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        type: "user"
      },
      showlogin: false,
      showRegister: false,
      resuleUpdated: "",
      error: null
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "front"
      });
    },

    async login() {
      try {
        const response = await AuthenServices.clientLogin({
          email: this.email,
          password: this.password
        });
        console.log(response);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.email = "";
        this.password = "";
        this.showlogin = false;
        this.resuleUpdated = "Login successful.";
        setTimeout(() => (this.resuleUpdated = ""), 3000);
      } catch (error) {
        this.email = "";
        this.password = "";
        this.error = error.response.data.error;
        console.log(error);
        setTimeout(() => (this.error = ""), 3000);
      }
    },
    async Register() {
      try {
        const response = await UsersServices.post(this.users);
        this.showRegister = false;
        this.users.name = "";
        this.users.lastname = "";
        this.users.email = "";
        this.users.password = "";
        this.resuleUpdated = "Register success.";
        setTimeout(() => (this.resuleUpdated = ""), 3000);
      } catch (error) {
        this.users.name = "";
        this.users.lastname = "";
        this.users.email = "";
        this.users.password = "";
        console.log(error);
        this.error = error.response.data.error;
      }
    }
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>
<style scoped>
.navbar-brand img {
  width: 36px;
  padding: 12px 0;
  margin-top: -20px;
}
ul {
  margin-top: -20px;
  padding-top: 8px;
}
ul li {
  margin-right: 15px;
  cursor: pointer;
}
ul li a {
  color: #dbdbf6 !important;
}
nav {
  padding: 0.6rem 1rem 0 1rem;
}
a.router-link-active {
  color: yellowgreen;
}
.navbar {
  background-color: #51415f;
}

.popup-msg {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ddd;
  background: #fff;
  max-width: 200px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.login-wrapper {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px #ddd;
  width: 550px;
  padding: 10px 30px 20px 30px;
  background-color: #fefefe;
  margin: 15% auto;
}
.login-wrapper h3 {
  text-align: center;
  padding-bottom: 10px;
}
</style>
