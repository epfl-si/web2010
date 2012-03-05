jQuery(function($) {
    $.tools.dateinput.localize("fr", {
        months:      'Janvier,F&eacute;vrier,Mars,Avril,Mai,Juin,Juillet,Ao&ucirc;t,' +
                     'Septembre,Octobre,Novembre,D&eacute;cembre',
        shortMonths: 'jan,f&eacute;v,mar,avr,mai,jun,jul,ao&ucirc;,sep,oct,nov,d&eacute;c',
        days:        'dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi',
        shortDays:   'Di,Lu,Ma,Me,Je,Ve,Sa'
    });

    $.tools.dateinput.localize("en", {
        months: 'January,February,March,April,May,June,July,August,September,October,November,December',
        shortMonths:  'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
        days:         'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        shortDays:    'Su,Mo,Tu,We,Th,Fr,Sa'
    });

    $('<input type="text" />').dateinput({
        firstDay: 1,
        lang: jQuery('html').attr('lang'),
        onHide: function() { return false; },
        change: function() {
            window.location = 'http://memento.epfl.ch/epfl?date=' + this.getValue('yyyy-mm-dd');
        }                    
    }).data("dateinput").show();

    $('#calroot').detach().appendTo(jQuery('#calendar-nav')).css({
        position:'relative'
    });        
});

