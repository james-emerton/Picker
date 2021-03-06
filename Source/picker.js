/*
---
description: MooTools form picker base class.
license: MIT-style
authors: [Christopher Pitt]
provides: [Picker]
requires: 
  core/1.2.4: [Class.Extras, Element.Dimensions]
...
*/

(function(context) {

	var z, Picker = new Class({
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
			'zIndex': 1,
            'triggerEvent': 'click',
            'delegates': null,
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
			z = this.options.zIndex;

			var self = this,
				doc = document.id(document.body),
				trigger = document.id(trigger),

				iframe = new Element('iframe', {
					'src': 'about:blank',
					'frameborder': 0,
					'scrolling': 'no',
					'class': self.options.prefix + 'iframe',
					'styles': {
						'position': 'absolute',
						'opacity': 0,
						'z-index': z++
					}
				}).inject(doc),

				container = new Element('div', {
					'class': self.options.prefix + 'container',
					'styles': {
						'position': 'absolute',
						'z-index': z++,
						'opacity': 0
					},
					'morph': self.options.morph
				}).inject(doc);

			self.trigger = trigger;
			self.iframe = iframe;
			self.container = container;
            self.currentElement = null;

            if(self.options.delegates) {
                var events = { };
                events[self.options.delegates] = function(e) {
                        self.fireEvent('trigger', [e]);
                        self.show(e.target);
                };

                // Use event delegation to bind activation event
                trigger.delegateEvent(self.options.triggerEvent, events);
            }
            else if(self.options.triggerEvent) {
                trigger.addEvent(self.options.triggerEvent, function(e) {
                    self.fireEvent('trigger', [e]);
                    self.show();
                });
            }

            container.addEvent('click', function(e) {
                self.fireEvent('click', [e]);
            });

			self.fireEvent('load');
		},
		'position': function()
		{
			var self = this,
				coords = this.currentElement.getCoordinates(),
				size = self.container
					.addClass('.picker-sizable')
					.getSize();

			self.iframe.setStyles({
				'top': coords[self.options.position.top],
				'left': coords[self.options.position.left],
				'width': size.x,
				'height': size.y
			});

			self.container
				.removeClass('.picker-sizable')
				.setStyles({
					'top': coords[self.options.position.top],
					'left': coords[self.options.position.left],
				});

			self.fireEvent('position', [coords, size]);
		},
		'show': function(el)
		{
            el = el || this.trigger;

            if(this.showing && el != this.currentElement)
                this.hide();

            this.currentElement = el;

			if (!this.showing)
			{
				this.showing = true;
				this.position();
				this.container.morph({
					'opacity': [1]
				});
				this.fireEvent('show', [this.currentElement]);
            }
		},
		'hide': function()
		{
			this.showing = false;
			this.container.morph({
				'opacity': [0]
			});
			this.fireEvent('hide', [this.currentElement]);
		}
	});

	context.Picker = Picker;

})(window ? window : this);
