<template>
  <div>
    <main-header navsel="front"></main-header>
    <div v-if="blogs" class="container">
      <div class="hero">
        <img src="@/assets/logo.png" alt="logo" style="float: left;" />
        <h1>Webblog from nodejs + vuejs Ebook</h1>
        <p>By Solah.Me</p>
      </div>
      <div class="clearfix"></div>
      <div class="blog-header">
        <h2>Management Blog</h2>
        <div class="search">
          <form class="form-group">
            <div class="row">
              <div class="col-10">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  placeholder="search"
                  v-model="search"
                />
              </div>
              <div class="con-2 pt-2">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </form>
        </div>
        <ul class="categories">
          <li
            v-for="cate in category"
            v-bind:key="cate.index"
            v-on:click.prevent="setCategory(cate)"
          >
            <a href="#">{{cate}}</a>
          </li>
          <li class="clear" v-on:click.prevent="clearCategory">
            <a href="#">Clear</a>
          </li>
        </ul>
        <div class="clear-fix"></div>
        <p>
          <strong>จำนวน Blog</strong>
          {{blogs.length}}
        </p>
        <transition-group name="fade">
          <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
            <div class="blog-pic">
              <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
                <img :src="BASE_URL+blog.thumbnail" alt="thumbnail" />
              </div>
            </div>
            <h3>{{blog.title}}</h3>
            <div v-html="blog.content.slice(0, 200) + '...'"></div>
            <div class="blog-info">
              <p>
                <strong>Category:</strong>
                {{blog.category}}
              </p>
              <p>
                <strong>create</strong>
                {{blog.createdAt}}
              </p>
              <p>
                <button class="btn btn-info" v-on:click="NavigateTo('/front/'+blog.id)">
                  <i class="fas fa-book-open"></i> View Blog
                </button>
              </p>
            </div>
            <div class="clear-fix"></div>
          </div>
        </transition-group>
        <div v-if="blogs.length === 0 && loading === false" class="empty-blog">***ไม่มีข้อมูล***</div>
        <div id="blog-list-bottom">
          <div
            class="blog-load-finished"
            v-if="blogs.length === result.length && result.length > 0"
          >โหลดข้อมูลครบแล้ว</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogServices from "@/services/BlogServices";
import _ from "lodash";
import ScrollMonitor from "scrollmonitor";
let LOAD_NUM = 3;
let pageWatcher;
export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      blogs: [],
      result: [],
      search: "",
      category: [],
      loading: false
    };
  },
  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "front"
      };
      if (this.search !== "") {
        route.query = {
          search: this.search
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),

    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.blogs = [];
        this.result = [];
        this.result = (await BlogServices.index(value)).data;
        this.appendResults();
        console.log(this.blogs);
        console.log(this.result);

        this.result.forEach(blog => {
          if (this.category.length > 0) {
            if (this.category.indexOf(blog.category) === -1) {
              this.category.push(blog.category);
            }
          } else {
            this.category.push(blog.category);
          }
        });
        this.loading = false;
        this.search = value;
      }
    }
  },
  methods: {
    NavigateTo(route) {
      this.$router.push(route);
    },

    async restart() {
      try {
        this.blogs = (await BlogServices.index()).data;
      } catch (error) {
        console.log(error);
      }
    },
    appendResults: function() {
      if (this.blogs.length < this.result.length) {
        let toAppend = this.result.slice(
          this.blogs.length,
          LOAD_NUM + this.blogs.length
        );
        this.blogs = this.blogs.concat(toAppend);
      }
    },

    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
      } else {
        this.search = keyword;
      }
    },
    clearCategory() {
      this.search = "";
    }
  },

  beforeUpdate() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },

  updated() {
    let sens = document.querySelector("#blog-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  }
};
</script>
<style scoped>
.empty-blog {
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: darksalmon;
  color: white;
}
.thumbnail-pic img {
  width: 200px;
  height: 130px;
  padding: 5px 10px 0px 0px;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clear-fix {
  clear: both;
}
.blog-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin: 0 auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 20px;
}
.categories {
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: paleturquoise;
  color: #000;
  text-decoration: none;
}
.categories .clear a {
  background: tomato;
  color: white;
}
.blog-list-bottom {
  padding-top: 40px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.hero {
  max-width: 900px;
  margin: 40px auto 0 auto;
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
.search {
  width: 250px;
}
</style>
