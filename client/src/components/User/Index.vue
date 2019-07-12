<template>
  <div>
    <h1>Get All User</h1>
    <h4>
      <button v-on:click="navigateTo('/users/create')">Create User</button>
    </h4>
    <div v-for="user in users" v-bind:key="user.id">
      <p>{{user.id}}</p>
      <p>{{user.name}}</p>
      <p>{{user.lastname}}</p>
      <p>{{user.email}}</p>
      <button v-on:click="navigateTo('/user/' + user.id)">ดูข้อมูล</button>
      <button v-on:click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button>
      <button v-on:click="deleteUser(user)">ลบข้อมูล</button>
      <hr />
    </div>
  </div>
</template>
<script>
import UserServices from "@/services/UsersServices";
export default {
  data() {
    return {
      users: []
    };
  },

  async created() {
    try {
      this.users = (await UserServices.index()).data;
      console.log(this.users);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },

    async deleteUser(user) {
      let result = confirm("want to delete this user");
      if (result) {
        try {
          await UserServices.delete(user);
          this.refresh();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async refresh() {
      try {
        this.users = (await UserServices.index()).data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
</style>
