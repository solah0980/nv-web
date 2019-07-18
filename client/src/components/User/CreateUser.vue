<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="user" class="user-wrapper container">
      <h1>Create</h1>
      <div class="form">
        <form class="form-horizontal" v-on:submit.prevent="createUser">
          <div class="form-group">
            <label for class="control-label col-md-2">Name:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="user.name" required />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">Lastname:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="user.lastname" required />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">email:</label>
            <div class="col-md-8">
              <input class="form-control" type="email" v-model="user.email" required />
            </div>
          </div>
          <div class="form-group">
            <label for class="control-label col-md-2">New password:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="user.password" required />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-2">Type:</label>
            <div class="col-md-8">
              <select class="form-control" v-model="user.type" required>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-offset-2 col-md-8">
              <button class="btn btn-success" type="submit">
                <i class="fas fa-check"></i> Create
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
}
</style>
