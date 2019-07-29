import Api from './Api'

export default {
  index() {
    return Api().get('buys')
  },
  post(buy) {
    return Api().post('buy', buy)
  },
  user(buyId) {
    return Api().get('buy/' + buyId)
  },
  put(transection) {
    return Api().put('buy/' + transection.id, transection)
  }

}
