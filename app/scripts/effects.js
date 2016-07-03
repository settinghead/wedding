/* eslint-env browser */

/* globals ScrollMagic:false */
/* globals Power1:false */
/* globals $:false */
/* globals TweenMax:false */
/* globals StackBlur:false */
/* globals html2canvas:false */
/* globals TimelineMax:false */
/* eslint max-len: 0 */

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
  if ($(document).scrollTop() > 150) {
    $('header').addClass('shrink');
    $('.blurheader').addClass('shrink');
  } else {
    $('header').removeClass('shrink');
    $('.blurheader').removeClass('shrink');
  }
}

// frosty glass

var topOffset = 0;

$(function() {
  topOffset = $(window).scrollTop();
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
            15);
    }
  });
  var vv = setTimeout(function() {
    $('header').show();
    clearTimeout(vv);
  }, 200);
});

$(window).scroll(adjustPane);

window.onresize = function() {
  $('canvas').width($(window).width());
};

$(document).bind('touchmove', adjustPane);
$(document).bind('touchend', adjustPane);

function adjustPane() {
  console.log($(window).scrollTop() - topOffset);
  $('canvas').css(
        '-webkit-transform',
        'translatey(-' + ($(window).scrollTop() - topOffset) + 'px)');
}
