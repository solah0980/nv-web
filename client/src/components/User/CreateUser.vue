<template>
  <div>
    <h1>Create User</h1>
    <form v-on:submit.prevent="createUser">
      <p>
        name:
        <input type="text" v-model="user.name" />
      </p>
      <p>
        lastname:
        <input type="text" v-model="user.lastname" />
      </p>
      <p>
        email:
        <input type="text" v-model="user.email" />
      </p>
      <p>
        password:
        <input type="password" v-model="user.password" />
      </p>
      <p>
        <input type="submit" value="Create" />
      </p>
    </form>
    <div>
      <p>{{user.name}}</p>
      <p>{{user.lastname}}</p>
      <p>{{user.email}}</p>
      <p>{{user.password}}</p>
    </div>
  </div>
</template>
<script>
import UsersServices from "@/services/UsersServices";
export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active"
      }
    };
  },

  methods: {
    async createUser() {
      try {
        const respons = await UsersServices.post(this.user);
        this.$router.push({
          name: "users"
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
</style>
