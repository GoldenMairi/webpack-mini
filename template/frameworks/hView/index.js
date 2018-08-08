const prefix = 'h';
import echarts from './components/echarts'
import asider from './components/asider'
const iview = {
	echarts,
	asider
}
const install = (Vue, opts = {}) => {
	Object.keys(iview).forEach(key => {
		Vue.component((opts.prefix || prefix)+ '-' + key, iview[key]);
	})
}
export default install;