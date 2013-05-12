/*
 * jQuery yEditable Plugin 0.0.1
 * https://github.com/yanni4night/yeditable
 *
 * Copyright 2013,yinyong
 * Email:yanni4night@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function($) {

	$.fn.yeditable = function(config) {

		var _config = defaultConfig = {
			inputAutoSize: true,
			inputAutoClass: false,
			styleClass: '',
			inputStyle: 'input', //input or textarea
			sync: false,
			syncMethod: 'get',
			syncUrl: '',
			composeSyncParam: function(oldValue, newValue) {
				return "data=" + newValue;
			},
			syncSucceed: function(reponseData) {
				return true;
			},
			onSyncFailed: function() {},
			convert: function(oldValue, newValue) {
				return newValue;
			},
			validate: function(oldValue, newValue) {
				return true;
			},
			onBeforeEdit: function(oldValue) {
				return true;
			},
			onAfterEdit: function(oldValue, newValue) {}
		},e,all,finishEdit,editDone,editBegin;

		config = config || {};
		for (e in defaultConfig) {
			_config[e] = config[e] || defaultConfig[e];
		}
		//Default input
		_config.inputStyle = /^(input|textarea)$/i.test(_config.inputStyle) ? _config.inputStyle : 'input';

		all = $(this);


		finishEdit = function(editable, hiddenInput, oldValue, newValue) {
			editable.text(newValue).show();
			hiddenInput.hide();
			//Invoke onAfterEdit
			_config.onAfterEdit.call(editable, oldValue, newValue);
		};


		editDone = function(editable, hiddenInput) {

			if (!hiddenInput.is(':visible')) return;

			var oldValue = editable.text(),
				newValue = hiddenInput.val()

				newValue = _config.convert.call(editable, oldValue, newValue);
			//Invoke onValidate
			if (!_config.validate.call(editable, oldValue, newValue)) return false;

			if (_config.sync) {
				$.ajax({
					url: _config.syncUrl,
					type: _config.syncMethod,
					data: _config.composeSyncParam.call(editable, oldValue, newValue),
					success: function(data) {
						if (_config.syncSucceed.call(editable, data)) {
							finishEdit(editable, hiddenInput, oldValue, newValue);
						} else {
							this.error();
						}
					},
					error: function() {
						_config.onSyncFailed.call(editable);
						finishEdit(editable, hiddenInput, newValue, oldValue);
					}
				});
			} else {
				finishEdit(editable, hiddenInput, oldValue, newValue);
			}

		};

		editBegin = function(editable, hiddenInput) {
			hiddenInput.val(editable.hide().text()).addClass(_config.inputAutoClass ? editable.attr('class') : styleClass).show().focus();
			_config.inputAutoSize && hiddenInput.css({
				width: editable.width() + "px",
				height: editable.height() + "px"
			});

		};


		$.each(all, function(i, v) {

			var hiddenInput = $('<' + _config.inputStyle + '/>').attr({
				type: 'text'
			}).css({
				display: 'none'
			}),editable = $(v);


			hiddenInput.insertBefore(editable);
			hiddenInput.on('blur', function() {
				editDone(editable, hiddenInput);
			});
			_config.inputStyle === 'input' && hiddenInput.on('keypress', function(e) {
				(e.keyCode == 13) && editDone(editable, hiddenInput);
			});

			editable.on('dblclick', function() {
				if (_config.onBeforeEdit.call(editable, editable.text(), hiddenInput.val())) {
					editBegin(editable, hiddenInput);
				}

			});

		}); //$.each

		return this;

	};

})(jQuery);