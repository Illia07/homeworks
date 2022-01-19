"use strict";

$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 80) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });
  $(".hamburger, #mobile-menu-shadow").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  });
  $(".mob-menu__link").on("click", function () {
    $(".hamburger").removeClass("is-active");
    $("body").toggleClass("open");
  });
  $(".menu__link, .mob-menu__link").on("click", function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top;
    $("html, body").animate({
      scrollTop: top
    }, 400);
  });
  $("#to-top, #to-top-mobile").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 400);
  });
});