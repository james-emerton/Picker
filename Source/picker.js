/*
---
description: MooTools form picker base class.

license: MIT-style

authors:
- Christopher Pitt

requires:
- core/1.2.4: Class.Extras
- core/1.2.4: Element.Dimensions

provides: [Picker]

...
*/

var Picker = new Class({
    'Implements': [Options, Events],
    'options':
    {
        /*
        'onLoad': $empty,
        'onPosition': $empty,
        'onShow': $empty,
        'onHide': $empty,
        'onClick': $empty,
        'onTrigger': $empty,
        */
        'prefix': 'picker-',
        'z-index': 1,
        'position':
        {
            'left': 'right',
            'top': 'top'
        },
        'morph':
        {
            'duration': 'short'
        }
    },
    'initialize': function(trigger, options)
    {
        this.setOptions(options);
        
        var self = this,
            doc = document.id(document.body),
            trigger = document.id(trigger),
            
            iframe = new Element('iframe', {
                'src': 'about:blank',
                'frameborder': 0,
                'scrolling': 'no',
                'class': self['options']['prefix'] + 'iframe',
                'styles': {
                    'position': 'absolute',
                    'opacity': 0,
                    'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)',
                    'z-index': self.options['z-index']
                }
            }).inject(doc),
            
            container = new Element('div', {
                'class': self['options']['prefix'] + 'container',
                'styles': {
                    'position': 'absolute',
                    'z-index': self.options['z-index'] + 1,
                    'opacity': 0
                },
                'morph': self.options['morph']
            }).inject(doc);
        
        self.trigger = trigger;
        self.iframe = iframe;
        self.container = container;
        
        trigger.addEvent('click', function(e) {
            self.fireEvent('onTrigger', [e]);
            self.show();
        });
        container.addEvent('click', function(e) {
            self.fireEvent('onClick', [e]);
        });
        
        self.fireEvent('onLoad');
    },
    'position': function()
    {
        var self = this,
            coords = self.trigger.getCoordinates(),
            size = self.container
                .addClass('.picker-sizable')
                .getSize();
        
        self.iframe.setStyles({
            'top': coords[self.options['position']['top']],
            'left': coords[self.options['position']['left']],
            'width': size.x,
            'height': size.y
        });
        
        self.container
            .removeClass('.picker-sizable')
            .setStyles({
                'top': coords[self.options['position']['top']],
                'left': coords[self.options['position']['left']]
            });  
        
        self.fireEvent('onPosition', [coords, size]);
    },
    'show': function()
    {
        if (!this.showing)
        {
            this.showing = true;            
            this.position();
            this.container.morph({
                'opacity': [1]
            });
            this.fireEvent('onShow');
        }
    },
    'hide': function()
    {
        this.showing = false;
        this.container.morph({
            'opacity': [0]
        });
        this.fireEvent('onHide');
    }
});