<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="books" class="container">
      <div class="book-header">
        <h2>Management Book</h2>
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
        <button class="btn btn-success" v-on:click="NavigateTo('/book/create')">
          <i class="far fa-plus-square"></i> Create Book
        </button>
        <p>
          <strong>จำนวน Book</strong>
          {{books.length}}
        </p>
        <transition-group name="fade">
          <div v-for="book in books" v-bind:key="book.id" class="book-list">
            <div class="book-pic">
              <div class="thumbnail-pic" v-if="book.thumbnail != 'null'">
                <img :src="BASE_URL+book.thumbnail" alt="thumbnail" />
              </div>
            </div>
            <h3>{{book.title}}</h3>
            <div v-html="book.content.slice(0, 200) + '...'"></div>
            <div class="book-info">
              <p>
                <strong>Category:</strong>
                {{book.category}}
              </p>
              <p>
                <strong>create</strong>
                {{book.createdAt | formatedDate}}
              </p>
              <p>
                <strong>Prices</strong>
                {{book.prices | getNumberWithCommas}} บาท
              </p>
              <p>
                <button class="btn btn-info" v-on:click="NavigateTo('/book/'+book.id)">
                  <i class="fas fa-book-open"></i> View Book
                </button>
                <button class="btn btn-warning" v-on:click="NavigateTo('/book/edit/'+book.id)">
                  <i class="fas fa-edit"></i> Edit Book
                </button>
                <button class="btn btn-danger" v-on:click="deleteBook(book)">
                  <i class="fas fa-trash-alt"></i> Delete Book
                </button>
              </p>
              <p>
                <a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="suspend(book.id)">
                  <i class="fas fa-ban"></i> Suspend
                </a>
                <a href="#" class="btn btn-success btn-sm" v-on:click.prevent="publish(book.id)">
                  <i class="far fa-pause-circle"></i> Publish
                </a>
              </p>
            </div>
            <div class="clear-fix"></div>
          </div>
        </transition-group>
        <div v-if="books.length === 0 && loading === false" class="empty-book">***ไม่มีข้อมูล***</div>
        <div id="book-list-bottom">
          <div
            class="book-load-finished"
            v-if="books.length === result.length && result.length > 0"
          >โหลดข้อมูลครบแล้ว</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookServices from "@/services/BooksServices";
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
      books: [],
      result: [],
      search: "",
      category: [],
      loading: false
    };
  },
  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "books"
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
        this.books = [];
        this.result = [];
        this.result = (await BookServices.index(value)).data;
        this.appendResults();
        console.log(this.result);
        this.result.forEach(book => {
          if (this.category.length > 0) {
            if (this.category.indexOf(book.category) === -1) {
              this.category.push(book.category);
            }
          } else {
            this.category.push(book.category);
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
    async deleteBook(bookId) {
      let result = confirm("Want to delete this book");
      if (result) {
        try {
          await BookServices.delete(bookId);
          this.restart();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async restart() {
      try {
        this.books = (await BookServices.index()).data;
      } catch (error) {
        console.log(error);
      }
    },
    appendResults: function() {
      if (this.books.length < this.result.length) {
        let toAppend = this.result.slice(
          this.books.length,
          LOAD_NUM + this.books.length
        );
        this.books = this.books.concat(toAppend);
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
    async suspend(bookId) {
      let book = {
        id: bookId,
        status: "suspend"
      };
      try {
        await BookServices.put(book);
        this.restart();
      } catch (error) {
        console.log(error);
      }
    },

    async publish(bookId) {
      let book = {
        id: bookId,
        status: "published"
      };
      try {
        await BookServices.put(book);
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
    },
    getNumberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  beforeUpdate() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },

  updated() {
    let sens = document.querySelector("#book-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },

  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>
<style scoped>
.empty-book {
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
.book-info {
  float: left;
}
.book-pic {
  float: left;
}
.clear-fix {
  clear: both;
}
.book-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin: 0 auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.book-header {
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
.book-list-bottom {
  padding-top: 40px;
}
.book-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.search {
  width: 250px;
}
</style>
