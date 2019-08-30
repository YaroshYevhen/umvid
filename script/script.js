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
APP.modalArrow = $('.modal-slider__arrow');

function setButtonData() {
  var button = $('.sertificates-btn');

  button.attr('data-order', 5);

  if($(window).width() < 1200) {
    button.attr('data-order', 4);
  }
  if($(window).width() < 768) {
    button.attr('data-order', 2);
  }
}

function hideArrows(element) {
  var parent = $(element).parents('.modal-container'),
      prevArrow = parent.find('.slick-prev'),
      nextArrow = parent.find('.slick-next'),
      currentSlideIndex = parent.find('.modal-slider__item.current').index(),
      totalSlides = parent.find('.modal-slider__item').length;

  if(currentSlideIndex == 0) {
    prevArrow.addClass('disabled');
    nextArrow.removeClass('disabled');
  } else if (currentSlideIndex == (totalSlides - 1)) {
    nextArrow.addClass('disabled');
    prevArrow.removeClass('disabled');
  } else {
    prevArrow.removeClass('disabled');
    nextArrow.removeClass('disabled');
  }
}

function fillTitle() {
  var filler = $('.price .title-l .filler'),
      currentIndex = $('.calculator-item.current').index('.calculator-item'),
      totalSlides = $('.calculator-item').length,
      fillPercent = currentIndex * 100 / (totalSlides - 1) + "%";

  filler.animate({ 'max-width': fillPercent }, 300);
}

function doAnimation() {
    var windowScroll = $(window).height() + APP.$document.scrollTop(),
        element = APP.$document.find('.js-animation:not(.animate)')[0];

  $('.js-animation:not(.animate)').each(function(key, item){
    var itemOffset = $(item).offset().top + 100,
        tableParent = $(item).parents('.palette-table');

    if($(this).hasClass('price') && $(window).width() >= '1139'){
      itemOffset = $(item).offset().top + 400
    }
    if(windowScroll >= itemOffset){
        $(item).addClass('animate');
    }
  });
};

function closeModal() {
	$('.modal').scrollTop(0).removeClass('active');
	$('html').removeClass('overflow');
  $('.slider-container').slick('slickSetOption', 'accessibility', true);
  $('.modal-slider__item').removeClass('current');
}

