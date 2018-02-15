/*
 * Mobile Check
 */
var isMobile;
function checkMobile() {
    isMobile = (window.innerWidth >= 1080) ? false : true;
}

// Check for mobile on browser resize
$(window).resize(function () {
    checkMobile();
});

/*
 * Gets position/size of list item and animates onto modal
 */
function animateThumb(el) {

    // get position of element relative to viewport
    var thumb = el.getBoundingClientRect();

    // Set width to animate from
    $('.modal-image').css('width', $(el).width());

    // Set modal image to list item dimensions
    $('.modal-image')
        .css({
            'background-image':$(el).css('background-image'),
            left   : thumb.left,
            top    : thumb.top,
            width  : thumb.width,
            'visibility' : 'visible'
        });

    // Get width, X, and Y values to move to
    var newWidth = window.innerWidth*0.5; // 50% of viewport
    var newX = (window.innerWidth*0.02)-thumb.left; // 2% of window width minus current list item position, negative value
    var newY = ((window.innerHeight*0.5)-thumb.top)-((newWidth*0.75)/2)-6; // get distance from top, minus by half of new image height (55vw*75%/2) minus border
    
    // Prevent flicker when animating and hiding
    setTimeout(function() { 

        // Animate into place on modal
        $('.modal-image')
            .addClass('animate-in')
            .css({
                transform   : 'translateX('+newX+'px) translateY('+newY+'px)',
                width       : newWidth
            });
        
        // Hide list item in time with animation
        setTimeout(function() {
            $(el).addClass('hide'); 
        }, 20); 
    }, 10);
}


/*
 * Populate Modal Content Data
 */
function populateModal(el) {
    // Grab data from list
    var title = $(el).data('title');
    var project = $(el).data('project');
    var brief = $(el).data('brief');
    var skills = $(el).data('skills');
    var external = $(el).data('external');
    skills = skills.split(',');
    
    // Set/Replace data in modal
    $('.modal-title').text(title);
    $('.modal-project').text(project);
    $('.modal-brief').text(brief);
    
    // Reset skill list
    $('.modal-skills').empty();

    // Build skill list
    for (var i = 0; i < skills.length; i++)
        $('.modal-skills').append('<li>'+skills[i]+'</li>');
    
    // Add external link
    if (external != '') {
        $('.modal-external').show().attr('href', external);
    } else {
        $('.modal-external').hide().attr('href', '#');
    }
}

/*
 * Open Modal
 */
$('.portfolio li').click(function(e) {
    e.preventDefault();

    // Prevent parent scrolling
    $('body').addClass('modal-open');

    if(!isMobile) {
        // Animate thumb if desktop
        animateThumb(this);
    } else {
        // Mobile, just swap image
        $('.modal-image-mobile').css('background-image',$(this).css('background-image'));
    }

    // Populate data
    populateModal(this);

    // Show modal
    $('.modal').addClass('show');
});

/*
 * Close Modal
 */
$('.modal-image, .modal-image-mobile, .modal-close').click(function(e) {
    e.preventDefault();
    
    // Hide modal
    $('.modal').removeClass('show');
    
    if(!isMobile) {
        setTimeout(function() {
            // Move it back to the list and disappear
            $('.modal-image').removeClass('animate-in').css({
                transform : 'translateX(0) translateY(0)',
                width : $('.portfolio li').innerWidth()+20
            });
            
            // Wait for transition to finish...
            setTimeout(function() {
                
                // Show list item
                $('.portfolio li.hide').removeClass('hide');
                
                // Reset positioning
                $('.modal-image')
                    .removeAttr('style')
                    .css('visibility','hidden');
            }, 500);

        },200);
    }

    // Re-enable scroll
    $('body').removeClass('modal-open');
});