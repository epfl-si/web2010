/*
 * EPFL navigation
 *
 * Copyright (c) 2010-2012 EPFL
 *
 * Date: 2012-02-27 14:00
 * Revision: 1.4
 */
var current_search_base = null;

function change_search_base(radio){
    jQuery('#search-options').remove();
    jQuery("#searchform input[type=radio]").removeAttr("checked");    
    var rid = radio.attr('id');
    var label =  jQuery('label[for=' + rid + ']');
    jQuery("#searchfield").autocomplete({ disabled: true });
    
    switch (rid){
        case "search-engine-person":
            getPeopleAutocomplete();
            break;
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
    radio.attr('checked','checked');
    radio.blur();
    if (document.referrer.indexOf('#') != -1) {
        radio.focus();
    }
}

function showPanel() {
    jQuery("#header").expose({color: '#000', opacity: 0.6, loadSpeed: 0, closeSpeed: 0});
    jQuery('.navigation-panel').addClass("hidden");
    jQuery(this).children('.navigation-panel').removeClass('hidden');
}

function hidePanel(){}

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

function getPeopleAutocomplete(){
    var field = jQuery("#searchfield");
    field.autocomplete({
        source: function(request, response) {
            jQuery.ajax({
                         url: "http://search.epfl.ch/json/autocompletename.action",
                         dataType: 'jsonp',
                         data: { maxRows: 15, term: request.term },
                         success: function(data){
                             response(jQuery.map(data.result, function(item) {
                                return {
                                        label: item.name + ', ' + item.firstname, 
                                        value: item.firstname + ' ' + item.name
                                        }
                              }));
                    
                         }
            });
        },
        appendTo: jQuery('#searchform'),
        disabled: false,
        minLength: 3,
        select: function(event, ui) {
            if (ui.item) { field.val(ui.item.value);}
            jQuery('#searchform').submit();
        }      
    });
}


jQuery(document).ready(function($){
    $('#searchform').submit(function() {
	if ($('#searchfield').val() === $('#searchform label.current').attr('title')) {
		$('#searchfield').val('');
	}
    });
    current_search_base = $('#searchform label.current');
    change_search_base($("#search-engine-person"));
    $('#search-box input[type=radio]').change(function(){ change_search_base($(this)); });
    $('#searchlink').click(function(){ $('#searchfield').focus();});
    $('#searchfield').focus(function(){ if ($(this).val() === current_search_base.attr('title')){ $(this).val('').addClass('focused');} });
    $('#searchfield').blur(function() { if ($(this).val() === '') { $(this).val($('#searchform label.current').attr('title')).removeClass('focused');} });
    $('#searchfield').keypress(function(e){ if (e.which === 13) { $(this).parent('form').submit();} });

    
    /* Navigation: big panels */
    $('#header').mouseleave(function(){ 
        $.mask.close();
        $('.navigation-panel').addClass("hidden");
    } );
    var config = { over: showPanel, out: hidePanel, timeout: 500 };
    $("#main-menus .main-link").click(function(){ return false; });
    $('#main-menus .menu').hoverIntent(config);
    
    /* navigation: Dropdown menus */
    $('.dropdown').click(function(){ $(this).children('ul').toggleClass('hidden'); });
    $('.dropdown').mouseleave(function(){ $(this).children('ul').addClass('hidden'); });
    $('#main-navigation .dropdown').hoverIntent(
        function(){ $(this).children('ul').removeClass('hidden');}, 
        function(){ $(this).children('ul').addClass('hidden');});
    $('#main-navigation .dropdown').click(function(){ return true;});

    /* navigation: tree */
    $(".tree li.inpath").addClass('open');
    $(".tree").treeview({ 'collapsed': true, 'unique': false });
    $(".tree").children().addClass('local-color');
    $(".tree li a").hover(
        function(e) { e.stopPropagation(); 
                      $('.tree li').removeClass("hover");
                      $(this).parent().addClass('hover');
                      },
        function(e) { e.stopPropagation(); $(this).parent().removeClass("hover");}
    );

    /* Navigation: search boxes */ 
    if ($.browser.msie) {
        $('#search-box input[type=radio]').click(function(){ change_search_base($(this)); this.blur(); this.focus(); });
    }


    /* activate togglers */
    $('.toggler').click(function(){ $(this).toggleClass("toggled-active").next().slideToggle("slow"); return false;});  
    
    /* modal windows */
    $(".modal-opener[rel]").overlay({ mask: { color: '#000', opacity: 0.6, loadSpeed: 200}, closeOnClick: false});

    /* Set correct margin to elements */
    $(".box.two-cols div.box-col:even",this).addClass("box-left-col");
    $(".box.two-cols div.box-col:odd", this).addClass("box-right-col");
    $("#content:not(.fullpage-content) .box:odd",this).addClass("last-col");

    /* add class .left to images having align="left" and so on. */
    $('img[align]').each(function(){ $(this).addClass($(this).attr('align')); });

    /* Make labels clickable under mobile safari*/
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
       $('#search-box label').click(function () { var el = $(this).attr('for'); change_search_base($('#' + el));});
    }
    
    /* Overlay */
    $("img[rel]").overlay();
    
    /* News (actu.epfl.ch) */
    var newsDivs = $("div.news-text");
    newsDivs.each(function(i, news) {
	  news = $(news);
	  var newsText = news.find("p span.heading");
	  var newsLink = news.find("p span.read-more");
	  if (newsText.length && newsLink.length) {
        while (!isTotallyVisible(news, newsLink) && removeLastWord(newsText)){ void(0); }
      }
    });
    
    
    /* Google Analytics */
    $.jGoogleAnalytics('UA-4833294-1', {topLevelDomain: '.epfl.ch'} );


    /* Jahia specific */
    $("#main-content ul").each(function(){ 
        var elem = $(this);
        if(elem.children().length === 0){
            elem.remove();
        }
    });

});
