define([
		'jquery', 
		'lodash',
		'backbone',
		'common/ConfirmDeleteDialog',
		'employees/EditEmployeeDialog',
		'text!employees/templates/employee.html',
		'jquery-ui'
], function ($, _, Backbone, ConfirmDeleteDialog, EditEmployeeDialog, employeeTemplate) {
	var EmployeeView = Backbone.View.extend({
		tagName : 'div',

		template : _.template(employeeTemplate),

		initialize : function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render : function () {
			var that = this;

			this.$el.html(this.template({
				model : this.model.toJSON()
			}));

			this.$el.find('.employee').accordion({
				collapsible : true,
				active : false,
				heightStyle: 'content'
			});

			this.$el.find('.editEmployeeButton').button({
				icons: {
					secondary: 'ui-icon-pencil'
				}
			}).on('click', function() {
				new EditEmployeeDialog({
					employee : that.model.toJSON(),
					destroyOnClose : true,
					saveEmployeeCallback : function (employee) {
						that.model.saveEmployee(employee);
					}
				}).show();
			});

			this.$el.find('.deleteEmployeeButton').button({
				icons: {
					secondary: 'ui-icon-trash'
				}
			}).on('click', function() {
				new ConfirmDeleteDialog({
					name : that.model.get('name'),
					type : 'Employee',
					destroyOnClose : true,
					deleteCallback : function () {
						that.model.destroy();
					}
				}).show();
			});

			return this;
		}
	});

	return EmployeeView;
});
