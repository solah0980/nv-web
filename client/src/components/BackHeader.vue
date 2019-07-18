<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li role="presentstation" class="nav-item">
            <router-link class="nav-link" :to="{name: 'blogs'}">Blogs</router-link>
          </li>
          <li role="presentstation" class="nav-item">
            <router-link class="nav-link" :to="{name: 'users'}">Users</router-link>
          </li>
          <li role="presentstation" class="nav-item">
            <router-link class="nav-link" :to="{name: 'blogs'}">Comments</router-link>
          </li>
          <li role="presentstation" class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}">Login</router-link>
          </li>
          <li role="presentstation" class="nav-item">
            <a class="nav-link" v-on:click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login"
      });
    }
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
nav {
  padding: 0.6rem 1rem 0 1rem;
}
a.router-link-active {
  color: yellowgreen !important;
}
</style>
