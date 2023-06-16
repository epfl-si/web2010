/*
 * EPFL navigation
 *
 * (c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
 * Switzerland, VPSI, 2017.
 *
 * Date: 2013-09-06 16:00
 * Revision: 1.5
 */

function showPanel() {
  jQuery("#header").expose({
    color: '#000',
    opacity: 0.6,
    loadSpeed: 0,
    closeSpeed: 0
  });
  jQuery('.navigation-panel').addClass("hidden");
  jQuery(this).children('.navigation-panel').removeClass('hidden');
}

function hidePanel() {}

function removeLastWord(element) {
  var text = element.html();
  var i = text.lastIndexOf(' ');
  element.html(text.substring(0, i) + '...');
  return i !== -1;
}

/* add arrows when news texts are too long */
function isTotallyVisible(parent, element) {
  return element.position().top + element.outerHeight() + 2 < parent.position().top + parent.innerHeight();
}

jQuery.fn.exists = function() {
  return this.length > 0;
};
jQuery(document).ready(function($) {
  "use strict";
  // Big panels
  var showPane = function(pane) {
    $('.navigation-panel').addClass("hidden"); // close all
    $(pane).removeClass('hidden');
    $('#header2013').expose({
      color: '#000',
      opacity: 0.6,
      loadSpeed: 0,
      closeSpeed: 0
    });
  };

  var closePane = function() {
    if ($(".navigation-panel:not(.hidden)").length === 0) {
      return;
    }
    $('.navigation-panel').addClass("hidden");
    $.mask.close();
  };

  if ($('#header').exists()) {
    /* Header - Web 2010 */

    // Big panels
    $('#header').mouseleave(function() {
      $.mask.close();
      $('.navigation-panel').addClass("hidden");
    });
    var config = {
      over: showPanel,
      out: hidePanel,
      timeout: 500
    };
    $('#header .menu').hoverIntent(config);
    $("#header .main-link").click(function() {
      return false;
    });
    $('#header').mouseleave(closePane);

  } else {
    /* Header - Web 2013 */

    $("#header2013 #nav-menus .menu").click(function() {
      var pane = $('.navigation-panel', this);
      if (pane.hasClass('hidden')) {
        showPane(pane);
      } else {
        closePane();
      }
      return false; // do not propagate
    });
    $('#header2013 .navigation-panel').click(function(event) {
      event.stopPropagation();
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) { // escape key
        closePane();
      }
    });
    $('html').click(closePane);
  } // end Web2010/2013

  /* navigation: Dropdown menus */
  $('.dropdown').click(function() {
    $(this).children('ul').toggleClass('hidden');
  });
  $('.dropdown').mouseleave(function() {
    $(this).children('ul').addClass('hidden');
  });
  $('#main-navigation .dropdown').hoverIntent(
    function() {
      $(this).children('ul').removeClass('hidden');
    },
    function() {
      $(this).children('ul').addClass('hidden');
    });
  $('#main-navigation .dropdown').click(function() {
    return true;
  });

  /* navigation: tree */
  $(".tree li.inpath").addClass('open');
  $(".tree").treeview({
    'collapsed': true,
    'unique': false
  });
  $(".tree").children().addClass('local-color');
  $(".tree li a").hover(
    function(e) {
      e.stopPropagation();
      $('.tree li').removeClass("hover");
      $(this).parent().addClass('hover');
    },
    function(e) {
      e.stopPropagation();
      $(this).parent().removeClass("hover");
    }
  );

  /* activate togglers */
  $('.toggler').click(function() {
    $(this).toggleClass("toggled-active").next().slideToggle("slow");
    return false;
  });

  /* modal windows */
  $(".modal-opener[rel]").overlay({
    mask: {
      color: '#000',
      opacity: 0.6,
      loadSpeed: 200
    },
    closeOnClick: false
  });

  /* Set correct margin to elements */
  $(".box.two-cols div.box-col:even", this).addClass("box-left-col");
  $(".box.two-cols div.box-col:odd", this).addClass("box-right-col");
  $("#content:not(.fullpage-content) .box:odd", this).addClass("last-col");

  /* add class .left to images having align="left" and so on. */
  $('img[align]').each(function() {
    $(this).addClass($(this).attr('align'));
  });


  /* Overlay */
  $("img[rel]").overlay();

  /* News (actu.epfl.ch) */
  var newsDivs = $("div.news-text");
  newsDivs.each(function(i, news) {
    news = $(news);
    var newsText = news.find("p span.heading");
    var newsLink = news.find("p span.read-more");
    if (newsText.length && newsLink.length) {
      while (!isTotallyVisible(news, newsLink) && removeLastWord(newsText)) {
        void(0);
      }
    }
  });

  /* Jahia specific */
  $("#main-content ul").each(function() {
    var elem = $(this);
    if (elem.children().length === 0) {
      elem.remove();
    }
  });

});
