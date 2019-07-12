<template>
  <div v-if="user">
    <h1>Get Edit User {{user.id}}</h1>
    <form v-on:submit.prevent="editUser">
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
        <input type="text" v-model="user.password" />
      </p>
      <p>
        <input type="submit" value="แก้ไขข้อมูล" />
      </p>
    </form>
  </div>
</template>
<script>
import UsersServices from "@/services/UsersServices";
export default {
  data() {
    return {
      user: null
    };
  },

  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UsersServices.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async editUser() {
      try {
        await UsersServices.put(this.user);
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
