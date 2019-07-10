
let ONLINE_ROOT_PATH, OFFLINE_ROOT_PATH

switch (process.env.NODE_ENV) {
  case 'development':
    ONLINE_ROOT_PATH = 'http://dpmanagement.17dianjia.net/api/'
    OFFLINE_ROOT_PATH = 'http://111.17dianjia.net/api/'
    break
  case 'production':
    ONLINE_ROOT_PATH = 'http://dpmanagement.dianjia001.com/api/'
    OFFLINE_ROOT_PATH = 'http://111.17dianjia.net/api/'
    break
  default:
    ONLINE_ROOT_PATH = 'http://dpmanagement.17dianjia.net/api/'
    OFFLINE_ROOT_PATH = 'http://111.17dianjia.net/api/'
    break
}
export default {
  ONLINE_ROOT_PATH,
  OFFLINE_ROOT_PATH
}
