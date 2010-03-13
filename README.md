Time Picker
===========

This class provides a simple, easy-to-use time picker form control.

![Screenshot](http://www.sixtyseconds.co.za/playground/timepicker/screen.png)

How to use
----------

    window.addEvent('domready', function() {
        var pick = document.id('pick'),
            timepicker = new TimePicker(pick, {
                'onHide': function()
                {
                    pick.set('value', (this.hour || '00') + ':' + (this.minute || '00'));
                }
            });
    });
    
Requirements
------------

This class makes use of functions already existing in More's String.Extras package, yet they have been re-implemented (with changes to underlying changes) in order to remove the dependancy.