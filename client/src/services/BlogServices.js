import Api from './Api'

export default {
  index(blog) {
    return Api().get('/blogs')
  },

  show(blog) {
    return Api().get('/blog/' + blog.id, blog)
  },
  post(blog) {
    return Api().post('/blog', blog)
  },
  put(blog) {
    return Api().put('/blog/' + blog.id, blog)
  },
  delete(blog) {
    return Api().delete('/blog/' + blog.id, blog)
  }
}
