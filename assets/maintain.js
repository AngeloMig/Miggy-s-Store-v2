try {
    jQuery(document).on('shopify:section:load', function(e){ 
        callSlick("setting");
    });

    callSlick("normal");

    function callSlick(callSpace) {
        if($('html').is('[dir="rtl"]')) {
            $('.js-call-slick').attr('data-rtl', 'true');
        }

        $('.js-call-slick').each(function(){
            var $wrapperSlick = $(this);
            var $slideSlick = $(this).find('.slide-slick:not(.slick-initialized)');
            var $itemSlick = $slideSlick.find('.item-slick');

            var dataCustomDots = $wrapperSlick.data('custom-dots');
            var dataHeightArrows = $wrapperSlick.data('height-arrows');
            var dataAnimate = $wrapperSlick.data('animate');
            var dataRtl = ($wrapperSlick.attr('data-rtl') === 'true') ? true : false;

            if(dataAnimate === true) {
                var $layerSlick = $slideSlick.find('[data-appear]');
                var actionSlick = [];

                $layerSlick.addClass('animated').css('visibility', 'hidden');
            }  

            /*---------------------------------------------*/
            $slideSlick.on('init', function(event, slick){
                if(dataAnimate === true) {
                    showLayer(0);
                }

                if ($wrapperSlick.hasClass('before-load') && callSpace == "setting") {
                    setTimeout(function(){ 
                        $wrapperSlick.removeClass('before-load');
                    }, 300);
                }      
            });

            $slideSlick.slick({
                rtl: dataRtl,
                appendArrows: $wrapperSlick.find('.arrows-slick'),
                prevArrow: $wrapperSlick.find('.prev-slick'),
                nextArrow: $wrapperSlick.find('.next-slick'),
                appendDots: $wrapperSlick.find('.dots-slick'),

                customPaging: function(slick, index) {
                    var innerDot = $(slick.$slides[index]).attr('data-inner-dot');

                    if(dataCustomDots === true) return innerDot;

                    return '<span class="inner-dot"></span>';
                }
            });

            $slideSlick.on('setPosition', function(event, slick){

                if ($wrapperSlick.hasClass('before-load') && callSpace == "normal") {
                    setTimeout(function(){ 
                        $wrapperSlick.removeClass('before-load');
                    }, 300);
                } 

                // Equal height
                if($wrapperSlick.data('equal-height') === true) {
                    var maxHeight = 0;
                    var $items = $(this).find('.item-slick');

                    $items.each(function(){
                        if($(this).outerHeight() > maxHeight) {
                            maxHeight = $(this).outerHeight();
                        }
                    })

                    $items.css('min-height', maxHeight);
                }

                // Middle Arrow
                if(dataHeightArrows != null) {
                    var $wrapperArrows = $wrapperSlick.find('.arrows-slick');
                    var heightWA = $wrapperSlick.find(dataHeightArrows).outerHeight();
                    
                    $wrapperArrows.css('height', heightWA + 'px');
                }

                // Disable centerMode
                if (slick.slideCount <= slick.options.slidesToShow) {
                    $slideSlick.slick('slickSetOption', 'centerMode', false);
                    $slideSlick.find('.item-slick').removeClass('slick-center');
                }
            });
        });
    }
        
} catch(er) {console.log(er);}


/*\
 *
 * Pagi blog page
 *
\*/
try {
    jQuery(document).on('shopify:section:load', function(e){ 
        pagiCustomBlog();
    });

    pagiCustomBlog();

    function pagiCustomBlog() {
        $('.js-pagi-custom-blog').each(function() {
            var thisBlog = $(this);

            $(thisBlog).find('.loop-pagination .page-numbers').on('click', function(e) {
                e.preventDefault();
                $(thisBlog).find('.loop-pagination .page-numbers').removeClass('current');
                $(this).addClass('current');

                $(thisBlog).find('.hun-col').fadeOut();
                $(thisBlog).find('.hun-col.' + $(this).attr('data-page')).fadeIn();
                $(thisBlog).attr('data-page-now', $(this).attr('data-page'));
            });

            $(thisBlog).find('.loop-pagination .item-pagi.next').on('click', function(e) {
                e.preventDefault();

                var nextItem = $(thisBlog).find('.loop-pagination .page-numbers.current').parent('li').next().children('.page-numbers');

                if (nextItem.length > 0) {
                    $(thisBlog).find('.loop-pagination .page-numbers').removeClass('current');
                    $(nextItem).addClass('current');

                    $(thisBlog).find('.hun-col').fadeOut();
                    $(thisBlog).find('.hun-col.' + $(nextItem).attr('data-page')).fadeIn();
                    $(thisBlog).attr('data-page-now', $(nextItem).attr('data-page'));
                } 
            });

            $(thisBlog).find('.loop-pagination .item-pagi.prev').on('click', function(e) {
                e.preventDefault();

                var prevItem = $(thisBlog).find('.loop-pagination .page-numbers.current').parent('li').prev().children('.page-numbers');

                if (prevItem.length > 0) {
                    $(thisBlog).find('.loop-pagination .page-numbers').removeClass('current');
                    $(prevItem).addClass('current');

                    $(thisBlog).find('.hun-col').fadeOut();
                    $(thisBlog).find('.hun-col.' + $(prevItem).attr('data-page')).fadeIn();
                    $(thisBlog).attr('data-page-now', $(prevItem).attr('data-page'));
                } 
            });
        })
    }
        
} catch(er) {console.log(er);}