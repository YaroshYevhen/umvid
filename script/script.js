var APP = {};
APP.$document = $(document);
APP.hamburger = $('.hamburger');
APP.slider = $('.slider-container');
APP.modalBtn = $('.modal-btn');
APP.closeModal = $('.modal-close');
APP.navItem = $('.nav__item');
APP.scrollBtn = $('.scroll-btn');
APP.priceBtn = $('.calculator__btn');
APP.uploadFile = $('.file-btn');
APP.removeFile = $('.selected-files__remove');
APP.wpFile = $('.input-file');

function closeModal(){
	$('.modal').removeClass('active');
	$('html').removeClass('overflow');
}

APP.$document.ready(function() {
	APP.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });
	$('.selected-files').hide();
	APP.uploadFile.on('click', function() {
			APP.wpFile.click();
	})
	APP.wpFile.on('change', function(event) {
		var fileName = event.target.files[0].name,
				replace = fileName.replace(/\s/g,'_');
		$('.selected-files').show();
		$('.selected-files__text').html(replace);
	});
	APP.removeFile.on('click', function() {
		$('.selected-files__text').empty();
		$('.selected-files').hide();
		APP.wpFile.val('');
	});
	$('input[type="file"]').change(function(e){
  	var fileName = e.target.files[0].name;
	});
	APP.priceBtn.on('click', function(){
  	var currentSlide = $('.calculator-item.current');

  	APP.priceBtn.removeClass('disabled');

    if($(this).hasClass('prev')){
    	var prevSlides = currentSlide.prevAll();

    	if(!($(prevSlides).length - 1)){
    		$(this).addClass('disabled');
    	}
    	$('.calculator__submit').addClass('disabled');
    	currentSlide.removeClass('active');
    	currentSlide.prev().addClass('active');
    	currentSlide.removeClass('current').prev('.calculator-item').addClass('current').removeClass('prev');
    }else if($(this).hasClass('next')){
    	var nextSlides = currentSlide.nextAll();

    	if(!($(nextSlides).length - 2)){
    		$(this).addClass('disabled');
    		$('.calculator__submit').removeClass('disabled');
    	}
    	currentSlide.removeClass('active');
    	currentSlide.next().addClass('active');
    	currentSlide.removeClass('current').addClass('prev').next('.calculator-item').addClass('current');
    }
  });

	APP.scrollBtn.on('click', function(){
    var section = $(this).data('scroll'),
        scrollTo = $(section).offset().top;

    $('html').removeClass('overflow');
    $('html, body').animate({ scrollTop: scrollTo }, 500);
    $('body').removeClass('menu');
    APP.hamburger.removeClass('active');
  });

	APP.modalBtn.on('click', function() {
		var attr = $(this).attr('data-target'),
				modal = $('.modal[data-target="' + attr + '"]');

		modal.addClass('active');

	});

	$('.modal-close').on('click', function() {
    closeModal();
  });

  $('.modal').on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

	APP.slider.each(function(key, item) {
    var options = {
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      dots: true,
      nextArrow: '<button class="slick-next slick-arrow">><div class="line"></div><div class="line"></div><i class="icon-slider-arrow"></i></button>',
      prevArrow: '<button class="slick-prev slick-arrow"><<div class="line"></div><div class="line"></div><i class="icon-slider-arrow"></i></button>',
      responsive: [{
        breakpoint: 1140,
        settings: {
          slidesToShow: attr('show-tablet'),
          slidesToScroll: attr('show-tablet'),
          centerMode: false
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: attr('show-mobile'),
          slidesToScroll: 1,
          centerMode: false
        },
      }]
    };

    function attr (value) {
      return $(item).data(value);
    };

    $(item).slick(options);
  });
});