jQuery(document).ready(function($){

	var	scrolling = false;
	var contentSections = $('.cd-section'),
		verticalNavigation = $('.cd-vertical-nav'),
		navigationItems = verticalNavigation.find('a'),
		navTrigger = $('.cd-nav-trigger'),
		scrollArrow = $('.cd-scroll-down');

	// function updateSections() {
	// 	var halfWindowHeight = $(window).height()/2,
	// 		scrollTop = $(window).scrollTop();
	//
	// 	contentSections.each(function(){
	// 		var section = $(this),
	// 			sectionId = section.attr('id'),
	// 			navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');
	//
	// 		( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) ) ? navigationItem.addClass('active') : navigationItem.removeClass('active');
	// 	});
	// 	scrolling = false;
	// }

	// REWRITE OF FUNCTION
	function updateSections() {
		var halfWindowHeight = $(window).height()/2,
			scrollTop = $(window).scrollTop();

		contentSections.each(function(){
			var section = $(this),
				sectionId = section.attr('id'),
				navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');

			if ( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) ) {
				navigationItem.addClass('active');
			} else {
				navigationItem.removeClass('active');
			}
		});
		scrolling = false;
	}


	// function checkScroll() {
	// 	if( !scrolling ) {
	// 		scrolling = true;
	// 		(!window.requestAnimationFrame ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
	// 	}
	// }

	// REWRITE OF FUNCTION
	function checkScroll() {
		if ( !scrolling ) {
			scrolling = true;
		} else if ( !window.requestAnimationFrame ){
			setTimeout(updateSections, 300);
		} else {
			window.requestAnimationFrame(updateSections);
		}
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	300
        );
	}

	$(window).on('scroll', checkScroll);

	//smooth scroll to the selected section
	verticalNavigation.on('click', 'a', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    scrollArrow.on('click', function(event){
    	event.preventDefault();
        smoothScroll($(this.hash));
    });

	// open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNavigation.toggleClass('open');
    });



	$('.ro-select').filter(function() {
		var $this = $(this),
			$sel = $('<ul>', {
				'class': 'ro-select-list'
			}),
			$wr = $('<div>', {
				'class': 'ro-select-wrapper'
			}),
			$inp = $('<input>', {
				type: 'hidden',
				name: $this.attr('name'),
				'class': 'ro-select-input'
			}),
			$text = $('<div>', {
				'class': 'ro-select-text ro-select-text-empty',
				text: $this.attr('placeholder')
			});
		$opts = $this.children('option');

		$text.click(function() {
			$sel.show();
		});

		$opts.filter(function() {
			var $opt = $(this);
			$sel.append($('<li>', {
				text: $opt.text(),
				'class': 'ro-select-item'
			})).data('value', $opt.attr('value'));
		});
		$sel.on('click', 'li', function() {
			$text.text($(this).text()).removeClass('ro-select-text-empty');
			$(this).parent().hide().children('li').removeClass('ro-select-item-active');
			$(this).addClass('ro-select-item-active');
			$inp.val($this.data('value'));
		});
		$wr.append($text);
		$wr.append($('<i>', {
			'class': 'fa fa-caret-down ro-select-caret'
		}));
		$this.after($wr.append($inp, $sel));
		$this.remove();
	});
	//  --------------------------------
	// Google Maps
	// ---------------------------------

	// function initMap() {
	//     var mapDiv = document.getElementById('map');
	//     var map = new google.maps.Map(mapDiv, {
	//       center: {lat: 44.540, lng: -78.546},
	//       zoom: 8
	//     });
	//   }


	function initialize() {

		var season = new google.maps.LatLng(40.768882,-73.982598);

		var isDraggable = !('ontouchstart' in document.documentElement);

		var mapOptions = {
			zoom: 15,
			center: season,
			draggable: isDraggable,
			scrollwheel: false,
			backgroundColor: '#37C5F4',
			addressControl: true
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var image = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.5/images/marker-icon.png';

		var beachMarker = new google.maps.Marker({
			position: season,
			map: map,
			icon: image
		});



		// Resize snipper
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});

	}

	google.maps.event.addDomListener(window, 'load', initialize);

});

//  --------------------------------
// Pardot Forms
// ---------------------------------

piAId = '109722';
piCId = '2508';

pi = !window.pi ? {} : window.pi ;

if (!pi.tracker) {
	pi.tracker = {};
}

pi.tracker.pi_form = true;

(function() {
	function async_load() {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
		var c = document.getElementsByTagName('script')[0];
		c.parentNode.insertBefore(s, c);
	}
	if (window.attachEvent) {
		window.attachEvent('onload', async_load);
	} else {
		window.addEventListener('load', async_load, false);
	}
})();

var anchors = document.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
	var anchor = anchors[i];
	if (anchor.getAttribute("href") && !anchor.getAttribute("target")) {
		anchor.target = "_top";
	}
}

(function() {
	pardot.$(document).ready(function() {
		(function() {
			var $ = window.pardot.$;
			window.pardot.FormDependencyMap = [];

			$('.form-field-master input, .form-field-master select').each(function(index, input) {
				$(input).on('change', window.piAjax.checkForDependentField);
				window.piAjax.checkForDependentField.call(input);
			});
		})();
	});
})();
