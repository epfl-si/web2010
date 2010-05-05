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
    function change_search_base(label){
        switch (label.attr('for')){
            case "search_engine_person":
                $('#search_form').attr('action', 'http://search.epfl.ch/compoundDirectory.do');
                $('#search_field').attr('name', 'q');
                break;
            case "search_engine_place":
                $('#search_form').attr('action', 'http://plan.epfl.ch/');
                $('#search_field').attr('name', 'room');
                break;
            case "search_engine_epfl":
                $('#search_form').attr('action', 'http://search.epfl.ch/web.do');
                $('#search_field').attr('name', 'q');
                break;
            case "search_engine_local":
                $('#search_form').attr('action', 'http://search.epfl.ch/web.do');
                $('#search_field').attr('name', 'q');
                break;
        }
        if ($('#search_field').val() === $('#search_form label.current').attr('title')) $('#search_field').val('');
        if ($('#search_field').val() === '') $('#search_field').val(label.attr('title'));
        $('#search_form label').removeClass('current')
        label.addClass('current')
    }
    
    $('#search_form label').click(function(){ change_search_base($(this)); });
    $('#search_field').focus(function(){
        if ($(this).val() === $('#search_form label.current').attr('title')) $(this).val('').addClass('focused');
        /*alert('here');*/
    });
    $('#search_field').focus(function() {
            if ($(this).val() === '')  $(this).val($('#search_form label.current').attr('title')).removeClass('focused');
    });
    $('#search_field').keypress(function(e){
            if (e.which == 13) $(this).parent('form').submit();
        });
        
    $('.dropdown').click(function(){ $(this).children('ul').toggle();});
    $('.dropdown').mouseleave(function(){ $(this).children('ul').hide() });

});