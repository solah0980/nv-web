<template>
  <div>
    <main-header navsel="front"></main-header>
    <div v-if="books" class="container">
      <div class="hero">
        <img src="@/assets/sopping.png" alt="logo" style="float: left;" class="logo" />
        <h1>Book Shoping Online</h1>
        <p>By Solah.Me</p>
      </div>
      <div class="clearfix"></div>
      <div class="book-header">
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
        <div class="container new-book mb-3">
          <h2>หนังสือมาใหม่</h2>
          <div class="row">
            <div class="col-md-3" v-for="book in newbook" v-bind:key="book.id">
              <div v-if="book.thumbnail != 'null'">
                <img class="img-responsive" :src="BASE_URL + book.thumbnail" alt="book" />
              </div>
              <h4>{{book.title}}</h4>
              <div v-html="book.content.slice(0, 200) + '...'"></div>
              <p>
                <strong>ราคา</strong>
                {{book.prices | getNumberWithCommas}} บาท
              </p>
              <div>
                <button
                  v-on:click.prevent="addCart(book)"
                  class="btn btn-danger btn-sm"
                >เพิ่มลงตะกร้า</button>
                <button v-on:click.prevent="NavigateTo('')" class="btn btn-info btn-sm">อ่านเพิ่ม</button>
              </div>
            </div>
          </div>
        </div>
        <h3>หนังสือทั้งหมด</h3>
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
                <button class="btn btn-info" v-on:click="NavigateTo('/front/'+book.id)">
                  <i class="fas fa-book-open"></i> View Blog
                </button>
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
      <transition name="fade">
        <div class="popup-cart">
          <h3>ตระกร้าสินค้า</h3>
          <ul>
            <li v-for="cart in carts" v-bind:key="cart.id">
              <div>{{cart.booktitle}} จำนวน{{cart.qty}} x {{cart.prices}}</div>
              <div>
                <button v-on:click.prevent="inc(cart)">+</button>
                <button v-on:click.prevent="dec(cart)">-</button>
              </div>
            </li>
          </ul>
          <hr />
          <p>รวมทั้งสิ้น {{total | getNumberWithCommas}}</p>
          <button class="btn btn-danger btn-xs" v-on:click.prevent="sendBuy">ทำการสั่งซื้อ</button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import BooksServices from "@/services/BooksServices";
import BuysServices from "@/services/BuysServices";
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
      newbook: [],
      carts: [],
      total: 0,
      result: [],
      search: "",
      category: [],
      loading: false
    };
  },

  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "shop"
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
        this.result = (await BooksServices.frontIndex(value)).data;
        this.appendResults();
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

    async restart() {
      try {
        this.books = (await BlogServices.frontIndex()).data;
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
    addCart(book) {
      console.log(book);
      if (!this.isUserLoggedIn) {
        alert("Please, Register or Login before.\n\nThank you.");
      } else {
        this.total += parseInt(book.prices);

        let found = false;
        this.carts.map(cart => {
          if (cart.bookid == book.id) {
            cart.qty++;
            found = true;
          }
        });

        if (!found) {
          let cart = {
            bookid: book.id,
            userid: this.user.id,
            qty: 1,
            clientStatus: "รอชำระเงิน",
            shopStatus: "รอส่ง",
            booktitle: book.title,
            username: this.user.name,
            userlastname: this.user.lastname,
            prices: book.prices
          };
          this.carts.push(cart);
          console.log(cart);
        }
      }
    },

    inc(item) {
      item.qty++;
      this.total += parseInt(item.prices);
    },
    dec(item) {
      item.qty--;
      this.total -= parseInt(item.prices);

      if (item.qty <= 0) {
        let i = this.carts.indexOf(item);
        this.carts.splice(i, 1);
      }
    },

    sendBuy() {
      this.carts.forEach(async cart => {
        try {
          await BuysServices.post(cart);
          this.$router.push({
            name: "cartlistClient"
          });
        } catch (error) {
          console.log(error);
        }
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

  async created() {
    let allbook = (await BooksServices.frontIndex()).data;
    this.newbook = allbook.slice(0, 4);
    console.log(this.newbook);
  },

  computed: {
    ...mapState(["user", "isUserLoggedIn"])
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
.hero {
  max-width: 900px;
  margin: 40px auto 0 auto;
  border-radius: 5px;
  background: linear-gradient(to right, #4776e6, #8e54e9);
  height: 250px;
  color: white;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
.hero .logo {
  width: 200px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
.search {
  width: 250px;
}
.img-responsive {
  width: 200px;
  height: 200px;
}
.popup-cart {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ddd;
  background: #fff;
  width: 360px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
