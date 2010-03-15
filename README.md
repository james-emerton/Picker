Picker
======

This class is the basis for TimePicker, ColorPicker and DatePicker classes.

![Screenshot](http://github.com/sixtyseconds/Picker/raw/master/screen.png)

How to use
----------

    window.addEvent('domready', function() {
        var log = document.id('log'),
            pick = document.id('pick'),
            picker = new Picker(pick, {
                /*'position':
                {
                    'left': 'left',
                    'top': 'bottom'
                },*/
                'onTrigger': function(e)
                {
                    e.stop();
                    log.innerHTML += 'onTrigger fired<br />';
                },
                'onLoad': function()
                {
                    log.innerHTML += 'onLoad fired<br />';
                },
                'onClick': function(e)
                {
                    log.innerHTML += 'onClick fired<br />';
                    picker.hide();
                },
                'onShow': function()
                {
                    log.innerHTML += 'onShow fired<br />';
                },
                'onHide': function()
                {
                    log.innerHTML += 'onHide fired<br />';
                },
                'onPosition': function(coordinates, size)
                {
                    log.innerHTML += 'onPosition fired<br />';
                }
            });
    });