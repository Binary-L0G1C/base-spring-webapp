define([
		'jquery', 
		'lodash',
		'backbone',
		'employees/EmployeeModel',
		'text!common/confirmDelete.html',
		'text!employees/employee.html',
		'text!employees/employeeEdit.html',
		'jquery-ui'
], function ($, _, Backbone, Model, confirmEmployeeDeleteTemplate, employeeTemplate, employeeEditTemplate) {
	var EmployeeView = Backbone.View.extend({
		tagName : 'div',

		template : _.template(employeeTemplate),

		editTemplate : _.template(employeeEditTemplate),

		confirmDeleteTemplate : _.template(confirmEmployeeDeleteTemplate),

		initialize : function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);

			var that = this;

			this.employeeEditDialog = $(this.editTemplate({
				model : this.model.toJSON()
			})).dialog({
				autoOpen: false,
				height: 500,
				width: 450,
				modal: true,
				show: {
					effect: 'bounce',
					duration: 1500
				},
				hide: {
					effect: 'explode',
					duration: 500
				},
				buttons: {
					Save : function(){
						var $this = $(this);
						that.saveEmployee($this);
						$this.dialog('close');
					},
					Cancel : function() {
						$(this).dialog('close');
					}
				},
				close: function() {
					that.form[ 0 ].reset();
					// allFields.removeClass( 'ui-state-error' );
				}
			});

			this.deleteDialog = $(this.confirmDeleteTemplate({
				object : {
					name : this.model.get('name'),
					type : 'Employee'
				}
			})).dialog({
				autoOpen: false,
				resizable: false,
				height:240,
				modal: true,
				buttons: {
					Delete: function() {
						$(this).dialog('close');
						that.model.destroy();
					},
					Cancel: function() {
						$(this).dialog('close');
					}
				}
			});

			this.form = this.employeeEditDialog.find('form').on('submit', function( event ) {
				event.preventDefault();
				that.saveEmployee($(this));
				that.employeeEditDialog.dialog('close');
			});
		},

		saveEmployee : function ($form) {
			this.model.set({
				name : $form.find('#employee-edit-name').val(),
				dateOfBirth : $form.find('#employee-edit-dob').val(),
				imageUrl : $form.find('#employee-edit-url').val()
			});

			this.model.save();
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
				that.employeeEditDialog.dialog('open');
				$('.dob').datepicker();
			});

			this.$el.find('.deleteEmployeeButton').button({
				icons: {
					secondary: 'ui-icon-trash'
				}
			}).on('click', function() {
				that.deleteDialog.dialog('open');
			});

			return this;
		}
	});

	return EmployeeView;
});
