<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="book">
      <div class="container">
        <div class="main">
          <h1>{{book.title}}</h1>
          <p>
            <strong>Category:</strong>
            : {{ book.category }}
          </p>
          <p>
            <strong>Status:</strong>
            {{ book.status }}
          </p>
          <div class="content" v-html="book.content"></div>
        </div>
        <div class="back-nav">
          <router-link class="btn btn-success" :to="{name: 'books'}">
            <i class="fas fa-arrow-left"></i> Back..
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BooksServices from "@/services/BooksServices";
export default {
  data() {
    return {
      book: null
    };
  },
  async created() {
    let bookId = this.$route.params.bookId;
    this.book = (await BooksServices.show(bookId)).data;
    console.log(this.book);
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
