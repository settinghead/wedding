var $ = require('jquery');
/* globals ScrollMagic:false */
/* globals window:false */
/* globals Power1:false */
/* globals TweenMax:false */
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
