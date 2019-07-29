<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container" v-if="user.type == 'admin'">
      <h1>Get All User</h1>
      <div class="search-user">
        <form class="form-group">
          <div class="row">
            <div class="col-10">
              <input type="text" class="form-control" v-model="search" />
            </div>
            <div class="con-2 pt-2">
              <i class="fas fa-search"></i>
            </div>
          </div>
        </form>
      </div>
      <h4>
        <button class="btn btn-success" v-on:click="navigateTo('/users/create')">Create User</button>
      </h4>
      <div v-for="user in users" v-bind:key="user.id" class="main">
        <p>id: {{user.id}}</p>
        <p>name: {{user.name}}</p>
        <p>lastname: {{user.lastname}}</p>
        <p>email: {{user.email}}</p>
        <p>password: {{user.password}}</p>
        <p>
          status:
          <span v-if="user.status == 'pause'" class="text-danger">{{user.status}}</span>
          <span v-else class="text-success">{{user.status}}</span>
        </p>
        <button v-on:click="navigateTo('/user/' + user.id)" class="btn btn-info">View User</button>
        <button v-on:click="navigateTo('/user/edit/' + user.id)" class="btn btn-warning">Edit User</button>
        <button v-on:click="deleteUser(user)" class="btn btn-danger">Delete</button>
        <p class="mt-3">
          <a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="pauseUser(user.id)">
            <i class="fas fa-ban"></i> Pause
          </a>&nbsp;
          <a href="#" class="btn btn-success btn-sm" v-on:click.prevent="activeUser(user.id)">
            <i class="far fa-pause-circle"></i> Active
          </a>&nbsp;
        </p>
      </div>
    </div>
    <h1 v-else class="text-danger text-center mt-5">คุณไม่มีสิทธิ์เข้าถึง</h1>
  </div>
</template>
<script>
import UserServices from "@/services/UsersServices";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      users: [],
      search: ""
    };
  },

  watch: {
    search: _.debounce(async function() {
      const route = {
        name: "users"
      };
      if (this.search !== "") {
        route.query = {
          search: this.search
        };
      }
      console.log("search = " + this.search);
      this.$router.push(route);
    }, 700),

    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.users = (await UserServices.index(value)).data;
        console.log(this.users);
        console.log("aaa");
        this.search = value;
      }
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
    async pauseUser(userId) {
      let user = {
        id: userId,
        status: "pause"
      };
      try {
        await UserServices.put(user);
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },

    async activeUser(userId) {
      let user = {
        id: userId,
        status: "active"
      };
      try {
        await UserServices.put(user);
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },

    async refresh() {
      try {
        this.users = (await UserServices.index()).data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style scoped>
.main {
  margin-top: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
}
.search-user {
  width: 250px;
}
</style>
