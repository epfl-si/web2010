/*
 * EPFL navigation
 *
 * Copyright (c) 2010 EPFL
 *
 * Date: 2010-04-29 18:07
 * Revision: 1
 */
jQuery(document).ready(function(){
    /* Navigation: big panels */
    function togglePanel(panel){
        if (panel.is('.hidden')) jQuery("#header").expose({color: '#000', opacity: 0.6, loadSpeed: 0, closeSpeed: 0});
        else jQuery.mask.close();
        panel.toggleClass("hidden");   
    }
    jQuery('#main-menus .menu').each(function(){
        var panel = jQuery(this).children('.navigation-panel');
        jQuery(this).mouseleave(function() { panel.addClass("hidden"); jQuery.mask.close()});
        jQuery(this).click(function(){ togglePanel(panel); return true; });
        jQuery(this).children('.main-link').click(function(){ togglePanel(panel); return false; });
    });
    
    /* Navigation: search boxes */ 
    var current_search_base = jQuery('#searchform label.current');
    function change_search_base(radio){
        rid = radio.attr('id')
        label =  jQuery('label[for=' + rid + ']') 
        switch (rid){
            case "search-engine-person":
                jQuery('#searchform').attr('action', 'http://search.epfl.ch/compoundDirectory.do');
                jQuery('#searchfield').attr('name', 'q');
                break;
            case "search-engine-place":
                jQuery('#searchform').attr('action', 'http://plan.epfl.ch/');
                jQuery('#searchfield').attr('name', 'room');
                break;
            case "search-engine-epfl":
                jQuery('#searchform').attr('action', 'http://search.epfl.ch/web.do');
                jQuery('#searchfield').attr('name', 'q');
                break;
            case "search-engine-local":
                jQuery('#searchform').attr('action', 'http://search.epfl.ch/web.do');
                jQuery('#searchfield').attr('name', 'q');
                break;
        }
        if (jQuery('#searchfield').val() === jQuery('#searchform label.current').attr('title')) jQuery('#searchfield').val('');
        if (jQuery('#searchfield').val() === '') jQuery('#searchfield').val(label.attr('title'));
        current_search_base.toggleClass('current');
        current_search_base = label;
        current_search_base.toggleClass('current')
    }
    change_search_base(jQuery("#search-engine-person"));
    jQuery('#searchlink').click(function(){ jQuery('#searchfield').focus();});
    jQuery('#search-box input[type=radio]').change(function(){ change_search_base(jQuery(this)); });
    jQuery('#searchfield').focus(function(){ if (jQuery(this).val() === current_search_base.attr('title')) jQuery(this).val('').addClass('focused'); });
    jQuery('#searchfield').blur(function() { if (jQuery(this).val() === '')  jQuery(this).val(jQuery('#searchform label.current').attr('title')).removeClass('focused'); });
    jQuery('#searchfield').keypress(function(e){ if (e.which == 13) jQuery(this).parent('form').submit(); });
    
    /* navigation: Dropdown menus */
    jQuery('.dropdown').click(function(){ jQuery(this).children('ul').toggleClass('hidden');});
    jQuery('.dropdown').mouseleave(function(){ jQuery(this).children('ul').addClass('hidden') });
    
});