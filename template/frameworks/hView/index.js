const prefix = 'h';
import echarts from './components/echarts'
const iview = {
	echarts
}
const install = (Vue, opts = {}) => {
	Object.keys(iview).forEach(key => {
		Vue.component((opts.prefix || prefix)+ '-' + key, iview[key]);
	})
}
export default install;