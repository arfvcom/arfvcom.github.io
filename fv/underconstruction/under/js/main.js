/*
Theme Name: Slde
Description: Minimal Coming Soon Template
Author: RafavaThemes
Version: 1.0
*/

/* ==================================================================
 
 * Table of Contents:
 *
 * 1.0 - Loader
 * 2.0 - Countdown
 * 3.0 - Isotope (grid)
 * 4.0 - Detect mobile
 * 5.0 - Mailchimp integration
 * 6.0 - Contact form
 * 7.0 - Morph button
 * 8.0 - Open container
 * 9.0 - Photoswipe
 * 10.0- Google map

================================================================== */

$(window).load(function(){
         
    setTimeout(function(){
	               
	    $('.loading').velocity({
            opacity : 0.01,translateY: "-80px"}, {duration: 450,
	    	complete: function(){
                $('#background').velocity("fadeOut",{duration: 450}
            )}
	    })
          
    },800)
	
})
		
$(document).ready(function() {

    //COUNTDOWN
	$(".countdown").countdown("2017/07/08", function(event) {
        $(this).text(event.strftime('%D days %Hh %Mm %Ss'));
    });

    $('.start-stop i').on('click', function() { 
        $('.start-stop i').removeClass('i-opacity');
        $(this).addClass('i-opacity');
    });

    //ISOTOPE (GRID)
	var $isotope1 = $('#mosaic').imagesLoaded( function() {
		var $grid = $('#mosaic').isotope({
    		packery: {
  				columnWidth:".mosaic-sizer",
  				rowHeight:".mosaic-sizer",
  				gutter:".gutter-sizer"
			},
      		layoutMode: 'fitRows',
     		  itemSelector:".mosaic-item",
      		percentPosition: true
    	});
		// bind filter button click
		$('.filters-button-group').on( 'click', 'button', function() {
		    var filterValue = $(this).attr('data-filter');
		  	$grid.isotope({ filter: filterValue });
		});
	});
	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', 'button', function() {
	      $buttonGroup.find('.is-checked').removeClass('is-checked');
	      $( this ).addClass('is-checked');
	    });
	});

    //DETECT MOBILE
    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       $("#main-content").addClass('nomobile');
    }

    //MAILCHIMP INTEGRATION
    ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));
    // Turn the given MailChimp form into an ajax version of it.
    // If resultElement is given, the subscribe result is set as html to
    // that element.
    function ajaxMailChimpForm($form, $resultElement){
            // Hijack the submission. We'll submit the form manually.
            $form.submit(function(e) {
                e.preventDefault();
                if (!isValidEmail($form)) {
                    var error =  "A valid email address must be provided.";
                  $resultElement.hide();
                    $resultElement.html(error);
                    $resultElement.fadeIn(250);
                } else {   
                	 $resultElement.hide();
                	
                	$resultElement.html('Loading...');
					$resultElement.fadeIn(250);
                    submitSubscribeForm($form, $resultElement);
                }
            });
        }
        // Validate the email address in the form
        function isValidEmail($form) {
            // If email is empty, show error message.
            // contains just one @
            var email = $form.find("input[type='email']").val();
            if (!email || !email.length) {
                return false;
            } else if (email.indexOf("@") == -1) {
                return false;
            }
            return true;
        }
        // Submit the form with an ajax/jsonp request.
        // Based on http://stackoverflow.com/a/15120409/215821
        function submitSubscribeForm($form, $resultElement) {
            $.ajax({
                type: "GET",
                url: $form.attr("action"),
                data: $form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c", // trigger MailChimp to return a JSONP response
                contentType: "application/json; charset=utf-8",
                error: function(error){
                    // According to jquery docs, this is never called for cross-domain JSONP requests
                },
                success: function(data){
                    if (data.result != "success") {
                        var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "You're already subscribed. Thank you.";
                        }
                        $resultElement.hide();
                        $resultElement.html(message);
                        $resultElement.fadeIn(250);
                    } else {
                    $resultElement.hide();
                        $resultElement.html("Thank you! You must confirm the subscription in your inbox.");
                        $resultElement.fadeIn(250);
                    }
                }
            });
    }
    $("input").keyup(function() {
    	$("#subscribe-result").fadeOut(250);
    });
    $('#contactForm .form-control').on("focus", function() {
        $('#success').html('');
    });

    //CONTACT FORM
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({       
        preventSubmit: true,
        submitError: function($form, event, errors) {
        },
        submitSuccess: function($form, event) {
        event.preventDefault(); 
        var name = $("input#name").val();  
        var email = $("input#email").val(); 
        var message = $("textarea#message").val();
        var firstName = name; 
        if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
        }        
        $.ajax({
            url: "js/mailer.php",
            type: "POST",
            data: {name: name, email: email, message: message},
            cache: false,
            success: function() {  
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').append("Your message has been sent. ");
            $('#success > .alert-success').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
            },
            error: function() {      
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').append("Sorry "+firstName+" it seems that my mail server is not responding");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
            },
            })
            },
            filter: function() {
            return $(this).is(":visible");
            }
    });

    

    //OPEN CONTAINER
    (function() {
            var container = document.getElementById( 'main-content' ),
                trigger = container.querySelector( 'button.trigger' );

            function toggleContent() {
                if( classie.has( container, 'container--open' ) ) {
                    classie.remove( container, 'container--open' );
                    classie.remove( trigger, 'trigger--active' );
                    window.addEventListener( 'scroll', noscroll );
                }
                else {
                    classie.add( container, 'container--open' );
                    classie.add( trigger, 'trigger--active' );
                    window.removeEventListener( 'scroll', noscroll );
                }
            }

            function noscroll() {
            window.scrollTo( 0, 0 );
            }

            // reset scrolling position
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            // disable scrolling
            window.addEventListener( 'scroll', noscroll );

            trigger.addEventListener( 'click', toggleContent );
                
    })();

    //PHOTOSWIPE
    (function() {

    initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            showHideOpacity:true,
            getThumbBoundsFn:false,
            bgOpacity:0.98,
            history:false,
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },

                    addCaptionHTMLFn: function(item, captionEl, isFake) {
                        if(!item.title) {
                            captionEl.children[0].innerText = '';
                            return false;
                        }
                        captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
                        return true;
                    }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};
    initPhotoSwipeFromDOM('.demo-gallery');
    })();  
    
});