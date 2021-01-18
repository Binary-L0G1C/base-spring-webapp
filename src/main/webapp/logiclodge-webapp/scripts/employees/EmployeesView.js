define([
		'jquery',
		'lodash',
		'backbone',
		'employees/EmployeeView',
		'employees/EmployeeCollection',
		'employees/EditEmployeeDialog',
		'text!employees/templates/employeeList.html'
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
		},

		render : function () {
			var that = this; 

			this.$el.html(this.template());

			this.collection.each(function (employee) {
				var employeeView = new EmployeeView({model : employee});
				that.$el.find('#employeeList').append(employeeView.render().el);
			});

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
