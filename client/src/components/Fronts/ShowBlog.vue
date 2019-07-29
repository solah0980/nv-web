<template>
  <div>
    <main-header navsel="front"></main-header>
    <div v-if="blog">
      <div class="container">
        <div class="hero">
          <img src="@/assets/logo.png" alt="logo" style="float: left;" />
          <h1>Webblog from nodejs + vuejs Ebook</h1>
          <p>By Solah.Me</p>
        </div>
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
          <router-link class="btn btn-success" :to="{name: 'front'}">
            <i class="fas fa-arrow-left"></i> Back..
          </router-link>
        </div>
      </div>
    </div>
    <comment v-if="blog" :blogid="blog.id" :user="user"></comment>
  </div>
</template>
<script>
import BlogServices from "@/services/BlogServices";
import { mapState } from "vuex";
import CommentsServices from "@/services/CommentsServices";
import Comment from "@/components/Fronts/Comment";
export default {
  data() {
    return {
      blog: null,
      comment: "",
      comments: "",
      resultUpdated: ""
    };
  },
  async created() {
    let blogId = this.$route.params.blogId;
    this.blog = (await BlogServices.show(blogId)).data;
  },

  components: {
    Comment
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style scoped>
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
.hero {
  max-width: auto;
  margin: 20px auto 0 auto;
  border-radius: 5px;
  background: darkcyan;
  height: 250px;
  color: white;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
</style>
