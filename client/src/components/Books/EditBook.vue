<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <h1>Edit Book</h1>
      <form v-on:submit.prevent="EditBook">
        <p>
          title:
          <input type="text" v-model="book.title" />
        </p>
        <div class="thumbnail-pic" v-if="book.thumbnail != null">
          <img :src="BASE_URL+book.thumbnail" alt="thumbnail" />
        </div>
        <form>
          <div class="dropbox">
            <input
              type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
              accept="image/*"
              class="input-file"
            />
            <p v-if="isInital">
              Drag your file(s) here to begin
              <br />on click to browse
            </p>
            <p v-if="isSaving">Uploading {{fileCount}} file...</p>
            <p v-if="isSuccess">Upload Successful.</p>
          </div>
        </form>
        <div>
          <transition-group tag="ul" name="fade" class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img :src="BASE_URL + picture.name" style="margin-bottom:5px;" alt="picture image" />
              <br />
              <button v-on:click.prevent="deletePhoto(picture)">Delete</button>
              <button v-on:click.prevent="thumbnail(picture.name)">Thumbnail</button>
            </li>
          </transition-group>
        </div>
        <div class="clearfix"></div>
        <p>content:</p>
        <p>
          <vue-ckeditor
            v-model.lazy="book.content"
            :config="config"
            @blur="onBlur($event)"
            @focus="onFocus($event)"
          />
        </p>
        <p>
          category:
          <input type="text" v-model="book.category" />
        </p>
        <p>
          <input type="submit" value="Create book" class="btn btn-success" />
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import BookServices from "@/services/BooksServices";
import VueCkeditor from "vue-ckeditor2";
import UploadServices from "@/services/UploadServices";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      book: {
        title: "",
        content: "",
        category: "",
        pictures: "null",
        thumbnail: null,
        status: "active"
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"]
        ],
        height: 300
      }
    };
  },
  methods: {
    async EditBook() {
      this.book.pictures = JSON.stringify(this.book.pictures);
      try {
        await BookServices.put(this.book);
        this.$router.push({
          name: "books"
        });
      } catch (error) {
        console.log(error);
      }
    },
    //method ckeditor
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    //method upload photo
    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },
    wait(ms) {
      return x => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.uploadedFileNames = [];
    },

    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadServices.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        //upload image uploaded display
        this.uploadedFileNames.forEach(uploadFilename => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
      }
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;

      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      this.save(formData);
    },

    clearUploadResult() {
      setTimeout(() => this.reset(), 5000);
    },

    //delete photo
    async deletePhoto(material) {
      let result = confirm("want to delete this photo");
      if (result) {
        let dataJSON = {
          filename: material.name
        };
        try {
          await UploadServices.delete(dataJSON);

          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].id === material.id) {
              this.pictures.splice(i, 1);
              this.pictureIndex--;
              break;
            }
          }
          console.log(this.pictures);
        } catch (error) {
          console.log(error);
        }
      }
    },

    thumbnail(filename) {
      this.book.thumbnail = filename;
    }
  },
  async mounted() {
    try {
      let bookId = this.$route.params.bookId;
      this.book = (await BookServices.show(bookId)).data;
      this.pictures = JSON.parse(this.book.pictures);
      console.log(this.pictures);
    } catch (error) {
      console.log(error);
    }
  },

  components: {
    VueCkeditor
  },

  created() {
    this.reset();
    this.config.toolbar = [
      {
        name: "document",
        items: [
          "Source",
          "-",
          "Save",
          "NewPage",
          "Preview",
          "Print",
          "-",
          "Templates"
        ]
      },
      {
        name: "clipboard",
        items: [
          "Cut",
          "Copy",
          "Paste",
          "PasteText",
          "PasteFromWord",
          "-",
          "Undo",
          "Redo"
        ]
      },
      {
        name: "editing",
        items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
      },
      {
        name: "forms",
        items: [
          "Form",
          "Checkbox",
          "Radio",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField"
        ]
      },
      "/",
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
          "-",
          "CopyFormatting",
          "RemoveFormat"
        ]
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "-",
          "Outdent",
          "Indent",
          "-",
          "Blockquote",
          "CreateDiv",
          "-",
          "JustifyLeft",
          "JustifyCenter",
          "JustifyRight",
          "JustifyBlock",
          "-",
          "BidiLtr",
          "BidiRtl",
          "Language"
        ]
      },
      { name: "links", items: ["Link", "Unlink", "Anchor"] },
      {
        name: "insert",
        items: [
          "Image",
          "Flash",
          "Table",
          "HorizontalRule",
          "Smiley",
          "SpecialChar",
          "PageBreak",
          "Iframe",
          "InsertPre"
        ]
      },
      "/",
      { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
      { name: "colors", items: ["TextColor", "BGColor"] },
      { name: "tools", items: ["Maximize", "ShowBlocks"] },
      { name: "about", items: ["About"] }
    ];
  },
  computed: {
    isInital() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  }
};
</script>
<style scoped>
.container {
  padding-top: 40px;
}
.clearfix {
  clear: both;
}
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
.pictures li {
  float: left;
}
.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.thumbnail-pic img {
  width: 200px;
}
</style>
