<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="blogs" class="container">
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
        <button class="btn btn-success" v-on:click="NavigateTo('/blog/create')">
          <i class="far fa-plus-square"></i> Create Blog
        </button>
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
                {{blog.createdAt | formatedDate}}
              </p>
              <p>
                <button class="btn btn-info" v-on:click="NavigateTo('/blog/'+blog.id)">
                  <i class="fas fa-book-open"></i> View Blog
                </button>
                <button class="btn btn-warning" v-on:click="NavigateTo('/blog/edit/'+blog.id)">
                  <i class="fas fa-edit"></i> Edit Blog
                </button>
                <button class="btn btn-danger" v-on:click="deleteBlog(blog)">
                  <i class="fas fa-trash-alt"></i> Delete Blog
                </button>
              </p>
              <p>
                <a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="suspend(blog.id)">
                  <i class="fas fa-ban"></i> Suspend
                </a>
                <a href="#" class="btn btn-success btn-sm" v-on:click.prevent="publish(blog.id)">
                  <i class="far fa-pause-circle"></i> Publish
                </a>
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
import moment from "moment";
import { mapState } from "vuex";
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
        name: "blogs"
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
    async deleteBlog(blogId) {
      let result = confirm("Want to delete this blog");
      if (result) {
        try {
          await BlogServices.delete(blogId);
          this.restart();
        } catch (error) {
          console.log(error);
        }
      }
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
    },
    async suspend(blogId) {
      let blog = {
        id: blogId,
        status: "suspend"
      };
      try {
        await BlogServices.put(blog);
        this.restart();
      } catch (error) {
        console.log(error);
      }
    },

    async publish(blogId) {
      let blog = {
        id: blogId,
        status: "published"
      };
      try {
        await BlogServices.put(blog);
        this.restart();
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: "login"
      });
    }
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
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
  },

  computed: {
    ...mapState(["isUserLoggedIn", "user"])
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
.search {
  width: 250px;
}
</style>
