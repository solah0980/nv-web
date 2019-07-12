<template>
  <div v-if="user">
    <h1>Get User By Id {{user.id}}</h1>
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
  }
};
</script>
<style scoped>
</style>
