	$('#editable-1').yeditable({
		inputAutoSize: true,
		inputAutoClass: true,
	});	$('#editable-2').yeditable({
		inputAutoSize: true,
		inputAutoClass: true,
		validate:function(oldValue,newValue){return newValue.length>10;}
	});	$('#editable-3').yeditable({
		inputAutoSize: true,
		inputAutoClass: true,
		inputType:'textarea'
	});