APP.$document.ready(function() {
  setButtonData()
  doAnimation ();

  $(window).on('resize', function() {
    setButtonData()
  })
  APP.$document.on('scroll', function(event){
    doAnimation ();

    if($(window).scrollTop() > 100) {
      $('.header').addClass('fixed');
    } else {
      $('.header').removeClass('fixed');
    }
  });

	APP.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });

  $(document).on('keyup', function (e) {
    if (e.keyCode == 37) {
        $(this).find('.modal.active .slick-prev').click();
    } else if (e.keyCode == 39) {
        $(this).find('.modal.active  .slick-next').click();
    }
  });

  APP.modalArrow.on('click', function() {
    var parent = $(this).parents('.modal-container'),
        firstSlide = parent.find('.modal-slider__item.first'),
        currentSlide = parent.find('.modal-slider__item.current'),
        totalSlides = parent.find('.modal-slider__item').length,
        currentSlideIndex = currentSlide.index();

    if($(this).hasClass('slick-next') && currentSlideIndex < (totalSlides - 1)) {
      var nextSlide = currentSlide.next();

      nextSlide.addClass('current');
      currentSlide.removeClass('current');
      parent.find('.slick-prev').removeClass('disabled');

      var currentIndex = parent.find('.modal-slider__item.current').index();
      firstSlide.css({'margin-left' : (-100 * currentIndex + "%")});
    } else if($(this).hasClass('slick-prev') && currentSlideIndex > 0) {
      var prevSlide = currentSlide.prev();

      prevSlide.addClass('current');
      currentSlide.removeClass('current');
      parent.find('.slick-next').removeClass('disabled');

      var currentIndex = parent.find('.modal-slider__item.current').index();
      firstSlide.css({'margin-left' : (-100 * currentIndex + "%")});
    }
    hideArrows(this);
  });

	$('.selected-files').hide();
	APP.uploadFile.on('click', function() {
			APP.wpFile.click();
	})

	APP.wpFile.on('change', function(event) {
		var fileName = event.target.files[0].name,
				replace = fileName.replace(/\s/g,'_');

		if($(window).width() < 1200 && $(window).width() >= 768) {
			$('.file-btn__text').hide();
		}
		$('.selected-files').show();
		$('.selected-files__text').html(replace);
	});

	APP.removeFile.on('click', function() {
		$('.selected-files__text').empty();
		$('.selected-files').hide();
		APP.wpFile.val('');
		if($(window).width() < 1200 && $(window).width() >= 768) {
			$('.file-btn__text').show();
		}
	});

	$('input[type="file"]').change(function(e){
  	var fileName = e.target.files[0].name;
	});

	APP.priceBtn.on('click', function(){
  	var currentSlide = $('.calculator-item.current');

  	APP.priceBtn.removeClass('disabled');
  	if($(window).width() >= 1200) {
  		$('.calculator__img').addClass('vibrate');
	  	setTimeout(function (){
			  $('.calculator__img').removeClass('vibrate')
			}, 1000);
  	}

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

    	if(!($(nextSlides).length - 1)){
    		$(this).addClass('disabled');
    		$('.calculator__submit').removeClass('disabled');
    	}
    	currentSlide.removeClass('active');
    	currentSlide.next().addClass('active');
    	currentSlide.removeClass('current').addClass('prev').next('.calculator-item').addClass('current');
    }
    fillTitle()
  });

	APP.scrollBtn.on('click', function(){
    var section = $(this).data('scroll'),
        scrollTo = $(section).offset().top - 70;

    $('html').removeClass('overflow');
    $('html, body').animate({ scrollTop: scrollTo }, 500);
    $('body').removeClass('menu');
    APP.hamburger.removeClass('active');
  });

	APP.modalBtn.on('click', function() {
		var attr = $(this).attr('data-target'),
				modal = $('.modal[data-target="' + attr + '"]'),
        order = $(this).attr('data-order');

    if($(this).hasClass('services-item__more')) {
      var title = $(this).parents('.services-item').find('.title-m').text(),
          subtitle = $(this).parents('.services-item').find('.title-m + span').text(),
          serviceNumber = $(this).data('service');

      modal.find('.modal__text[data-service-' + serviceNumber + '="true"]').show();
      modal.find('.modal__title').text(title);
      modal.find('.modal__title + p').text(subtitle);
    }
    
    if($(this).hasClass('modal__btn')) {
      closeModal();
    }
    
    modal.find('.modal-slider__item[data-order="' + order + '"').addClass('current');
    modal.find('.modal-slider__item.first').css({'margin-left' : (-100 * modal.find('.modal-slider__item.current').index() + "%")});
    hideArrows(modal.find('.modal-slider'));
		modal.addClass('active');
    $('html').addClass('overflow');
    $('.slider-container').slick('slickSetOption', 'accessibility', false);
	});

	$('.modal-close').on('click', function() {
    closeModal();
  });

  $('.modal').on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

  $(document).keyup(function(e) {
     if (e.key === "Escape") { 
        closeModal();
    }
	});

	APP.slider.each(function(key, item) {
    var options = {
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      dots: true,
      nextArrow: '<button class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="32.5px" height="37.5px"><path fill-rule="evenodd"  stroke="rgb(164, 186, 221)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(255, 255, 255)"d="M15.994,36.481 L0.496,27.484 L0.496,9.490 L15.994,0.494 L31.492,9.490 L31.492,27.484 L15.994,36.481 Z"/></svg><i><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="7px" height="14px"><path fill-rule="evenodd"  fill="rgb(28, 58, 106)"d="M6.575,12.864 L1.186,6.995 L6.575,1.126 L6.053,0.559 L0.131,6.995 L6.053,13.432 L6.575,12.864 Z"/></svg></i><div class="line"></div><div class="line"></div></button>',
      prevArrow: '<button class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="32.5px" height="37.5px"><path fill-rule="evenodd"  stroke="rgb(164, 186, 221)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(255, 255, 255)"d="M15.994,36.481 L0.496,27.484 L0.496,9.490 L15.994,0.494 L31.492,9.490 L31.492,27.484 L15.994,36.481 Z"/></svg><i><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="7px" height="14px"><path fill-rule="evenodd"  fill="rgb(28, 58, 106)"d="M6.575,12.864 L1.186,6.995 L6.575,1.126 L6.053,0.559 L0.131,6.995 L6.053,13.432 L6.575,12.864 Z"/></svg></i><div class="line"></div><div class="line"></div></button>',
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      }]
    };

    function attr (value) {
      return $(item).data(value);
    };

    $(item).slick(options);
    $('.slick-dots li button').each(function(){
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="10.5px" height="11.5px"><path fill-rule="evenodd"  stroke="rgb(28, 58, 106)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"d="M4.996,10.503 L0.493,8.002 L0.493,2.999 L4.996,0.498 L9.499,2.999 L9.499,8.002 L4.996,10.503 Z"/></svg>');
    });
  });
  APP.slider.on('breakpoint', function(){
    $('.slick-dots li button').each(function(){
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="10.5px" height="11.5px"><path fill-rule="evenodd"  stroke="rgb(28, 58, 106)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"d="M4.996,10.503 L0.493,8.002 L0.493,2.999 L4.996,0.498 L9.499,2.999 L9.499,8.002 L4.996,10.503 Z"/></svg>');
    });
  })
    
});

