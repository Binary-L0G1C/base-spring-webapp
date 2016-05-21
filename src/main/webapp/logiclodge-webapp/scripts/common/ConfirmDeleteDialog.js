define([
		'jquery', 
		'lodash',
		'text!common/confirmDelete.html',
		'jquery-ui'
], function ($, _, confirmDeleteTemplate) {

	var DEFAULT_OPTIONS = {
		name : '&lt;name&gt;',
		type : '&lt;type&gt;',
		deleteCallback : _.noop
	}

	function ConfirmDeleteDialog (options) {
		this._options = _.merge({}, DEFAULT_OPTIONS, options);

		var that = this;
		this.$el = $(this.template({
			object : {
				name : this._options.name,
				type : this._options.type
			}
		})).dialog({
			autoOpen: false,
			resizable: false,
			height:240,
			width: 400,
			modal: true,
			buttons: {
				Delete: function() {
					$(this).dialog('close');
					that._options.deleteCallback.call();
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});
	};

	ConfirmDeleteDialog.prototype = {
		constructor : ConfirmDeleteDialog,

		template : _.template(confirmDeleteTemplate),

		show : function () {
			this.$el.dialog('open');
		},

		close : function () {
			this.$el.dialog('close');
		}
	}
	
	return ConfirmDeleteDialog;
});