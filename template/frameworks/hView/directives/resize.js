export default {
	bind(el, binding) {
		function documentHandler(e) {
			if(binding.expression) {
				binding.value(e);
			}
		}
		el.__resize__ = documentHandler;
		window.addEventListener('resize', documentHandler);
	},
	unbind(el, binding) {
		window.removeEventListener('resize', el.__resize__);
		delete el.__resize__;
	}
};