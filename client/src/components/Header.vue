<template>
  <div>
    <div class="navbar">
      <ul class="nav">
        <li>
          <router-link :to="{name:'blogs'}">Blogs</router-link>
        </li>
        <li>
          <router-link :to="{name:'users'}">Users</router-link>
        </li>
        <li>
          <router-link :to="{name:'blogs'}">comments</router-link>
        </li>
        <li>
          <router-link :to="{name:'login'}">Login</router-link>
        </li>
        <li>
          <a v-on:click="logout">Logout</a>
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
  </div>
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
.navbar {
  width: 100%;
  background-color: palegoldenrod;
  padding: 10px 0px 20px 0px;
}
.navbar .nav {
  list-style: none;
  margin: 0;
  padding: 10px;
}
.nav li {
  float: left;
}
.nav li a {
  padding: 10px;
  text-decoration: none;
  color: gray;
  font-weight: bold;
}
.nav li a:hover {
  padding: 10px;
  color: darkslategrey;
}
.nav li a.router-link-active {
  background-color: gold;
}
.clearfix {
  clear: left;
}
</style>
