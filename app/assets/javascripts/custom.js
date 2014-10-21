jQuery(document).ready(function(){ 
	
	/* ---------------------------------------------------------------------- */
	/*	Custom Functions
	/* ---------------------------------------------------------------------- */

	// Logo
	var $logo 	= $('#logo');

    if (location.href.indexOf("#") != -1) {
        $logo.show();
    }
	// Show logo 
	$('.menu .tabs a').click(function() {
	  $logo.fadeIn('slow');
	});
	// Hide logo
	$('.tab-profile').click(function() {
	  $logo.fadeOut('slow');
	});	

	/* ---------------------------------------------------------------------- */
	/*	Resume
	/* ---------------------------------------------------------------------- */
	
	// Rating bars
	$(".skills li .rating").each(function(index,e) { 

		// Vars
		var 
			$ratNum = 7,
			$rat = $(e).attr("data-rat"),
			$point = "<span></span>";

		// Append points
		while($ratNum > 0){
		     $(e).append($point);
		     $ratNum--;
		}

		$(e).find("span").each(function(index,e) { 
			if(index >= $rat) return false;
			// Append Disabled Rats
			$(e).animate({
			    opacity: 1
			  });
		});

    });

	/* ---------------------------------------------------------------------- */
	/*	About
	/* ---------------------------------------------------------------------- */
	
	// Profile Photo Slider
	 $(".photo-inner ul").carouFredSel({
        direction           : "left",
 	    circular: true,
        auto    			: true,
        scroll 			: {
            items           : 1,
            fx 				: 'crossfade',
            duration        : 1500,                        
            wipe    		: true
        },
	    swipe: {
	        onTouch: true
	    },
        items: {
            width: 153
        }           
    });
	 
	/* ---------------------------------------------------------------------- */
	/*	Menu
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $content 		= $("#content");
	
	// Run easytabs
  	$content.easytabs({
	  animate			: true,
	  updateHash		: false,
	  transitionIn		:'slideDown',
	  transitionOut		:'slideUp',
	  animationSpeed	:600,
	  tabs				:".tmenu",
	  tabActiveClass	:'active',
	});

	
	// Hover menu effect
	$content.find('.tabs li a').hover(
		function() {
			$(this).stop().animate({ marginTop: "-7px" }, 200);
		},function(){
			$(this).stop().animate({ marginTop: "0px" }, 300);
		}
	);

	// Menu Navigation
	 $(".menu .tabs").carouFredSel({
        responsive          : true,
        direction           : "left",
 	    circular: false,
    	infinite: false,
        pagination  		: "#menu-controls",  
        auto    			: false,
        scroll 			: {
            items           : 1,
            duration        : 300,                        
            wipe    : true
        },
		prev	: {	
			button	: "#menu-prev",
			key		: "right"
		},
		next	: { 
			button	: "#menu-next",
			key		: "left"
		},
	    swipe: {
	        onTouch: true
	    },
        items: {
            width: 140,
            visible: {
              min: 2,
              max: 5
            }
        }           
    });
	/* ---------------------------------------------------------------------- */
	/*	Cats Filter
	/* ---------------------------------------------------------------------- */ 
	
	var $catsfilter 		= $('.cats-filter');

	// Copy categories to item classes
	$catsfilter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$(this).parent().parent().find('a').removeClass('current');
		$(this).addClass('current');
	});	

	/* ---------------------------------------------------------------------- */
	/*	Portfolio
	/* ---------------------------------------------------------------------- */ 
	
	// Needed variables
	var $plist	 	= $('#portfolio-list');
	var $pfilter 		= $('#portfolio-filter');
		
	// Run Isotope  
	$plist.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});	
	
	// Isotope Filter 
	$pfilter.find('a').click(function(){
	  var selector = $(this).attr('data-filter');
		$plist.isotope({ 
		filter				: selector,
		animationOptions	: {
		duration			: 750,
		easing				: 'linear',
		queue				: false,
	   }
	  });
	  return false;
	});	
	// Portfolio image animation 
	$plist.find('img').adipoli({
		'startEffect' 	: 'transparent',
		'hoverEffect' 	: 'boxRandom',
		'imageOpacity' 	: 1.0,
		'animSpeed' 	: 200,
	});
	
	/* ---------------------------------------------------------------------- */
	/*	prettyPhoto
	/* ---------------------------------------------------------------------- */

    $("a[rel^='portfolio']").prettyPhoto({
    	animation_speed: 'fast', /* fast/slow/normal */
    	social_tools: '',
    	theme: 'pp_default',
    	horizontal_padding: 5,
    });

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
		$error		    = 'Please fill in all fields.';
		
	$contactform.submit(function(){
		$.ajax({
		   type: "POST",
		   beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		   url: "/messages",
		   data: $(this).serialize(),
		   success: function(data)
		   {	
			   	response = '<div class="success">'+ $success +'</div>';
			   	$(".error,.success").remove();
		   		console.log(data);
		   		$contactform.prepend(response);
			}, error: function(data) {
				debugger
			   	response = '<div class="error">'+ $error +'</div>';
			   	$(".error,.success").remove();
		   		console.log(data);
		   		$contactform.prepend(response);
			}
		 });
		return false;
	});	
	/* ---------------------------------------------------------------------- */
	/*	Google Maps
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $map 				= $('#map'),
		$tabContactClass 	= ('tab-contact'),
		$lat 				= '37.789687',
		$lon 				= '-122.414762';

	$map.gmap();

	$map.gmap().bind('init', function(ev, map) {
		$map.gmap('addMarker', {'position': $lat +','+ $lon  , 'bounds': true}).click(function() {
			$map.gmap('openInfoWindow', {'content': 'Eric was here'}, this);
		});
		$map.gmap('option', 'zoom', 16);
	});

	// // Refresh Map
	$content.bind('easytabs:after', function(evt,tab,panel) {
		$map.gmap('refresh'); 
  	});

      
  

});	