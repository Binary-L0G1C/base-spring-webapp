define([
	'jquery', 
	'lodash',
	'backbone',
	'home/HomeView',
	'employees/EmployeesView'
], function ($, _, Backbone, HomeView, EmployeesView) {
	var Router = Backbone.Router.extend({
		initialize : function () {
			Backbone.history.start();
		},

		routes : {
			'' : 'home',
			'employees' : 'employees'
		},

		home : function () {
			this.homeView = new HomeView();
			this.homeView.render();
		},

		employees : function () {
			this.employeesView = new EmployeesView();
			this.employeesView.render();
		}
	});

	return Router;
});
