/*
 * Gets position/size of list item and animates onto modal
 */
function animateThumb(el) {

    // get position of element relative to viewport
    var thumb = el.getBoundingClientRect();

    // Set width to animate from
    $('.modal-image').css('width', $(el).width());

    // Find X and Y it needs to move too.
    var newWidth = window.innerWidth*0.50;
    var newX = (window.innerWidth*0.02)-thumb.left; // 2% of window width minus current list item position, negative value
    var newY = ((window.innerHeight*0.5)-thumb.top)-((newWidth*0.75)/2)-5; // get distance from top, minus by half of new image height (55vw*75%/2) minus border

    // Set modal image to list item dimensions
    $('.modal-image')
        .css({
            'background-image':$(el).css('background-image'),
            left   : thumb.left,
            top    : thumb.top,
            transform : 'translateX('+newX+'px) translateY('+newY+'px)',
            width  : thumb.width
        });
    
    // Prevent flicker when animating and hiding
    setTimeout(function() { 

        // Animate into place on modal
        $('.modal-image')
            .addClass('animate-in')
            .css({
                width : newWidth
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
    animateThumb(this);
    populateModal(this);
    $('.modal').addClass('show');
});

/*
 * Close Modal
 */
$('.modal-image, .modal-close').click(function(e) {
    e.preventDefault();
    $('.modal').removeClass('show');
    setTimeout(function() {
        // Move it back to the list and disappear
        $('.modal-image').removeClass('animate-in').css({
            transform : 'translateX(0) translateY(0)',
            width : 600
        });
        // Wait for transition to finish...
        setTimeout(function() {
            // Show list item
            $('.portfolio li.hide').removeClass('hide');
            // Reset positioning
            $('.modal-image').removeAttr('style');
        }, 350);
    },400);
});