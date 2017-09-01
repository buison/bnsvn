/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}
			else {
				self.options.onCheck();
				self.timeline.replay();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

	// grid items:
	var items = [].slice.call(document.querySelectorAll('ol.grid > .grid__item'));

	function init() {
		/* Icon 8 */
		var el8 = items[0].querySelector('button.icobutton'), el8span = el8.querySelector('span');
		var scaleCurve8 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
		new Animocon(el8, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: 			el8,
					count: 				28,
					radius: 			{50:110},
					children: {
						fill: 			'#E91E63',
						opacity: 		0.6,
						radius: 		{'rand(5,20)':0},
						scale: 			1,
						swirlSize: 	15,
						duration: 	1600,
						easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1),
						isSwirl: 		true
					}
				}),
				// burst animation
				new mojs.Burst({
					parent: 	el8,
					count: 		18,
					angle: 		{0:10},
					radius: 	{140:200},
					children: {
						fill: 			'#E91E63',
						shape: 			'line',
						opacity: 		0.6,
						radius: 		{'rand(5,20)':0},
						scale: 			1,
						stroke: 		'#E91E63',
						strokeWidth: 2,
						duration: 	1800,
						delay: 			300,
						easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
					}
				}),
				// burst animation
				new mojs.Burst({
					parent: 	el8,
					radius: 	{40:80},
					count: 		18,
					children: {
						fill: 			'#E91E63',
						opacity: 		0.6,
						radius: 		{'rand(5,20)':0},
						scale: 			1,
						swirlSize:  15,
						duration: 	2000,
						delay: 			500,
						easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1),
						isSwirl: 		true
					}
				}),
				// burst animation
				new mojs.Burst({
					parent: 	el8,
					count: 		20,
					angle: 		{0:-10},
					radius: 	{90:130},
					children: {
						fill: 			'#E91E63',
						opacity: 		0.6,
						radius: 		{'rand(10,20)':0},
						scale: 			1,
						duration: 	3000,
						delay: 			750,
						easing: 		mojs.easing.bezier(0.1, 1, 0.3, 1)
					}
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 400,
					easing: mojs.easing.back.out,
					onUpdate: function(progress) {
						var scaleProgress = scaleCurve8(progress);
						el8span.style.WebkitTransform = el8span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
					}
				})
			],
			onCheck : function() {
				el8.style.color = '#E91E63';
			},
			onUnCheck : function() {
				el8.style.color = '#C0C1C3';	
			}
		});
		/* Icon 8 */

		// bursts when hovering the mo.js link
		var molinkEl = document.querySelector('.special-link'),
			moTimeline = new mojs.Timeline(),
			moburst1 = new mojs.Burst({
				parent: molinkEl,
				count: 6,
				left: '0%',
				top: '-50%',
				radius: {0:60},
				children: {
					fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					duration: 1300,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}
			}),
			moburst2 = new mojs.Burst({
				parent: molinkEl,
				left: '-100%', top: '-20%',
				count: 14,
				radius: {0:120},
				children: {
					fill: [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					duration: 1600,
					delay: 100,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}
			}),
			moburst3 = new mojs.Burst({
				parent: molinkEl,
				left: '130%', 
				top: '-70%',
				count: 8,
				radius: {0:90},
				children: {
					fill: [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					duration: 1500,
					delay: 200,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}
			}),
			moburst4 = new mojs.Burst({
				parent: molinkEl,
				left: '-20%', 
				top: '-150%',
				count: 14,
				radius: {0:60},
				children: {
					fill: [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					duration: 2000,
					delay: 300,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}
			}),
			moburst5 = new mojs.Burst({
				parent: molinkEl,
				count: 12,
				left: '30%', top: '-100%',
				radius: {0:60},
				children: {
					fill: [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					duration: 	1400,
					delay: 400,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}
			});

		moTimeline.add(moburst1, moburst2, moburst3, moburst4, moburst5);
		molinkEl.addEventListener('mouseenter', function() {
			moTimeline.replay();
		});
	}
	
	init();

})(window);