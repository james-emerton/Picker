Picker
======

This class is the basis for TimePicker, ColorPicker and DatePicker classes.

![Screenshot](http://github.com/sixtyseconds/Picker/raw/master/screen.png)

How to use
----------

	// A working demo has been included in the download.
	
	new Picker(pick, {
		'onTrigger': function(e)
		{
			//e.stop();
			//log.innerHTML += 'onTrigger fired<br />';
		},
		'onHide': function()
		{
			log.innerHTML += 'onHide fired<br />';
		}
	});