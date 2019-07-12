
let ONLINE_ROOT_PATH

switch (process.env.NODE_ENV) {
  case 'development':
    // ONLINE_ROOT_PATH = '192.168.1.88:8082/'
    // ONLINE_ROOT_PATH = 'http://kyj.meixuanlife.com'
    ONLINE_ROOT_PATH = '/api'
    break
  case 'production':
    ONLINE_ROOT_PATH = 'http://5g.meixuanlife.com'
    break
  default:
    ONLINE_ROOT_PATH = 'http://5g.meixuanlife.com'
    break
}
export default {
  ONLINE_ROOT_PATH
}
