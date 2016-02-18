jQuery(document).ready(function($){

	var	scrolling = false;
	var contentSections = $('.cd-section'),
		verticalNavigation = $('.cd-vertical-nav'),
		navigationItems = verticalNavigation.find('a'),
		navTrigger = $('.cd-nav-trigger'),
		scrollArrow = $('.cd-scroll-down');

	function updateSections() {
		var halfWindowHeight = $(window).height()/2,
			scrollTop = $(window).scrollTop();
		contentSections.each(function(){
			var section = $(this),
				sectionId = section.attr('id'),
				navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');
			( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) ) ? navigationItem.addClass('active') : navigationItem.removeClass('active');
		});
		scrolling = false;
	}

	function checkScroll() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
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
