jQuery(document).ready(function($){

	var	scrolling = false;
	var contentSections = $('.cd-section'),
		verticalNavigation = $('.cd-vertical-nav'),
		navigationItems = verticalNavigation.find('a'),
		navTrigger = $('.cd-nav-trigger'),
		scrollArrow = $('.cd-scroll-down');
		accordionHeaders = $('.accordion-title');
		registerMobile = $('.cd-nav-trigger-register');

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
		registerMobile.toggleClass('register-open');
    });

	accordionHeaders.on('click', function(event){
		event.preventDefault();
		$(this).find('.fa-angle-double-down, .fa-angle-double-up').toggleClass("fa-angle-double-down fa-angle-double-up");
	});


	//  --------------------------------
	// TESTIMONALS
	// ---------------------------------
	//create the slider
	$('.cd-testimonials-wrapper').flexslider({
		selector: ".cd-testimonials > li",
		animation: "slide",
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		start: function(){
			$('.cd-testimonials').children('li').css({
				'opacity': 1,
				'position': 'relative'
			});
		}
	});

	//open the testimonials modal page
	$('.cd-see-all').on('click', function(){
		$('.cd-testimonials-all').addClass('is-visible');
		document.body.style.overflow = "hidden";
	});

	//close the testimonials modal page
	$('.cd-testimonials-all .close-btn').on('click', function(){
		$('.cd-testimonials-all').removeClass('is-visible');
		document.body.style.overflow = "visible";
	});
	$(document).keyup(function(event){
		//check if user has pressed 'Esc'
		if(event.which=='27'){
			$('.cd-testimonials-all').removeClass('is-visible');
			document.body.style.overflow = "visible";
		}
	});

	//build the grid for the testimonials modal page
	$('.cd-testimonials-all-wrapper').children('ul').masonry({
		itemSelector: '.cd-testimonials-item'
	});



	//  --------------------------------
	// Footer Carousel
	// ---------------------------------

	$('.flexslider').flexslider({
	    animation: "slide",
	    animationLoop: false,
	    itemWidth: 210,
	    itemMargin: 5,
	    minItems: 2,
	    maxItems: 4,
		controlsContainer: $(".custom-controls-container"),
    	customDirectionNav: $(".custom-navigation a")
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

		var season = new google.maps.LatLng(41.8896195,-87.6222803);

		var isDraggable = !('ontouchstart' in document.documentElement);

		var mapOptions = {
			zoom: 17,
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


	//  --------------------------------
	// Pardot Forms
	// ---------------------------------

	piAId = '109722';
	piCId = '2508';

	pi = !window.pi ? {} : window.pi ;

	pi.tracker.pi_form = !pi.tracker ? {} : true ;

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


});
	// (function() {
	// 	pardot.$(document).ready(function() {
	// 		(function() {
	// 			var $ = window.pardot.$;
	// 			window.pardot.FormDependencyMap = [];
	//
	// 			$('.form-field-master input, .form-field-master select').each(function(index, input) {
	// 				$(input).on('change', window.piAjax.checkForDependentField);
	// 				window.piAjax.checkForDependentField.call(input);
	// 			});
	// 		})();
	// 	});
	// })();
