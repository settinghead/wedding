/* eslint-env browser */

/* globals ScrollMagic:false */
/* globals Power1:false */
/* globals $:false */
/* globals TweenMax:false */
/* globals StackBlur:false */
/* globals html2canvas:false */
/* globals TimelineMax:false */
/* eslint max-len: 0 */

$(function() {
  var flightpath = {
    entry: {
      curviness: 1.25,
      autoRotate: true,
      values: [
          {x: 100, y: -20},
          {x: 300, y: 10}
      ]
    },
    looping: {
      curviness: 1.25,
      autoRotate: true,
      values: [
          {x: 510, y: 60},
          {x: 620, y: -60},
          {x: 500, y: -100},
          {x: 380, y: 20},
          {x: 500, y: 60},
          {x: 580, y: 20},
          {x: 620, y: 15}
      ]
    },
    leave: {
      curviness: 1.25,
      autoRotate: true,
      values: [
          {x: 660, y: 20},
          {x: 800, y: 130},
          {x: $(window).width() + 300, y: -100}
      ]
    }
  };
  // init controller
  var controller = new ScrollMagic.Controller();

  // create tween
  var tween = new TimelineMax()
    .add(TweenMax.to($('#petal1'), 1.2, {css: {bezier: flightpath.entry}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal1'), 2, {css: {bezier: flightpath.looping}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal1'), 1, {css: {bezier: flightpath.leave}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal2'), 1.2, {css: {bezier: flightpath.entry}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal2'), 2, {css: {bezier: flightpath.looping}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal2'), 1, {css: {bezier: flightpath.leave}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal3'), 1.2, {css: {bezier: flightpath.entry}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal3'), 2, {css: {bezier: flightpath.looping}, ease: Power1.easeInOut}))
    .add(TweenMax.to($('#petal3'), 1, {css: {bezier: flightpath.leave}, ease: Power1.easeInOut}));

  // build scene
  new ScrollMagic.Scene({triggerElement: '#trigger', duration: 1000, offset: 100})
          .setPin('#target1')
          .setTween(tween)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger', duration: 1000, offset: 0})
          .setPin('#target2')
          .setTween(tween)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger', duration: 1000, offset: -100})
          .setPin('#target3')
          .setTween(tween)
          // .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
});

// for smooth scrolling

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });
});

// shrinking header
$(document).on('scroll', recheckHeader);
$(document).ready(recheckHeader);

function recheckHeader() {
  if ($(document).scrollTop() > 200) {
    $('header').addClass('shrink');
    $('.blurheader').addClass('shrink');
  } else {
    $('header').removeClass('shrink');
    $('.blurheader').removeClass('shrink');
  }
}

// frosty glass

$(function() {
  html2canvas($('main'), {
    onrendered: function(canvas) {
      $('.blurheader').append(canvas);
      $('canvas').attr('id', 'canvas');
      StackBlur.canvasRGB(
                canvas,
            0,
            0,
            $('canvas').width(),
            $('canvas').height(),
            20);
    }
  });
  var vv = setTimeout(function() {
    $('header').show();
    clearTimeout(vv);
  }, 200);
});

$(window).scroll(function() {
  $('canvas').css(
        '-webkit-transform',
        'translatey(-' + $(window).scrollTop() + 'px)');
});

window.onresize = function() {
  $('canvas').width($(window).width());
};

$(document).bind('touchmove', function() {
  $('canvas').css(
        '-webkit-transform',
        'translatey(-' + $(window).scrollTop() + 'px)');
});

$(document).bind('touchend', function() {
  $('canvas').css(
        '-webkit-transform',
        'translatey(-' + $(window).scrollTop() + 'px)');
});
