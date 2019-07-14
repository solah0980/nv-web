<template>
  <div v-if="blog">
    <h1>Show Blog {{blog.id}}</h1>
    <div>
      <p>{{blog.title}}</p>
      <p>{{blog.content}}</p>
      <p>{{blog.thumbnail}}</p>
      <p>{{blog.status}}</p>
    </div>
  </div>
</template>
<script>
import BlogServices from "@/services/BlogServices";
export default {
  data() {
    return {
      blog: null
    };
  },
  async created() {
    let blogId = this.$route.params.blogId;
    this.blog = (await BlogServices.show(blogId)).data;
    console.log(this.blog);
  }
};
</script>
<style scoped>
</style>
