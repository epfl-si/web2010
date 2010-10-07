/*
 * EPFL navigation
 *
 * Copyright (c) 2010 EPFL
 *
 * Date: 2010-08-20 14:15
 * Revision: 1.2
 */
jQuery(document).ready(function(){    
    /* Navigation: big panels */
    function showPanel() {
        jQuery("#header").expose({color: '#000', opacity: 0.6, loadSpeed: 0, closeSpeed: 0});
        jQuery('.navigation-panel').addClass("hidden");
        jQuery(this).children('.navigation-panel').removeClass('hidden');
    }
    function hidePanel() {
    }
    jQuery('#header').mouseleave(function(){ 
        jQuery.mask.close();
        jQuery('.navigation-panel').addClass("hidden");
    } );
    var config = { over: showPanel, out: hidePanel, timeout: 500 };
    jQuery("#main-menus .main-link").click(function(){ return false; });
    jQuery('#main-menus .menu').hoverIntent(config);
    
    /* Navigation: search boxes */ 
    var current_search_base = jQuery('#searchform label.current');
    function change_search_base(radio){
        jQuery('#search-options').remove();
        rid = radio.attr('id');
        jQuery("#searchform input[type=radio]").removeAttr("checked");
	    radio.attr('checked','checked');

        label =  jQuery('label[for=' + rid + ']'); 
        switch (rid){
            case "search-engine-local":
                jQuery('#searchform').append(
                    jQuery("<input/>").attr("type", "hidden").attr("id","search-options").attr("name", "as_sitesearch").attr("value", jQuery.url.attr("host"))
                );
                break;
            default:
                break;
        }
        if (jQuery('#searchfield').val() === jQuery('#searchform label.current').attr('title')) { jQuery('#searchfield').val(''); }
        if (jQuery('#searchfield').val() === '') { jQuery('#searchfield').val(label.attr('title')); }
        current_search_base.toggleClass('current');
        current_search_base = label;
        current_search_base.toggleClass('current');
        radio.blur();
        radio.focus();
    }
    change_search_base(jQuery("#search-engine-person"));
    if (jQuery.browser.msie) {
        jQuery('#search-box input[type=radio]').click(function(){ change_search_base(jQuery(this)); this.blur(); this.focus(); });
    }
     /* Make labels clickable under mobile safari*/
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
       jQuery('#search-box label').click(function () { var el = jQuery(this).attr('for'); change_search_base(jQuery('#' + el));});
    }
    
    jQuery('#search-box input[type=radio]').change(function(){ change_search_base(jQuery(this)); });
    jQuery('#searchlink').click(function(){ jQuery('#searchfield').focus();});
    jQuery('#searchfield').focus(function(){ if (jQuery(this).val() === current_search_base.attr('title')){ jQuery(this).val('').addClass('focused');} });
    jQuery('#searchfield').blur(function() { if (jQuery(this).val() === '') { jQuery(this).val(jQuery('#searchform label.current').attr('title')).removeClass('focused');} });
    jQuery('#searchfield').keypress(function(e){ if (e.which == 13) { jQuery(this).parent('form').submit();} });
    
    /* navigation: Dropdown menus */
    jQuery('.dropdown').click(function(){ jQuery(this).children('ul').toggleClass('hidden'); });
    jQuery('.dropdown').mouseleave(function(){ jQuery(this).children('ul').addClass('hidden'); });
    jQuery('#main-navigation .dropdown').hoverIntent(
        function(){ jQuery(this).children('ul').removeClass('hidden');}, 
        function(){ jQuery(this).children('ul').addClass('hidden');});
    jQuery('#main-navigation .dropdown').click(function(){ return true;});
    
    /* navigation: tree */
    jQuery(".tree li.inpath").addClass('open');
    jQuery(".tree").treeview({ 'collapsed': true, 'unique': false });
    jQuery(".tree").children().addClass('local-color');
    jQuery(".tree li a").hover(
        function(e) { e.stopPropagation(); 
                      jQuery('.tree li').removeClass("hover");
                      jQuery(this).parent().addClass('hover');
                      },
        function(e) { e.stopPropagation(); jQuery(this).parent().removeClass("hover");}
    );
    
    /* activate togglers */
    jQuery('.toggler').click(function(){ jQuery(this).toggleClass("toggled-active").next().slideToggle("slow"); return false;});  
    
    /* Set correct margin to elements */
    jQuery(".box.two-cols div.box-col:even",this).addClass("box-left-col");
    jQuery(".box.two-cols div.box-col:odd", this).addClass("box-right-col");
    jQuery("#content:not(.fullpage-content) .box:odd",this).addClass("last-col");
    
    /* add class .left to images having align="left" and so on. */
    jQuery('img[align]').each(function(){ jQuery(this).addClass(jQuery(this).attr('align')); });
    
    /* add arrows when news texts are too long */
    function isTotallyVisible(element) {
      var parentHeight = element.offsetParent().innerHeight();
      var elementHeight = element.innerHeight();
      return element.position().top + elementHeight < parentHeight;
  	};

    function removeLastWord(element) {
      var text = element.html();
      var i = text.lastIndexOf(' ');
      element.html(text.substring(0, i) + '...');
      return i != -1;
    };
	
    var textSpans = jQuery(".news-text p .heading");
    var readMoreLinks = jQuery(".news-text p .read-more");
    for(var i = 0; i < textSpans.length; i++) {
      var textSpan = jQuery(textSpans[i]);
      var readMoreLink = jQuery(readMoreLinks[i]);	
      while(!isTotallyVisible(readMoreLink) && removeLastWord(textSpan));
    } 
   
    /* Google Analytics */
    jQuery.jGoogleAnalytics('UA-4833294-1', {topLevelDomain: '.epfl.ch'} );
    
});