<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="component-wrapper container" v-if="user.type == 'admin'">
      <h1>แสดงข้อมูลผู้ใช้งาน</h1>
      <div class="form-wrapper" v-if="user != null">
        <div class="form-horizontal">
          <div class="form">
            <div class="row">
              <label for class="col-md-1">Name:</label>
              <div class="col-md-10">
                <input class="form-control" type="text" v-model="user.name" disabled />
              </div>
            </div>
          </div>
          <div class="form">
            <div class="row">
              <label for class="col-md-1">LastName:</label>
              <div class="col-md-10">
                <input class="form-control" type="text" v-model="user.lastname" disabled />
              </div>
            </div>
          </div>
          <div class="form">
            <div class="row">
              <label for class="col-md-1">Email:</label>
              <div class="col-md-10">
                <input class="form-control" type="text" v-model="user.email" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="back-nav">
        <router-link class="btn btn-success" :to="{name: 'users'}">
          <i class="fas fa-arrow-left"></i> Back..
        </router-link>
      </div>
      <br />
    </div>
    <h1 v-else class="text-danger text-center mt-5">คุณไม่มีสิทธิ์เข้าถึง</h1>
  </div>
</template>
<script>
import UsersServices from "@/services/UsersServices";
import { mapState } from "vuex";
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
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style scoped>
.component-wrapper {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.component-wrapper h1 {
  text-align: center;
}
.form-wrapper {
  margin-top: 30px;
}
.back-nav {
  margin-top: 20px;
  text-align: center;
}
.form {
  margin-bottom: 15px;
}
label {
  padding-top: 5px;
  margin-right: 5px;
}
</style>
