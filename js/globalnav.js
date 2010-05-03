/*
 * EPFL navigation
 *
 * Copyright (c) 2010 EPFL
 *
 * Date: 2010-04-29 18:07
 * Revision: 1
 */
$(document).ready(function(){
    /* Navigation: big panels */
    var opened_panel = null;
    function hide_panel(){
        opened_panel.hide(); 
        opened_panel = null;
    }
    function show_panel(panel){
        if (opened_panel != null) opened_panel.hide();   
        panel.show();
        opened_panel = panel;
    }
    $('#main_menus .menu').mouseleave(function(){ hide_panel(); });
    $('#public_menu_link').mouseenter(function(){ show_panel($('#public_panel')); });
    $('#school_menu_link').mouseenter(function(){ show_panel($('#school_panel')); });
    $('#brief_menu_link').mouseenter(function(){ show_panel($('#brief_panel')); });
    
    /* Navigation: search boxes */
    var opened_searchbox = null;
    function toggle_searchbox(searchbox){
        if (opened_searchbox != null){
            opened_searchbox.hide();
            opened_searchbox.siblings('a').toggleClass('current');
        }
        searchbox.show();
        searchbox.siblings('a').toggleClass('current');
        opened_searchbox = searchbox;
    }
    $('#search_person').mouseenter(function(){ toggle_searchbox($('#search_person_form')); });
    $('#search_place').mouseenter(function(){ toggle_searchbox($('#search_place_form')); });
    $('#search_epfl').mouseenter(function(){ toggle_searchbox($('#search_epfl_form')); });
    $('#search_local').mouseenter(function(){ toggle_searchbox($('#search_local_form')); });
    toggle_searchbox($('#search_person_form'));
    
    /* Texts input in header (search fields) */
    $('#header').find('input[title]').each(function() {
        if ($(this).val() === '') $(this).val($(this).attr('title'));
        $(this).focus(function() {
            if ($(this).val() === $(this).attr('title')) $(this).val('').addClass('focused');
        });
        $(this).blur(function() {
            if ($(this).val() === '')  $(this).val($(this).attr('title')).removeClass('focused');
        });
        $(this).keypress(function(e){
            if (e.which == 13) $(this).parent('form').submit();
        });
    });
    /*
    $('.dropdown').each(function(){
        $(this).click(function(){ 
            alert('tata');
        });
    });*/
    $('.dropdown').click(function(){
        $(this).siblings('ul').show();
    });

});