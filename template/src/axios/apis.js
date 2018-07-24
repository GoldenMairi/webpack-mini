// 接口自动取参（取于vuex）
const author = state => state.userInf.user.account.author
const area = state => state.userInf.user.account.area
const authorArea = {author, area}
// 接口
export const DEMO = ['method', 'url', { load: true }, { load: true, param: authorArea }]
export const REP = ['get', '/user/repos', { load: true }]
