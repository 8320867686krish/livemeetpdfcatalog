/* -----| script |-------*

 * 01. Mobile call

 * 02. Mobile Filter

 * 03. Km. Select Dropdown

 ** 3.1 Mobile view Km select jQuery Ui destroy 

 * 04. Search Auto Suggess

 * 05. Location Search Auto Suggess

 * 06. Home Main Slider

 * 07. Category Add Banner Slider

 * 08. Masonry Category List

 * 09. Scroll back to top

 * 10. FAQ Accordions 

 */





$(document).ready(function() {  

svgConvert('.svgIcon');





/* Mobile menu */  

$('.menuIcon').click(function() {

        $(this).toggleClass('menu-close');

        $('.navigationBar').toggleClass('slideMenu');

        $('body').addClass('bodyFixed');

    });





$('.filterToggle').click(function(){

  $('.shopSidebar').toggleClass('slideFilter');

  $('body').addClass('bodyFixed');

});



$('.sidebar-overlay, .closeMenu').click(function() {

        $('.menuIcon').removeClass('menu-close');

        $('.navigationBar').removeClass('slideMenu');

        $('body').removeClass('bodyFixed');

        $('.shopSidebar').removeClass('slideFilter');

  });





$('.menuMain li:has(ul)').prepend('<span class="arrow"></span>'); 

$('.arrow').click(function() {  

  $(this).siblings('ul').slideToggle('slow'); 

  $(this).toggleClass('minus'); 

});


// var sidebar = new StickySidebar('#sidebar', {
//     containerSelector: '#main-content',
//     innerWrapperSelector: '.sidebar__inner',
//     topSpacing: 20,
//     bottomSpacing: 20 
// });


$('#jobresume').change(function() {
var val = this.value,
filename = val.split('\\').pop();
$(this).closest('.BrowseBtn').next('.text').text(filename);
});



/*~~~~~~~ 02. Window Scroll  ~~~~~~~~*/

$('.scrollTop').click(function() {

    $('html, body').animate({scrollTop: 0}, 800);

    return false;

});



$(window).scroll(function() {

    if ($(this).scrollTop() > 100) {

        $('.scrollTop').fadeIn();

        $('.headerMain').addClass('has_sticky');

    } else {

        $('.scrollTop').fadeOut();

        $('.headerMain').removeClass('has_sticky'); 

    }

}); 



//clienttesslider

$('.clienttesslider').slick({

  infinite: true,

  slidesToShow: 1,

  slidesToScroll: 1,

  appendArrows: '.tesslideArrows',

  dots: false,

  arrows: true,

  autoplay: true,

  autoplaySpeed: 5000,

  speed: 500,

  fade: true,

  responsive: [

      {

        breakpoint: 769,

        settings: {

          slidesToShow: 1,

          slidesToScroll: 1,

          arrows: false,

          dots: true

        }



      }

    ]

});



//blog slider

$('.bloglistmain').slick({

    infinite: true,

    arrows: false,

    slidesToShow: 3,

    slidesToScroll: 1,

    dots: true,

    autoplay: true,

    responsive: [

    {



      breakpoint: 991, 

      settings: {

        slidesToShow: 2,

        slidesToScroll: 1,

        infinite: true,

        dots: true

      }

    },



    {

      breakpoint: 480,

      settings: {

        slidesToShow: 1,

        slidesToScroll: 1,

        dots: true

      }



    }

  ]



  });







//companylogo

$('.logo_slider').slick({

  infinite: true,

  arrows: false,

  slidesToShow: 6,

  slidesToScroll: 1,

  dots: true,

  autoplay: true,

  responsive: [

    {

      breakpoint: 991, 

      settings: {

        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,

        dots: true

      }

    },



    {



      breakpoint: 768, 

      settings: {

        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,

        dots: true

      }

    },



    {

      breakpoint: 480,

      settings: {

        slidesToShow: 2,

        slidesToScroll: 1,

        dots: true

      }



    }

  ]



});


$('.screenshotSlider').slick({

    infinite: true,

    arrows: true,

    slidesToShow: 1,

    slidesToScroll: 1,

    dots: false,

    autoplay: true,

    responsive: [

  {

      breakpoint: 767,

      settings: {

        slidesToShow: 1,

        slidesToScroll: 1,

        dots: true,

        arrows :false

      }



    }

  ]

  });



//companylogo

$('.our_client_sl').slick({

  infinite: true,

  centerMode: true,

  swipe: true,

  swipeToSlide: true,

  appendArrows: '.slideArrows',

  appendDots:'.sliderDots',

  arrows: true,

  slidesToShow: 3,

  slidesToScroll: 1,

  dots: true,

  autoplay: true,

  //autoplay: true,

  responsive: [

    {

      breakpoint: 991, 

      settings: {

        slidesToShow: 2,

        slidesToScroll: 1,

        infinite: true,

        dots: true,

        centerMode: false

      }

    },



    {



      breakpoint: 768, 

      settings: {

        slidesToShow: 2,

        slidesToScroll: 1,

        infinite: true,

        dots: true,

        centerMode: false

      }

    },



    {

      breakpoint: 480,

      settings: {

        slidesToShow: 1,

        slidesToScroll: 1,

        dots: true,

        centerMode: false

      }



    }

  ]



});



$('.benifitSlider').slick({
//$('.benisfitSlider').slick({


  infinite: true,

  arrows: false,

  slidesToShow: 5,

  slidesToScroll: 1,

  dots: false,

  autoplay: true,

  responsive: [

    {

      breakpoint: 991, 

      settings: {

        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,

        dots: true

      }

    },



    {



      breakpoint: 768, 

      settings: {

        slidesToShow: 3,

        slidesToScroll: 1,

        infinite: true,

        dots: true

      }

    },



    {

      breakpoint: 480,

      settings: {

        slidesToShow: 2,

        slidesToScroll: 1,

        dots: true

      }



    }

  ]



});







});



wow = new WOW({

      animateClass: 'animated',

      offset: 80,

      mobile: false

  });

  wow.init();



 

 



/* ------| A. Svg Rendering In Browser |--------- */



function svgConvert(svgClass) {

    $(svgClass).each(function() {        

        var $img = $(this);

        var imgID = $img.attr('id');

        var imgClass = $img.attr('class');

        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {

          /* Get the SVG tag, ignore the rest */

          var $svg = $(data).find('svg');

          /* Add replaced image's ID to the new SVG */

          if (typeof imgID !== 'undefined') {

              $svg = $svg.attr('id', imgID);

          }

          /* Add replaced image's classes to the new SVG */

          if (typeof imgClass !== 'undefined') {

              $svg = $svg.attr('class', imgClass + ' svgIcon');

          }

          $svg = $svg.attr('fill', 'currentColor');

          /* Remove any invalid XML tags as per http://validator.w3.org */

          $svg = $svg.removeAttr('xmlns:a');

          /* Replace image with new SVG*/

          $img.replaceWith($svg);

      }, 'xml');



    });



}