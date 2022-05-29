$(document).ready(function(){
   $('.carousel__wrapper').slick({
      infinite: true,
      speed: 100,
      adaptiveHeight: true,
      prevArrow:'<button type="button" class="slick-prev"><img src="img/main/left_arrow.png"></button>',
      nextArrow:'<button type="button" class="slick-next"><img src="img/main/right_arrow.png"></button>',
      responsive: [
         {
           breakpoint: 992,
           settings: {
             arrows: false,
             adaptiveHeight: false,
             dots:true,
             slidesToShow: 1
           }
         },
         {
           breakpoint: 480,
           settings: {
             arrows: false,
             slidesToShow: 1,
             adaptiveHeight: false,
             dots:true
           }
         }
       ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
      $(this)
        .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });
   
    function toggleSlide(item){
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content--active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
        })  
      })
    }  
    
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    
    // Modal
    $('[data-modal=consultation]').on('click',function() {
      $('.overlay, #consultation').fadeIn('1000');
    });

    $('.modal__close').on('click',function() {
      $('.overlay, #consultation, #order, #thanks').fadeOut('1000');
    });

    $('.button--mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('1000');
      })
    });

    // Validation form
    function validateForms(form){
      $(form).validate( {
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },  
        messages: {
          name: "Пожалуйста введите Ваше имя",
          phone: "Пожалуйста введите Ваш номер",
          email: {
            required: "Пожалуйста введите Вашу почту",
            email: "Неправильно введен адрес почты"
          }
        }
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+38(999) 999-99-99");

    // Send form to server
    $('form').submit(function(e) {
      e.preventDefault();
      if(!$(this).valid()) {
        return;
      }
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
      });
      return false;
    });

    // Scroll up
    $(window).scroll(function() {
      if ($(this).scrollTop() >1000){
        $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();}
    });

    // Slow scroll
    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();

 });