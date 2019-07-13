<template>
  <div>
    <h1>Login User</h1>
    <form v-on:submit.prevent="login">
      <p>
        email:
        <input type="text" v-model="email" />
      </p>
      <p>
        password:
        <input type="password" v-model="password" />
      </p>
      <p>
        <input type="submit" value="Login" />
      </p>
    </form>
    <div v-if="error" class="error">{{error}}</div>
  </div>
</template>
<script>
import AuthenServices from "@/services/AuthenServices";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },

  methods: {
    async login() {
      try {
        const response = await AuthenServices.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "users"
        });
      } catch (error) {
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    }
  }
};
</script>
<style scoped>
.error {
  color: red;
}
</style>
