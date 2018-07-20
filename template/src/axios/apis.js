//接口自动取参（取于vuex）
const author = state => state.userInf.user.account.author
const area = state => state.userInf.user.account.area
const author_area = {author,area}
//接口
export const DEMO = ['method', 'url', { load: true }]
export const LOGIN = ['get', 'sso/login']
export const USER_INF = ['get', 'sso/getUserInfo']
export const MAP = ['post', 'front/warning/queryForMap', { load: true, param: author_area }]
