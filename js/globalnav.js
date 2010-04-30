/*
 * EPFL navigation
 *
 * Copyright (c) 2010 EPFL
 *
 * Date: 2010-04-29 18:07
 * Revision: 1
 */
$(document).ready(function(){
    var opened_panel = null;
    
    function toggle_panel(panel){
        if (panel == opened_panel){ 
            opened_panel.hide();
            opened_panel = null;
            return;
        }
        if (opened_panel != null) opened_panel.hide();   
        panel.show()
        opened_panel = panel;
    }
    $('#main_menus .menu').mouseleave(function(){ opened_panel.hide(); opened_panel=null; });
        
    $('#public_menu_link').mouseenter(function(){ toggle_panel($('#public_panel')); });
    $('#school_menu_link').mouseenter(function(){ toggle_panel($('#school_panel')); });
    $('#brief_menu_link').mouseenter(function(){ toggle_panel($('#brief_panel')); });
          
});