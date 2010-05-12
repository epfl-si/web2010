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
        if( panel.is('.hidden') ){
            jQuery("#header").expose({color: '#000', opacity: 0.6, loadSpeed: 0, closeSpeed: 0});
        }
        else{
            jQuery.mask.close();
        }
        panel.toggleClass("hidden");
        
        
        //show curtain
    }
    jQuery('#main_menus .menu').each(function(){
        var panel = jQuery(this).children('.navigation_panel');
        jQuery(this).mouseleave(function() { panel.addClass("hidden"); jQuery.mask.close()});
        jQuery(this).click(function(){ togglePanel(panel); return true; });
        jQuery(this).children('.main-link').click(function(){ togglePanel(panel); return false; });
    });
    
    /* Navigation: search boxes */ 
    var current_search_base = jQuery('#search_form label.current');
    function change_search_base(label){
        switch (label.attr('for')){
            case "search_engine_person":
                jQuery('#search_form').attr('action', 'http://search.epfl.ch/compoundDirectory.do');
                jQuery('#search_field').attr('name', 'q');
                break;
            case "search_engine_place":
                jQuery('#search_form').attr('action', 'http://plan.epfl.ch/');
                jQuery('#search_field').attr('name', 'room');
                break;
            case "search_engine_epfl":
                jQuery('#search_form').attr('action', 'http://search.epfl.ch/web.do');
                jQuery('#search_field').attr('name', 'q');
                break;
            case "search_engine_local":
                jQuery('#search_form').attr('action', 'http://search.epfl.ch/web.do');
                jQuery('#search_field').attr('name', 'q');
                break;
        }
        if (jQuery('#search_field').val() === jQuery('#search_form label.current').attr('title')) jQuery('#search_field').val('');
        if (jQuery('#search_field').val() === '') jQuery('#search_field').val(label.attr('title'));
        current_search_base.toggleClass('current');
        current_search_base = label;
        current_search_base.toggleClass('current')
    }
    change_search_base(jQuery("#search-box label[for='search_engine_person']"));
    jQuery('#searchlink').click(function(){ jQuery('#search_field').focus();});
    jQuery('#search_form label').click(function(){ change_search_base(jQuery(this)); });
    jQuery('#search_field').focus(function(){
        if (jQuery(this).val() === current_search_base.attr('title')) jQuery(this).val('').addClass('focused');
    });
    jQuery('#search_field').blur(function() {
            if (jQuery(this).val() === '')  jQuery(this).val(jQuery('#search_form label.current').attr('title')).removeClass('focused');
    });
    jQuery('#search_field').keypress(function(e){
            if (e.which == 13) jQuery(this).parent('form').submit();
    });
        
    jQuery('.dropdown').click(function(){ jQuery(this).children('ul').toggle();});
    jQuery('.dropdown').mouseleave(function(){ jQuery(this).children('ul').hide() });
    
});