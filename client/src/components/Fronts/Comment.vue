<template>
  <div class="comment">
    <div class="comments-wrapper">
      <div class="comment-form-wrapper">
        <h4>Comments</h4>
        <form v-on:submit.prevent="sendComment">
          <p>
            <textarea rows="5" class="form-control" v-model="comment"></textarea>
          </p>
          <p v-if="user == null">Login / Register for comment</p>
          <p v-else>
            <button type="submit" class="btn btn-primary">Send Comment</button>
          </p>
        </form>
      </div>
      <transition-group tag="ul" name="fade" class="comment-list">
        <li v-for="comment in comments" v-bind:key="comment.id">
          <h4>user:{{comment.userId}}</h4>
          <p>{{comment.comment}}</p>
        </li>
      </transition-group>
    </div>
    <transition name="fade">
      <div v-if="resultUpdated != ''" class="popup-msg">
        <p>{{resultUpdated}}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import CommentsServices from "@/services/CommentsServices";
import { mapState } from "vuex";
export default {
  props: ["blogid", "userid"],
  data() {
    return {
      comment: null,
      comments: "",
      resultUpdated: ""
    };
  },
  methods: {
    async reloadComment() {
      try {
        this.comments = (await CommentsServices.blog(this.blogid)).data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendComment() {
      try {
        let comment = {
          blogId: this.blogid,
          comment: this.comment,
          userId: this.user.id
        };
        await CommentsServices.post(comment);
        this.comment = "";
        this.resultUpdated = "we are recieved";
        setTimeout(() => (this.resultUpdated = ""), 3000);
        this.reloadComment();
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.reloadComment();
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style scoped>
.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
}
.comment-form-wrapper {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 30px;
}
.comment-list li {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.popup-msg {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #ddd;
  background: #fff;
  max-width: 200px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
