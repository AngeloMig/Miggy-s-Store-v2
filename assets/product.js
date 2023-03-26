window.theme = window.theme || {};
(function($){
	"use strict";
     var $ = jQuery = $;

     function changeButtonQuantityProduct(){
     	let qty_product= $('.product__quantity input[type="text"]');

	     $('#Minus-quantity').on('click', function(){
	     	 let qty_minus = parseInt(qty_product.val());
	     	 if(qty_minus == 1){
	            qty_product.val(1);
	     	 }else{
	     	 	qty_minus = parseInt(qty_minus) - 1;
	     	 	qty_product.val(qty_minus);
	     	 }
	     })

	     $('#Plus-quantity').on('click', function(){
	     	 let qty_plus = parseInt(qty_product.val());
	 	 	 qty_plus = parseInt(qty_plus) + 1;
	 	 	 qty_product.val(qty_plus);	
	     })
     }
     
     let setInterButton = setInterval(moveButtonFormReviewProduct, 2000);
     let review_id = 0;
     function moveButtonFormReviewProduct(){
     	let id_product = $("#stamped-main-widget").attr('data-product-id');
     	let id_form = "#new-review-form_"+id_product;
     	let list_review = ".stamped-content .stamped-reviews";

     	let action_btn = $(".stamped-container .stamped-header .stamped-summary .stamped-summary-actions");
        $(action_btn).appendTo(".stamped-content");
        $(id_form).appendTo(".stamped-content");
        review_id++;
        
        clearInterval(setInterButton);
     }
     
     if (review_id > 1) {
     	clearInterval(setInterButton);
     }

     function testimonialSliderBrands(){  
          let id_sliderShow = $('.testimonial-sliders').attr('data-id');
          let section_Slider = '#Testimonial-'+id_sliderShow;

          let item_show = parseInt( $(section_Slider).attr('data-item') );
          let slider_dots = $(section_Slider).attr('data-dost') == 'true' ? true : false;     
          let slider_nav = $(section_Slider).attr('data-nav') == 'true' ? true : false;
          let slider_autoplay = $(section_Slider).attr('data-auotplay') == 'true' ? true : false;
          
          $(section_Slider).slick({
               slidesToShow: item_show,
               autoplay: slider_autoplay,
               arrows: slider_nav,
               dots: slider_dots
          }); 
     };

     $(document).on('shopify:section:load', function(){
          testimonialSliderBrands();     
     });
     
     $(document).ready(function() {
          changeButtonQuantityProduct();
          testimonialSliderBrands();
     });

     /*---------------------------------------------*/
     try {
          $('.js-scroll-link').on('click', function(event){
          event.preventDefault();

          $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 800);
     });             
    } catch(er) {console.log(er);} 

    /*---------------------------------------------*/
    try {
      $('.template-product .wrap-btn-add-cart .btn-fake').on('click', function() {
        $(this).next('button.add-to-cart').trigger('click');
      });

      "Shoppad.apps.infiniteoptions".split(".").reduce(function(o, x) { if (!o[x]) {o[x] ={};} return o[x] }, window);
      window.Shoppad.apps.infiniteoptions.beforeReady = function(subscribe) {
        subscribe('fieldLoad', function(event) {
          $('#infiniteoptions-container .nothing-pre-selected input[type="radio"]').prop('checked', false);


          $('fieldset[data-required="true"]').each(function() {
            var thisField = $(this);

            $(thisField).find('label.spb-productoptionswatchwrapper').on('click', function(e) { 
              var thislabel = $(this);

              $(thisField).find('input[type="checkbox"]').not($(thislabel).children('input[type="checkbox"]')).each(function() {
                if($(this).is(":checked")) {
                  $(this).parent('label.spb-productoptionswatchwrapper')[0].click();
                }
              })
            })
          })
        });

        subscribe('validationSuccess', function(event) {
            //console.log('validationSuccess', event);

            $('.template-product .wrap-btn-add-cart button.add-to-cart').submit();
        });

        subscribe('fieldLoad', function(event) {
          //console.log('fieldLoad', event);

          if($('.ufe-widget').length > 0) {
            $('.template-product .wrap-btn-add-cart .btn-fake').css('display', 'block');
            $('.template-product .wrap-btn-add-cart .add-to-cart').css('pointer-events', 'none');
          }
        });
      };               
    } catch(er) {console.log(er);} 

})(theme.jQuery);

// Text wave