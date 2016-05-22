define([
		'jquery', 
		'lodash',
		'text!employees/templates/employeeEdit.html',
		'jquery-ui'
], function ($, _, employeeEditTemplate) {

	var DEFAULT_OPTIONS = {
		employee : {},
		destroyOnClose : false,
		saveEmployeeCallback : _.noop
	}

	function EditEmployeeDialog (options) {
		this._options = _.merge({}, DEFAULT_OPTIONS, options);

		var that = this;
		this.$el = $(this.template({
				model : this._options.employee
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
					that.saveEmployee($(this));
					that.close();
				},
				Cancel : function() {
					that.close();
				}
			},
			close: function() {
				that.form[ 0 ].reset();
				// allFields.removeClass( 'ui-state-error' );
			}
		});

		this.form = this.$el.find('form').on('submit', function (evnt) {
			evnt.preventDefault();
			that.saveEmployee($(this));
			that.close();
		});
	};

	EditEmployeeDialog.prototype = {
		constructor : EditEmployeeDialog,

		template : _.template(employeeEditTemplate),

		show : function () {
			this.$el.dialog('open');
			this.$el.find('.employee-edit-dob').datepicker();
		},

		close : function () {
			this.$el.dialog('close');
			if (this._options.destroyOnClose) {
				this.$el.dialog('destroy');
			}
		},

		saveEmployee : function ($form) {
			this._options.saveEmployeeCallback({
				name : $form.find('.employee-edit-name').val(),
				dateOfBirth : $form.find('.employee-edit-dob').val(),
				imageUrl : $form.find('.employee-edit-url').val()
			});
		},
	}
	
	return EditEmployeeDialog;
});