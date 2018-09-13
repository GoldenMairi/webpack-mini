// 接口自动取参（取于vuex）
const author = state => state.other.user.author
const area = state => state.other.user.area
// 接口
export const REP = ['get', '/user/repos', { load: true, param: { author, area } }]
