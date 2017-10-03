$(function () {
  var images = [
    'images/activity/act_001.jpg',
    'images/activity/act_002.jpg',
    'images/activity/act_003.jpg',
    'images/activity/act_004.jpg',
    'images/activity/act_005.jpg',
    'images/activity/act_006.jpg',
    'images/activity/act_007.jpg',
    'images/activity/act_008.jpg',
    'images/activity/act_009.jpg',
    'images/activity/act_010.jpg',
    'images/activity/act_011.jpg'
  ];

  (function loadImages() {
    var $slides = $("<ul class='slides'></ul>");
    images.forEach(function(link) {
      var item = $("<li></li>");
      var span = $("<span class='image fit'></span>");
      var img = new Image();
      img.src = link;
      span.append(img);
      item.append(span);
      $slides.append(item);
    });
    $('#carousel').append($slides.clone());
    $('#slider').append($slides.clone());
  }());

  $('#carousel').fitVids().flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    minItems: 2,
    minItems: 4,
    asNavFor: '#slider'
  });

  $('#slider').fitVids().flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel",
    smoothHeight: true,
    start: function (slider) {
      $('body').removeClass('loading');
    }
  });


  // $(".flexslider")
  //   .fitVids()
  //   .flexslider({
  //     animation: "slide",
  //     useCSS: false,
  //     animationLoop: false,
  //     smoothHeight: true,
  //     before: function (slider) {
  //       //$f(player).api('pause');
  //     }
  //   });
});
