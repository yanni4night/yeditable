	$('.editable').yeditable({
		inputAutoSize: true,
		inputAutoClass: true,
		inputStyle: 'textarea',
		sync: 0,
		syncMethod: 'get',
		syncUrl: '/',
		syncSucceed: function(reponseData) {
			return 1;
		},
		onSyncFailed: function() {
			console.log('shit');
		},
		onValidate: function(oldValue, newValue) {
			return newValue;
		},
		onBeforeEdit: function(oldValue) {
			return true;
		},
		onAfterEdit: function(oldValue, newValue) {}
	});