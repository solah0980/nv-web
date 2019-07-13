<template>
  <div>
    <h1>Show All Blog</h1>
  </div>
</template>
<script>
import BlogServices from "@/services/BlogServices";
export default {
  data() {
    return {
      blogs: []
    };
  },

  async created() {
    this.blogs = (await BlogServices.index()).data;
    console.log(this.blogs);
  }
};
</script>
<style scoped>
</style>
