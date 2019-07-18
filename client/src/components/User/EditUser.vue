<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="user" class="user-wrapper container">
      <h1>Edit User {{user.id}}</h1>
      <div class="form-wrapper">
        <form class="form-horizontal" v-on:submit.prevent="editUser">
          <div class="form-group">
            <label for class="control-label col-md-12">Name:</label>
            <div class="col-md-12">
              <input class="form-control" type="text" v-model="user.name" />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-12">Lastname:</label>
            <div class="col-md-12">
              <input class="form-control" type="text" v-model="user.lastname" />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-12">email:</label>
            <div class="col-md-12">
              <input class="form-control" type="text" v-model="user.email" />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-12">New password:</label>
            <div class="col-md-12">
              <input class="form-control" type="text" v-model="user.password" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-12">Type:</label>
            <div class="col-md-12">
              <select class="form-control" v-model="user.type">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-offset-2 col-md-8">
              <button class="btn btn-success" type="submit">
                <i class="fas fa-check"></i> Edit User
              </button>
              <button class="btn btn-default" type="button" v-on:click="back">Back</button>
            </div>
          </div>
        </form>
      </div>
    </div>
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

  async mounted() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UsersServices.show(userId)).data;
      this.user.password = "";
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
    },
    back() {
      this.$router.push({
        name: "users"
      });
    }
  }
};
</script>
<style scoped>
.user-wrapper {
  margin-top: 30px;
}
.user-wrapper h1 {
  text-align: center;
}
.form-horizontal {
  margin-top: 30px;
  width: 730px;
  margin: 0 auto;
}
</style>
