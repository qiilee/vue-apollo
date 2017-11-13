import home from './components/home';

module.exports = function(VueRouter){
	const router = new VueRouter({
		routes:[
			{
				name:'home',
				path:'/',
				component: home
			}
		]
	})

	return router;
}