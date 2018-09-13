// 接口自动取参（取于vuex）
const author = state => state.userInf.user.author
const area = state => state.userInf.user.area
// 接口
export const REP = ['get', '/user/repos', { load: true, param: { author, area } }]
