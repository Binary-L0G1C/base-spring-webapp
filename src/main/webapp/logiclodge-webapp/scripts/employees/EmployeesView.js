define([
		'jquery',
		'lodash',
		'backbone',
		'employees/EmployeeView',
		'employees/EmployeeCollection',
		'employees/EditEmployeeDialog',
		'text!employees/templates/employeeList.html',
		'backbonews'
], function ($, _, Backbone, EmployeeView, Collection, EditEmployeeDialog, employeesTemplate) {
	var EmployeesView = Backbone.View.extend({
		el : '#main',

		template : _.template(employeesTemplate),

		initialize : function () {
			var that = this; 

			this.collection = new Collection();
			this.collection.fetch();

			//this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'destroy', this.render);
			this.listenTo(this.collection, 'visible', this.toggleVisible);

			this.employeeEditDialog = new EditEmployeeDialog({
				saveEmployeeCallback : function (employee) {
					employee.id = _.uniqueId('-');
					that.collection.create(employee);
				}
			});

			this.ws = new Backbone.WS('ws://127.0.0.1:8080/spring-websocket-test/echo');

			this.ws.ready.then(function (instance) {
					console.log('On air!');
					that.ws.send(42);
				}, function (error) {
					console.error('Failed to connect!', error);
			});

			this.collection.on('ws:message:update', function (data) {
				console.log(data);
			});
		},

		render : function () {
			var that = this; 

			this.$el.html(this.template());

			this.collection.each(function (employee) {
				var employeeView = new EmployeeView({model : employee});
				this.$el.find('#employeeList').append(employeeView.render().el);
			}, this);

			this.$el.find('.addEmployeeButton').button({
				icons : {
					secondary: 'ui-icon-person'
				}
			}).on('click', function () {
				that.employeeEditDialog.show();
			});
		}
	});

	return EmployeesView;
});
