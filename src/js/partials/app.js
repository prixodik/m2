
var uikit = {
	lg: '1450',
	md: '1200',
	sm: '992',
	xs: '640',
	xxs: '480',
	ww: function () {
		return $(window).width();
	},

	wh: function () {
		return $(window).height();
	},

	mask: function () {
		$("input[type='tel']").mask('+7 (000) 000-0000', { placeholder: '+7 (___) ___-____' });
		$("input.js-mask-sms").mask('0 0 0 0 0 0', { placeholder: '_ _ _ _ _ _' });
	},

	niceSelect: function () {
		$('select').niceSelect();
		$('.nice-select .list').mCustomScrollbar();
	},

	niceSelectUpdate: function () {
		$('select').niceSelect('update');
		$('.nice-select .list').mCustomScrollbar();
	},

	countBlock: function () {
		// Количество +-
		$(".js-count-plus").click(function () {
			var count = $(this).parent().parent().children('input').val();
			$(this).parent().parent().children('input').val(++count);
			return false;
		});

		$(".js-count-minus").click(function () {
			var tempCount = $(this).parent().parent().children('input').val();
			var count = (--tempCount <= 1) ? 1 : tempCount;

			$(this).parent().parent().children('input').val(count);
			return false;
		});
	},

	headerFix: function () {
		var scroller = 0;
		var hpos = hpos = $('.header__bottom').offset().top;
		$(document).scroll(function () {
			scroller = $('html,body').scrollTop();

			console.log(scroller >= hpos);
			if (scroller >= hpos) {
				$('.header').height($('.header').height());
				$('.header__bottom').addClass('fixed');
			} else {
				$('.header').attr('style', '');
				$('.header__bottom').removeClass('fixed');
			}
		});

	},

	// navFixed: function () {
	// 	var MaxHight = 195,
	// 	var MinHight = 0;

	// 	var elem = $('#top_nav');
	// 	var top = $(this).scrollTop();
		
	// 	if(top > MaxHight){
	// 		elem.css('top', MinHight);
	// 	}           
		
	// 	$(window).scroll(function(){
	// 		top = $(this).scrollTop();
				
	// 		if (top+MinHight < MaxHight) {
	// 				elem.css('top', (MaxHight-top));
	// 		} else {
	// 				elem.css('top', MinHight);
	// 		}
	// 	});
	// },

	validation: function () {
		var
			classValidate = 'is-validate',
			classParent = '.form-group',
			classError = 'is-error';
		function error(el) {
			$(el)
				.addClass(classError)
				.removeClass(classValidate)
				.closest(classParent)
				.addClass(classError)
				.removeClass(classValidate);
		}
		function validate(el) {
			$(el)
				.removeClass(classError)
				.addClass(classValidate)
				.closest(classParent)
				.removeClass(classError)
				.addClass(classValidate);
		}
		function reset(el) {
			$(el)
				.removeClass(classValidate + ' ' + classError)
				.closest(classParent)
				.removeClass(classError)
				.removeClass(classValidate + ' ' + classError)
		}
		$('.form-control').focus(function () {
			reset($(this))
		});
		$('select').change(function () {
			reset($(this))
		});
		$('input[type="checkbox"], input[type="radio"]').change(function () {
			reset($(this))
		});
		function checkInput(el) {
			var $form = $(el);

			$form.find('.is-error').removeClass('is-error');//.each(function(){
			//$(this).removeClass('is-error');
			//console.log("!"+$form.find('.is-error').length+"!");
			//});

			$form.find('select.js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=tel].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=email].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=text].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=password].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			if ($('.js-pass1', $form).length != 0) {
				var pass01 = $form.find('.js-pass1').val();
				var pass02 = $form.find('.js-pass2').val();
				if (pass01 == pass02) {
					validate($('.js-pass1, .js-pass2', $form));
				} else {
					error($('.js-pass1, .js-pass2', $form));
				}
			}
			$form.find('textarea.js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=email]').each(function () {
				var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
				var $this = $(this);
				if ($this.hasClass('js-required')) {
					if (regexp.test($this.val())) {
						validate($this);
					} else {
						error($this);
					}
				} else {
					if ($this.val() != '') {
						if (regexp.test($this.val())) {
							validate($this);
						} else {
							error($this);
						}
					} else {
						reset($this)
					}
				}
			});

			$form.find('input[type=checkbox].js-required').each(function () {

				if ($(this).is(':checked')) {
					validate($(this));
				} else {
					error($(this));
					//$(this).addClass('is-error');
				}
			});

			var radios = [];
			$form.find('input[type=radio]:required').each(function () {
				var name = $(this).attr('name');

				if (radios.indexOf(name) == -1) {

					radios.push(name);
					var result = false;
					$form.find('input[name=' + name + '].js-required').each(function () {

						if ($(this).is(':checked')) {
							result = true;
						}
					});
					if (result == true) {
						validate($(this));
						return false;
					} else {
						//console.log(radios);
						$form.find('input[name=' + name + '].js-required').addClass(classError);
						error($(this));
					}
				}
			});
		}

		$('.js-submit').click(function () {
			var $form = $(this).closest('form');
			checkInput($form);
			var errors = $form.find('.is-error:visible').length;
			//console.log(errors);
			if (errors) {
				return false;
			} else if ($(this).data('href') != "" && $(this).data('href') != undefined) {

				// Открытие попапа после отправки формы.

				if ($(this).attr("href") != "" && $(this).attr("href") != undefined) {
					var href = $(this).attr("href");
				} else {
					var href = $(this).data("href");
				}
				if ($(this).data('media') == "lg" && uikit.ww() <= uikit.md) {
					return false;
				}

				var bodyWidth = $('body').width();

				$("body, html").addClass("overflow");

				if (bodyWidth - uikit.ww() < 0) {
					//$('body').css('padding-right',((bodyWidth - uikit.ww())* -1)+'px');
				}

				//$(".mobile-menu").removeClass("active");

				$(".popup").removeClass("active");
				$(href).addClass("active");

				return false;
			}
		});
	},
	
	tile: function() {
		$(".js-tile-1").addClass('active');
		$(".js-tile-2").click(function(e) {
			e.preventDefault();
			$(this).addClass('active');
			$(".main-section__row").addClass('js-row');
			$(".js-tile-1").removeClass('active');
		});
		$(".js-tile-1").click(function(e) {
			e.preventDefault();
			if ($(this).hasClass('active')) {
				false
			} else {
				$(this).addClass('active');
				$(".main-section__row").removeClass('js-row');
				$(".js-tile-2").removeClass('active');
			}
		});
	},

	calculate: function() {
		var value1=0;
		var value2=0;
		var value3=0;
		var value4=0;
		var value5=0;
		$("#calc-value-1").keyup(function() {
			value1 = $(this).val();
			if(value1 != 0 && value2 != 0 && value3 != 0 && value4 != 0 && value5 != 0){
				uikit.calcResult( value1, value2, value3, value4, value5 );
			}
  		});
		$("#calc-value-2").keyup(function() {
			value2 = $(this).val();
			if(value1 != 0 && value2 != 0 && value3 != 0 && value4 != 0 && value5 != 0){
				uikit.calcResult( value1, value2, value3, value4, value5 );
			}
  		});
		$("#calc-value-3").keyup(function() {
			value3 = $(this).val();
			if(value1 != 0 && value2 != 0 && value3 != 0 && value4 != 0 && value5 != 0){
				uikit.calcResult( value1, value2, value3, value4, value5 );
			}
  		});
		$("#calc-value-4").keyup(function() {
			value4 = $(this).val();
			if(value1 != 0 && value2 != 0 && value3 != 0 && value4 != 0 && value5 != 0){
				uikit.calcResult(value1, value2, value3, value4, value5);
			}
  		});
		$("#calc-value-5").keyup(function() {
			value5 = $(this).val();
			if(value1 != 0 && value2 != 0 && value3 != 0 && value4 != 0 && value5 != 0){
				uikit.calcResult(value1, value2, value3, value4, value5);
			}
  		});
	},

	calcResult: function(value1, value2, value3, value4, value5) {
		var result = 0.36*value1 + 2.77*value2 + 360000*value3 + value4 + value5;
		$('.js-calc-result').text(result);
	},
	
	tabs: function () {
		$('[data-tab]').click(function (e) {
			e.preventDefault();
			let tab = typeof ($(this).attr('href')) != 'undefined' ? $(this).attr('href') : $(this).attr('data-tab');
			if (typeof ($(this).attr('data-parent')) != 'undefined') {
				$('[href="' + tab + '"], [data-tab="' + tab + '"]').closest($(this).attr('data-parent')).addClass('is-active').siblings().removeClass('is-active');
			} else {
				$(this).addClass('is-active').siblings().removeClass('is-active');
			}
			$(tab).addClass('is-visible').siblings().removeClass('is-visible');
		});

		$(".js-tab-nav").click(function (e) {
			e.preventDefault();
			var href = $(this).attr("href");
			$(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass("is-active");
			$(this).parent().addClass("is-active");
			$(href).addClass("is-active");
		});

		$(".js-tab-show").click(function (e) {
			//alert(); 
			//console.log("#"+$(this).val()); 

			if ($(this).attr('href') != undefined) {

				//e.preventDefault(); 
			}
			var href = ($(this).attr("href") != undefined) ? $(this).attr("href") : "#" + $(this).val();
			var nav_id = $(this).data("navid");
			$(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass("is-active");
			$(nav_id).addClass("is-active");
			$(href).addClass("is-active");
		});
		//$(".js-tab-show").che
	},

	popups: function () {
		$(document).on("click", ".js-popup-show", function () {
			if ($(this).attr("href") != "" && $(this).attr("href") != undefined) {
				var href = $(this).attr("href");
			} else {
				var href = $(this).data("href");
			}
			if ($(this).data('media') == "lg" && uikit.ww() <= uikit.md) {
				return false;
			}

			var bodyWidth = $('body').width();

			$("body, html").addClass("overflow");

			if (bodyWidth - uikit.ww() < 0) {
				//$('body').css('padding-right',((bodyWidth - uikit.ww())* -1)+'px');
			}

			//$(".mobile-menu").removeClass("active");

			$(".popup").removeClass("active");
			$(href).addClass("active");



			return false;
		});

		$(".js-popup-hide").click(function () {
			$(".popup").removeClass("active");
			$("body, html").css('padding-right', 0).removeClass("overflow");
			return false;
		});
	},

	lazy: function () {

		function logElementEvent(eventName, element) {
		}
		var callback_enter = function (element) {
		};
		var callback_exit = function (element) {
		};
		var callback_loading = function (element) {
		};
		var callback_loaded = function (element) {
		};
		var callback_error = function (element) {
		};
		var callback_finish = function () {
		};
		var callback_cancel = function (element) {

		};

		var lazyLoadOb = new LazyLoad({
			class_applied: "lz-applied",
			class_loading: "lz-loading",
			class_loaded: "lz-loaded",
			class_error: "lz-error",
			class_entered: "lz-entered",
			class_exited: "lz-exited",
			// Assign the callbacks defined above
			callback_enter: callback_enter,
			callback_exit: callback_exit,
			callback_cancel: callback_cancel,
			callback_loading: callback_loading,
			callback_loaded: callback_loaded,
			callback_error: callback_error,
			callback_finish: callback_finish
		});
		lazyLoadOb.update();
	},

	sliders: function () {
		var ww = this.ww();
		var wh = this.wh();
		var lg = this.lg;
		var md = this.md;
		var sm = this.sm;
		var xs = this.xs;
		var xxs = this.xxs;

		if ($('.js-gallery-main').length) {

			$('.js-gallery-main').slick({
				slidesToShow: 1,
				centerMode: false,
				variableWidth: false,
				arrows: false,
				dots: false,
				infinite: true,
				autoplay: false,
				autoplaySpeed: 2000,
				lazyLoad: 'progressive',
				//fade: true,
				asNavFor: '.js-gallery-thumb'
			});

			$(".js-gallery-thumb").slick({
				focusOnSelect: true,
				infinite: true,
				variableWidth: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				centerMode: false,
				lazyLoad: 'progressive',
				arrows: false,
				fade: false,
				asNavFor: '.js-gallery-main',
				nextArrow: '<button type="button" class="gallery-block__thumb-next slick-next slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
				prevArrow: '<button type="button" class="gallery-block__thumb-prev slick-prev slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
				responsive: [/*{
                            breakpoint: lg,
                            settings: {
                                slidesToShow: 4,
                            }
                        },*/{
						breakpoint: sm,
						settings: {
							slidesToShow: 4,
						}
					}, {
						breakpoint: xs,
						settings: {
							slidesToShow: 3,
						}
					}]
			});

		}

		if ($('.js-product-imgs').length) {

			var counter = $('.js-product-imgs .main-section__img-item:not(.slick-cloned)').length;

			$('.js-product-imgs').on('afterChange', function (slick, currentSlide) {
				$('.js-product-imgs-counter').text(+(currentSlide.currentSlide + 1) + ' / ' + currentSlide.slideCount);
			});

			$('.js-product-imgs').on('init', function (slick) {
				var dom = slick.target;
				var counter = $(dom).find('.slick-slide:not(.slick-cloned)').length;
				$('.js-product-imgs-counter').text('1 / ' + counter);
			});

			$('.js-product-imgs').slick({
				slidesToShow: 1,
				centerMode: false,
				variableWidth: false,
				arrows: false,
				dots: false,
				infinite: true,
				autoplay: false,
				autoplaySpeed: 2000,
				lazyLoad: 'progressive',
				//fade: true,
				asNavFor: '.js-product-thumbs'
			});

			var vertical = (ww <= md) ? false : true;

			$(".js-product-thumbs").slick({
				focusOnSelect: true,
				infinite: true,
				variableWidth: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				centerMode: true,
				lazyLoad: 'progressive',
				arrows: true,
				fade: false,
				asNavFor: '.js-product-imgs',
				vertical: vertical,
				nextArrow: '<button type="button" class="main-section__thumbs-next slick-next slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
				prevArrow: '<button type="button" class="main-section__thumbs-prev slick-prev slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
				responsive: [/*{
                            breakpoint: lg,
                            settings: {
                                slidesToShow: 4,
                            }
                        },*/{
						breakpoint: md,
						settings: {
							/*slidesToShow: 4,
							slidesToScroll: 4,
							variableWidth: true,*/
							//vertical: false
						}
					}]
			});

		}

		if ($(".js-index-slider-img").length || $(".js-index-slider-info").length) {

			$(".js-index-slider-img").slick({
				infinite: true,
				variableWidth: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				lazyLoad: 'progressive',
				arrows: false,
				fade: false,
				dots: true,
				dotsClass: 'slick-dots index-section__dots'
				//asNavFor: $('.js-index-slider-info'),
			});

			$(".js-index-slider-info").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				lazyLoad: 'progressive',

				arrows: false,
				dots: true,
				asNavFor: $('.js-index-slider-img'),
				appendDots: $('.js-index-slider-dots'),
				fade: true,
				//nextArrow: '<button type="button" class="slider-section__next slick-next slick-arrow slick-arrow--circle slick-arrow--white"><svg class="icon"><use xlink:href="images/sprite.svg#arrow-right-2"></svg></button>',
				//prevArrow: '<button type="button" class="slider-section__prev slick-prev slick-arrow slick-arrow--circle slick-arrow--white"><svg class="icon"><use xlink:href="images/sprite.svg#arrow-left-2"></svg></button>',
				responsive: [{
					breakpoint: xs,
					settings: {
						adaptiveHeight: true
					}
				}]
			});

			$('.js-index-slider-next').click(function () {
				$('.js-index-slider-img').slick('slickNext');
				$('.js-index-slider-info').slick('slickNext');
				return false;
			});

		}

		/*if ($('.js-categorys-slider').length) {
			$('.js-categorys-slider').each(function () {
				var $this = $(this);

				$this.slick({
					slidesToShow: 1,
					centerMode: false,
					variableWidth: true,
					arrows: true,
					dots: false,
					infinite: true,
					autoplay: false,
					autoplaySpeed: 2000,
					lazyLoad: 'progressive',
					prevArrow: '<div class="main-section__categorys-prev"><a href="#" tabindex="-1"><svg class="icon icon_arrow-right"><use xlink:href="images/sprite-svg.svg#arrow-right"></use></svg></a></div>',
					nextArrow: '<div class="main-section__categorys-next"><a href="#" tabindex="-1"><svg class="icon icon_arrow-right"><use xlink:href="images/sprite-svg.svg#arrow-right"></use></svg></a></div>',
					responsive: [

					  
					] 
				});
			});

		}*/

		if ($('.js-date-slider').length) {
			$('.js-date-slider').each(function () {
				var $this = $(this);

				$this.slick({
					slidesToShow: 5,
					centerMode: false,
					variableWidth: false,
					arrows: true,
					dots: false,
					infinite: true,
					autoplay: false,
					autoplaySpeed: 2000,
					lazyLoad: 'progressive',
					nextArrow: '<button type="button" class="main-section__slider-next slick-next slick-arrow slick-arrow--md"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right-2"></svg></button>',
					prevArrow: '<button type="button" class="main-section__slider-prev slick-prev slick-arrow slick-arrow--md"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right-2"></svg></button>',
					responsive: [
						{
							breakpoint: md,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 4,
							}
						},
						{
							breakpoint: sm,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
							}
						},
						{
							breakpoint: xs,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							}
						}
					]
				});


			});

		}

		if ($('.js-products-slider').length) {
			$('.js-products-slider').each(function () {
				var $this = $(this);

				$this.slick({
					slidesToShow: 4,
					slidesToScroll: 2,
					centerMode: false,
					variableWidth: false,
					arrows: true,
					dots: true,
					infinite: true,
					autoplay: false,
					autoplaySpeed: 2000,
					lazyLoad: 'progressive',
					prevArrow: '<a href="#" class="products-section__prev slick-arrow slick-prev" tabindex="-1"><svg class="icon icon_arrow-right-2"><use xlink:href="images/sprite-svg.svg#arrow-right-2"></use></svg></a>',
					nextArrow: '<a href="#" class="products-section__next slick-arrow slick-next" tabindex="-1"><svg class="icon icon_arrow-right-2"><use xlink:href="images/sprite-svg.svg#arrow-right-2"></use></svg></a>',
					responsive: [
						{
							breakpoint: sm,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: xs,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});

			});

			$('.js-products-slider-prev').click(function () {
				$('.js-products-slider').slick('slickPrev');
				return false;
			});
			$('.js-products-slider-next').click(function () {
				$('.js-products-slider').slick('slickNext');
				return false;
			});

		}


	},

	fancybox: function () {
		$(".js-fancybox, .fancybox").fancybox({
			// Options will go here
			iframe: {
				preload: true
			}
		});
	},

	accardion: function () {
		$('.js-accardion-toggle').click(function () {
			$(this).toggleClass('is-active').next().toggleClass('is-active');
			return false;
		});
	},

	mobile: function () {

		$('.js-search-mob-show').click(function () {
			$('.js-search-mob-show').parent().addClass('hidden');
			$('.js-search-mob').addClass('is-active');

			return false;
		});
		$('.js-search-mob-hide').click(function () {
			$('.js-search-mob-show').parent().removeClass('hidden');
			$('.js-search-mob').removeClass('is-active');

			return false;
		});

		$('.js-menu-toggle').click(function () {
			$(this).parent().toggleClass('hover');
			$('body').toggleClass('overflow');

			//$('.js-mobile-menu').slideToggle();

			$(document).mouseup(function (e) { // событие клика по веб-документу
				var div = $('.js-menu-toggle').parent(); // тут указываем ID элемента
				if (!div.is(e.target) // если клик был не по нашему блоку
					&& div.has(e.target).length === 0) { // и не по его дочерним элементам
					div.removeClass('hover');; // скрываем его
				}
			});

			return false;
		});

		$('.js-menu-parent-2').each(function () {
			var pos = $(this).position();
			$(this).children('.menu-block__sub2').css('left', pos.left + $(this).outerWidth() + 10);
		});
	},

	scrollTo: function () {
		$(".js-scroll-to").click(function () {
			var href = $(this).attr("href");
			$('html, body').animate({ scrollTop: $(href).offset().top }, 400);
			return false;
		});
	},

	rangeSlider: function () {
		if ($(".js-range-slider").length) {
			$(".js-range-slider").each(function () {
				var $r = $(this);
				$r.ionRangeSlider({
					skin: "round",
					type: 'double',
					min: $r.data('min'),
					max: $r.data('max'),
					from: $r.data('from'),
					to: $r.data('to'),
					hide_min_max: true,
					hide_from_to: true
				});

				$r.on("onStart", function () {
					var $inp = $(this);
					//var from = $inp.prop("value"); // reading input value
					var from = $inp.data("from"); // reading input data-from attribute
					var to = $inp.data("to"); // reading input data-from attribute
					$r.parent().find('input.js-range-from').val("От " + from);
					$r.parent().find('input.js-range-to').val("До " + to);

					//console.log(from, to); // FROM value
				});

				$r.on("change", function () {
					var $inp = $(this);
					//var from = $inp.prop("value"); // reading input value
					var from = $inp.data("from"); // reading input data-from attribute
					var to = $inp.data("to"); // reading input data-from attribute
					$r.parent().find('input.js-range-from').val("От " + from);
					$r.parent().find('input.js-range-to').val("До " + to);

					console.log(from, to); // FROM value
				});
			});
		}
	},

	catalogPage: function () {
		/* $('.js-sort-block-show').click(function () {
			$('.js-sort-block').addClass('is-active');
			return false;
		});
		$('.js-sort-block-close').click(function () {
			$('.js-sort-block').removeClass('is-active');
			return false;
		}); */

		$('.js-filter-block-show').click(function () {
			$('.js-filter-block').addClass('is-active');
			$('body, html').addClass('overflow');
			return false;
		});
		$('.js-filter-block-close').click(function () {
			$('.js-filter-block').removeClass('is-active');
			$('body, html').removeClass('overflow');
			return false;
		});

		$('.js-filter-reset').click(function () {
			$('.js-filter').find('input[type=radio], input[type=checkbox]').prop('checked', false);
			$('.js-filter').find('select option:selected').prop('selected', false);
			$('select').niceSelect('update');

			$('.js-filter-result').empty();
			return false;
		});

		$('.js-filter input[type=radio], .js-filter input[type=checkbox]').click(function () {

			$('.js-filter-result').empty();

			$('.js-filter input[type=radio]:checked, .js-filter input[type=checkbox]:checked').each(function () {
				$('<a class="filter-block__result-item js-filter-del" href="#"><span>' + $(this).val() + '</span><svg class="icon icon_close"><use xlink:href="images/sprite-svg.svg#close"></use></svg></a>').appendTo($('.js-filter-result'));
			});

			$('.js-filter .option.selected').each(function () {
				$('<a class="filter-block__result-item js-filter-del" href="#"><span>' + $(this).data('value') + '</span><svg class="icon icon_close"><use xlink:href="images/sprite-svg.svg#close"></use></svg></a>').appendTo($('.js-filter-result'));
			});

		});

		$(document).on('click', '.js-filter .nice-select .option', function () {
			//console.log($(this).data('value'));
			setTimeout(function () {
				$('.js-filter-result').empty();

				$('.js-filter input[type=radio]:checked, .js-filter input[type=checkbox]:checked').each(function () {
					$('<a class="filter-block__result-item js-filter-del" href="#"><span>' + $(this).val() + '</span><svg class="icon icon_close"><use xlink:href="images/sprite-svg.svg#close"></use></svg></a>').appendTo($('.js-filter-result'));
				});

				$('.js-filter .option.selected').each(function () {
					$('<a class="filter-block__result-item js-filter-del" href="#"><span>' + $(this).data('value') + '</span><svg class="icon icon_close"><use xlink:href="images/sprite-svg.svg#close"></use></svg></a>').appendTo($('.js-filter-result'));
				});
			}, 200);
		});

		$(document).on('click', '.js-filter-del', function () {
			var text = $(this).children('span').text();
			$(this).remove();
			$('.js-filter').find('input[value="' + text + '"]').prop('checked', false);
			$('.js-filter').find('select option[value="' + text + '"]:selected').prop('selected', false);
			$('select').niceSelect('update');
			return false;
		});
	},

	mobile: function(){
		$('.js-mobile-menu-toggle').click(function(){
			 $(this).toggleClass('active');
			 //$('.js-mobile-menu').toggleClass('is-active');
			 $('.js-mobile-menu').slideToggle();
			 return false;
		})
   },

	mainInit: function () {

		this.sliders();

		this.lazy();
		//this.validation();

		//this.tabs();
		//this.navFixed();
		this.niceSelect();
		this.countBlock();
		this.fancybox();
		this.headerFix();
		this.popups();
		this.mask();
		this.accardion();
		this.mobile();
		this.rangeSlider();
		this.tile();
		this.calcResult();
		this.calculate();
		//this.scrollTo();


	}
};
$(document).ready(function () {

	uikit.mainInit();

	// Разворот текстового описания
	$(".js-more-text").click(function () {
		if ($(this).hasClass('hide') == false) {
			$(this).addClass('hide');
			$(this).parent().parent().find(".js-wrap-text").removeClass("d-none");
		} else {
			$(this).removeClass('hide');
			$(this).parent().parent().find(".js-wrap-text").addClass("d-none");
		}
		return false;
	});

});
var clrTimeOut;
$(window).on('load', function (e) {
	clearTimeout(clrTimeOut);
	clrTimeOut = setTimeout(function () {

	}, 200);
});

$(window).resize(function () {
	clearTimeout(clrTimeOut);
	clrTimeOut = setTimeout(function () {

	}, 200);

});

$(window).scroll(function () {
	//uikit.headerFixed();
});
