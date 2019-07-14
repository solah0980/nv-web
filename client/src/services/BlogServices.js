import Api from './Api'

export default {
  index(blog) {
    return Api().get('/blogs')
  },

  show(blogId) {
    return Api().get('/blog/' + blogId)
  },
  post(blog) {
    return Api().post('/blog', blog)
  },
  put(blog) {
    return Api().put('/blog/' + blog.id, blog)
  },
  delete(blog) {
    return Api().delete('/blog/' + blog.id)
  }
}