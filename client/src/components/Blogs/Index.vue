<template>
  <div>
    <h1>Show All Blog</h1>
    <button v-on:click="NavigateTo('/blog/create')">Create blog</button>
    <div v-for="blog in blogs" v-bind:key="blog.id">
      <p>{{blog.id}}</p>
      <p>{{blog.title}}</p>
      <p>{{blog.content}}</p>
      <p>{{blog.category}}</p>
      <p>{{blog.status}}</p>
      <button v-on:click="NavigateTo('/blog/'+ blog.id)">ดู blog</button>
      <button v-on:click="NavigateTo('/blog/edit/'+ blog.id)">แก้ไข blog</button>
      <button v-on:click="deleteBlog(blog)">ลบ blog</button>
      <hr />
    </div>
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
    try {
      this.blogs = (await BlogServices.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    NavigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blogId) {
      let result = confirm("Want to delete this blog");
      if (result) {
        try {
          await BlogServices.delete(blogId);
          console.log(ok);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
