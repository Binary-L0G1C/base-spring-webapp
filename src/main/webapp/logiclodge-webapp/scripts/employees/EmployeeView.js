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

			var that = this;

			this.employeeEditDialog = new EditEmployeeDialog({
				employee : this.model.toJSON(),
				saveEmployeeCallback : function (employee) {
					that.model.saveEmployee(employee);
				}
			});

			this.deleteDialog = new ConfirmDeleteDialog({
				name : this.model.get('name'),
				type : 'Employee',
				deleteCallback : function () {
					that.model.destroy();
				}
			});
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
				that.employeeEditDialog.show();
			});

			this.$el.find('.deleteEmployeeButton').button({
				icons: {
					secondary: 'ui-icon-trash'
				}
			}).on('click', function() {
				that.deleteDialog.show();
			});

			return this;
		}
	});

	return EmployeeView;
});
