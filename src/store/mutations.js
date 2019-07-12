import * as types from './type'
const mutations = {
  [types.SET_USER_INFO] (state, data) {
    state.userInfo = data
  },
  [types.OPEN_SLIDER] (state) {
    state.sidebar = !state.sidebar
  },
  [types.CHANGE_TABBAR] (state, index) {
    state.tabIndex = index
  },
  [types.USER_TYPE] (state) {
    state.userType = state
  }
}
export default mutations
