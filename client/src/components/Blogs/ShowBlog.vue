<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="blog">
      <div class="container">
        <div class="main">
          <h1>{{blog.title}}</h1>
          <p>
            <strong>Category:</strong>
            : {{ blog.category }}
          </p>
          <p>
            <strong>Status:</strong>
            {{ blog.status }}
          </p>
          <div class="content" v-html="blog.content"></div>
        </div>
        <div class="back-nav">
          <router-link class="btn btn-success" :to="{name: 'blogs'}">
            <i class="fas fa-arrow-left"></i> Back..
          </router-link>
        </div>
      </div>
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
.container {
  margin-top: 80px;
}
.main {
  margin-top: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
}
.main h1 {
  text-align: center;
  font-family: "kanit";
  padding-bottom: 50px;
}
.main p {
  font-family: "kanit";
  font-size: 1.4em;
}
.content {
  font-family: "kanit";
  font-size: 1.2em;
}
.back-nav {
  margin-top: 20px;
  text-align: center;
}
</style>
