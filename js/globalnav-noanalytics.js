function getPeopleAutocomplete(){"use strict";var a=jQuery("#searchfield");a.autocomplete({source:function(a,b){jQuery.ajax({url:"https://search.epfl.ch/json/autocompletename.action",dataType:"jsonp",data:{maxRows:15,term:a.term},success:function(a){b(jQuery.map(a.result,function(a){return{label:a.name+", "+a.firstname,value:a.firstname+" "+a.name}}))}})},appendTo:jQuery("#searchform"),disabled:!1,minLength:3,select:function(b,c){c.item&&a.val(c.item.value),jQuery("#searchform").submit()}})}function showPanel(){jQuery("#header").expose({color:"#000",opacity:.6,loadSpeed:0,closeSpeed:0}),jQuery(".navigation-panel").addClass("hidden"),jQuery(this).children(".navigation-panel").removeClass("hidden")}function hidePanel(){}function removeLastWord(a){var b=a.html(),c=b.lastIndexOf(" ");return a.html(b.substring(0,c)+"..."),-1!==c}function isTotallyVisible(a,b){return b.position().top+b.outerHeight()+2<a.position().top+a.innerHeight()}function change_search_base(a){jQuery("#search-options").remove(),jQuery("#searchform input[type=radio]").removeAttr("checked");var b=a.attr("id"),c=jQuery("label[for="+b+"]");switch(jQuery("#searchfield").autocomplete({disabled:!0}),b){case"search-engine-person":getPeopleAutocomplete();break;case"search-engine-local":jQuery("#searchform").append(jQuery("<input/>").attr("type","hidden").attr("id","search-options").attr("name","as_sitesearch").attr("value",jQuery.url.attr("host")))}jQuery("#searchfield").val()===jQuery("#searchform label.current").attr("title")&&jQuery("#searchfield").val(""),""===jQuery("#searchfield").val()&&jQuery("#searchfield").val(c.attr("title")),current_search_base.toggleClass("current"),current_search_base=c,current_search_base.toggleClass("current"),a.attr("checked","checked"),a.blur(),-1!==document.referrer.indexOf("#")&&a.focus()}function injectCookieConsentCss(){var a=document.createElement("link");a.href="https://www.epfl.ch/css/epfl-cookie-consent.css",a.type="text/css",a.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(a)}var current_search_base=null;jQuery.fn.exists=function(){return this.length>0},jQuery(document).ready(function(a){"use strict";var b=function(b){a(".navigation-panel").addClass("hidden"),a(b).removeClass("hidden"),a("#header2013").expose({color:"#000",opacity:.6,loadSpeed:0,closeSpeed:0})},c=function(){a(".navigation-panel").addClass("hidden"),a.mask.close()};if(a("#header").exists()){a("#header").mouseleave(function(){a.mask.close(),a(".navigation-panel").addClass("hidden")});var d={over:showPanel,out:hidePanel,timeout:500};a("#header .menu").hoverIntent(d),a("#header .main-link").click(function(){return!1}),a("#header").mouseleave(c),a("#searchform").submit(function(){a("#searchfield").val()===a("#searchform label.current").attr("title")&&a("#searchfield").val("")}),current_search_base=a("#header #searchform label.current"),change_search_base(a("#header #search-engine-person")),a("#search-box input[type=radio]").change(function(){change_search_base(a(this))}),a("#searchfield").focus(function(){a(this).val()===current_search_base.attr("title")&&a(this).val("").addClass("focused")}),a.browser.msie&&a("#search-box input[type=radio]").click(function(){change_search_base(a(this)),this.blur(),this.focus()}),(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i))&&a("#search-box label").click(function(){var b=a(this).attr("for");change_search_base(a("#"+b))})}else{a("#header2013 #nav-menus .menu").click(function(){var d=a(".navigation-panel",this);return d.hasClass("hidden")?b(d):c(),!1}),a("#header2013 .navigation-panel").click(function(a){a.stopPropagation()}),a(document).keyup(function(a){27===a.keyCode&&c()}),a("html").click(c),a("#header2013 .selected-field").click(function(){a(this).siblings("ul").toggleClass("hidden")}),a("#header2013 .search-filter").mouseleave(function(){a(this).children("ul").addClass("hidden")}),a('#header2013  #nav-search input[type="radio"]').click(function(){a(this).parent().parent().addClass("hidden")});var e=function(){a("#header2013 #header_searchfield").autocomplete({source:function(b,c){a.ajax({url:"https://search.epfl.ch/json/autocompletename.action",dataType:"jsonp",data:{maxRows:15,term:b.term},success:function(b){c(a.map(b.result,function(a){return{label:a.name+", "+a.firstname,value:a.firstname+" "+a.name}}))}})},appendTo:a("#header_searchform"),disabled:!1,minLength:3,select:function(b,c){c.item&&a(this).val(c.item.value),a("#header2013 #header_searchform").submit()}})},f=function(){a("#header2013 #header_searchfield").autocomplete({disabled:!0})};a('#header2013 input[type="radio"]').change(function(){var b=a("label[for="+a(this).attr("id")+"]");a("#search-box .selected-field").text(b.text()),a(this).is("#search-engine-person")?e():f()}),e(),a("#header2013 #search-engine-local").change(function(){a("#header_local_site").attr("value",jQuery.url.attr("host"))})}a("#searchfield").blur(function(){""===a(this).val()&&a(this).val(a("#searchform label.current").attr("title")).removeClass("focused")}),a("#searchfield").keypress(function(b){13===b.which&&a(this).parent("form").submit()}),a("#searchlink").click(function(){a("#searchfield").focus()}),a(".dropdown").click(function(){a(this).children("ul").toggleClass("hidden")}),a(".dropdown").mouseleave(function(){a(this).children("ul").addClass("hidden")}),a("#main-navigation .dropdown").hoverIntent(function(){a(this).children("ul").removeClass("hidden")},function(){a(this).children("ul").addClass("hidden")}),a("#main-navigation .dropdown").click(function(){return!0}),a(".tree li.inpath").addClass("open"),a(".tree").treeview({collapsed:!0,unique:!1}),a(".tree").children().addClass("local-color"),a(".tree li a").hover(function(b){b.stopPropagation(),a(".tree li").removeClass("hover"),a(this).parent().addClass("hover")},function(b){b.stopPropagation(),a(this).parent().removeClass("hover")}),a(".toggler").click(function(){return a(this).toggleClass("toggled-active").next().slideToggle("slow"),!1}),a(".modal-opener[rel]").overlay({mask:{color:"#000",opacity:.6,loadSpeed:200},closeOnClick:!1}),a(".box.two-cols div.box-col:even",this).addClass("box-left-col"),a(".box.two-cols div.box-col:odd",this).addClass("box-right-col"),a("#content:not(.fullpage-content) .box:odd",this).addClass("last-col"),a("img[align]").each(function(){a(this).addClass(a(this).attr("align"))}),a("img[rel]").overlay(),a("div.news-text").each(function(b,c){c=a(c);var d=c.find("p span.heading"),e=c.find("p span.read-more");if(d.length&&e.length)for(;!isTotallyVisible(c,e)&&removeLastWord(d););}),a("#main-content ul").each(function(){var b=a(this);0===b.children().length&&b.remove()})}),function(a){if(!a.hasInitialised){var b={escapeRegExp:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},hasClass:function(a,b){var c=" ";return 1===a.nodeType&&(c+a.className+c).replace(/[\n\t]/g,c).indexOf(c+b+c)>=0},addClass:function(a,b){a.className+=" "+b},removeClass:function(a,b){var c=new RegExp("\\b"+this.escapeRegExp(b)+"\\b");a.className=a.className.replace(c,"")},interpolateString:function(a,b){return a.replace(/{{([a-z][a-z0-9\-_]*)}}/gi,function(a){return b(arguments[1])||""})},getCookie:function(a){var b="; "+document.cookie,c=b.split("; "+a+"=");return 2!=c.length?void 0:c.pop().split(";").shift()},setCookie:function(a,b,c,d,e){var f=new Date;f.setDate(f.getDate()+(c||365));var g=[a+"="+b,"expires="+f.toUTCString(),"path="+(e||"/")];d&&g.push("domain="+d),document.cookie=g.join(";")},deepExtend:function(a,b){for(var c in b)b.hasOwnProperty(c)&&(c in a&&this.isPlainObject(a[c])&&this.isPlainObject(b[c])?this.deepExtend(a[c],b[c]):a[c]=b[c]);return a},throttle:function(a,b){var c=!1;return function(){c||(a.apply(this,arguments),c=!0,setTimeout(function(){c=!1},b))}},hash:function(a){var b,c,d,e=0;if(0===a.length)return e;for(b=0,d=a.length;b<d;++b)c=a.charCodeAt(b),e=(e<<5)-e+c,e|=0;return e},normaliseHex:function(a){return"#"==a[0]&&(a=a.substr(1)),3==a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),a},getContrast:function(a){return a=this.normaliseHex(a),(299*parseInt(a.substr(0,2),16)+587*parseInt(a.substr(2,2),16)+114*parseInt(a.substr(4,2),16))/1e3>=128?"#000":"#fff"},getLuminance:function(a){var b=parseInt(this.normaliseHex(a),16),c=38+(b>>16),d=38+(b>>8&255),e=38+(255&b);return"#"+(16777216+65536*(c<255?c<1?0:c:255)+256*(d<255?d<1?0:d:255)+(e<255?e<1?0:e:255)).toString(16).slice(1)},isMobile:function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isPlainObject:function(a){return"object"==typeof a&&null!==a&&a.constructor==Object}};a.status={deny:"deny",allow:"allow",dismiss:"dismiss"},a.transitionEnd=function(){var a=document.createElement("div"),b={t:"transitionend",OT:"oTransitionEnd",msT:"MSTransitionEnd",MozT:"transitionend",WebkitT:"webkitTransitionEnd"};for(var c in b)if(b.hasOwnProperty(c)&&void 0!==a.style[c+"ransition"])return b[c];return""}(),a.hasTransition=!!a.transitionEnd;var c=Object.keys(a.status).map(b.escapeRegExp);a.customStyles={},a.Popup=function(){function d(){this.initialise.apply(this,arguments)}function e(a){this.openingTimeout=null,b.removeClass(a,"cc-invisible")}function f(b){b.style.display="none",b.removeEventListener(a.transitionEnd,this.afterTransition),this.afterTransition=null}function g(){var b=this.options.onInitialise.bind(this);if(!window.navigator.cookieEnabled)return b(a.status.deny),!0;if(window.CookiesOK||window.navigator.CookiesOK)return b(a.status.allow),!0;var c=Object.keys(a.status),d=this.getStatus(),e=c.indexOf(d)>=0;return e&&b(d),e}function h(){var a=this.options.position.split("-"),b=[];return a.forEach(function(a){b.push("cc-"+a)}),b}function i(){var a=this.options,c="top"==a.position||"bottom"==a.position?"banner":"floating";b.isMobile()&&(c="floating");var d=["cc-"+c,"cc-type-"+a.type,"cc-theme-"+a.theme];return a.static&&d.push("cc-static"),d.push.apply(d,h.call(this)),m.call(this,this.options.palette),this.customStyleSelector&&d.push(this.customStyleSelector),d}function j(){var a={},c=this.options;c.showLink||(c.elements.link="",c.elements.messagelink=c.elements.message),Object.keys(c.elements).forEach(function(d){a[d]=b.interpolateString(c.elements[d],function(a){var b=c.content[a];return a&&"string"==typeof b&&b.length?b:""})});var d=c.compliance[c.type];d||(d=c.compliance.info),a.compliance=b.interpolateString(d,function(b){return a[b]});var e=c.layouts[c.layout];return e||(e=c.layouts.basic),b.interpolateString(e,function(b){return a[b]})}function k(c){var d=this.options,e=document.createElement("div"),f=d.container&&1===d.container.nodeType?d.container:document.body;e.innerHTML=c;var g=e.children[0];return g.style.display="none",b.hasClass(g,"cc-window")&&a.hasTransition&&b.addClass(g,"cc-invisible"),this.onButtonClick=l.bind(this),g.addEventListener("click",this.onButtonClick),d.autoAttach&&(f.firstChild?f.insertBefore(g,f.firstChild):f.appendChild(g)),g}function l(d){var e=d.target;if(b.hasClass(e,"cc-btn")){var f=e.className.match(new RegExp("\\bcc-("+c.join("|")+")\\b")),g=f&&f[1]||!1;g&&(this.setStatus(g),this.close(!0))}b.hasClass(e,"cc-close")&&(this.setStatus(a.status.dismiss),this.close(!0)),b.hasClass(e,"cc-revoke")&&this.revokeChoice()}function m(a){var c=b.hash(JSON.stringify(a)),d="cc-color-override-"+c,e=b.isPlainObject(a);return this.customStyleSelector=e?d:null,e&&n(c,a,"."+d),e}function n(c,d,e){if(a.customStyles[c])return void++a.customStyles[c].references;var f={},g=d.popup,h=d.button,i=d.highlight;g&&(g.text=g.text?g.text:b.getContrast(g.background),g.link=g.link?g.link:g.text,f[e+".cc-window"]=["color: "+g.text,"background-color: "+g.background],f[e+".cc-revoke"]=["color: "+g.text,"background-color: "+g.background],f[e+" .cc-link,"+e+" .cc-link:active,"+e+" .cc-link:visited"]=["color: "+g.link],h&&(h.text=h.text?h.text:b.getContrast(h.background),h.border=h.border?h.border:"transparent",f[e+" .cc-btn"]=["color: "+h.text,"border-color: "+h.border,"background-color: "+h.background],"transparent"!=h.background&&(f[e+" .cc-btn:hover, "+e+" .cc-btn:focus"]=["background-color: "+o(h.background)]),i?(i.text=i.text?i.text:b.getContrast(i.background),i.border=i.border?i.border:"transparent",f[e+" .cc-highlight .cc-btn:first-child"]=["color: "+i.text,"border-color: "+i.border,"background-color: "+i.background]):f[e+" .cc-highlight .cc-btn:first-child"]=["color: "+g.text]));var j=document.createElement("style");document.head.appendChild(j),a.customStyles[c]={references:1,element:j.sheet};var k=-1;for(var l in f)f.hasOwnProperty(l)&&j.sheet.insertRule(l+"{"+f[l].join(";")+"}",++k)}function o(a){return a=b.normaliseHex(a),"000000"==a?"#222":b.getLuminance(a)}function p(c){if(b.isPlainObject(c)){var d=b.hash(JSON.stringify(c)),e=a.customStyles[d];if(e&&!--e.references){var f=e.element.ownerNode;f&&f.parentNode&&f.parentNode.removeChild(f),a.customStyles[d]=null}}}function q(a,b){for(var c=0,d=a.length;c<d;++c){var e=a[c];if(e instanceof RegExp&&e.test(b)||"string"==typeof e&&e.length&&e===b)return!0}return!1}function r(){var b=this.setStatus.bind(this),c=this.options.dismissOnTimeout;"number"==typeof c&&c>=0&&(this.dismissTimeout=window.setTimeout(function(){b(a.status.dismiss)},Math.floor(c)));var d=this.options.dismissOnScroll;if("number"==typeof d&&d>=0){var e=function(c){window.pageYOffset>Math.floor(d)&&(b(a.status.dismiss),window.removeEventListener("scroll",e),this.onWindowScroll=null)};this.onWindowScroll=e,window.addEventListener("scroll",e)}}function s(){if("info"!=this.options.type&&(this.options.revokable=!0),b.isMobile()&&(this.options.animateRevokable=!1),this.options.revokable){var a=h.call(this);this.options.animateRevokable&&a.push("cc-animate"),this.customStyleSelector&&a.push(this.customStyleSelector);var c=this.options.revokeBtn.replace("{{classes}}",a.join(" "));this.revokeBtn=k.call(this,c);var d=this.revokeBtn;if(this.options.animateRevokable){var e=b.throttle(function(a){var c=!1,e=window.innerHeight-20;b.hasClass(d,"cc-top")&&a.clientY<20&&(c=!0),b.hasClass(d,"cc-bottom")&&a.clientY>e&&(c=!0),c?b.hasClass(d,"cc-active")||b.addClass(d,"cc-active"):b.hasClass(d,"cc-active")&&b.removeClass(d,"cc-active")},200);this.onMouseMove=e,window.addEventListener("mousemove",e)}}}var t={enabled:!0,container:null,cookie:{name:"cookieconsent_status",path:"/",domain:"",expiryDays:365},onPopupOpen:function(){},onPopupClose:function(){},onInitialise:function(a){},onStatusChange:function(a,b){},onRevokeChoice:function(){},content:{header:"Cookies used on the website!",message:"This website uses cookies to ensure you get the best experience on our website.",dismiss:"Got it!",allow:"Allow cookies",deny:"Decline",link:"Learn more",href:"http://cookiesandyou.com",close:"&#x274c;"},elements:{header:'<span class="cc-header">{{header}}</span>&nbsp;',message:'<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',messagelink:'<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',dismiss:'<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',allow:'<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',deny:'<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',link:'<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',close:'<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>'},window:'<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',revokeBtn:'<div class="cc-revoke {{classes}}">Cookie Policy</div>',compliance:{info:'<div class="cc-compliance">{{dismiss}}</div>',"opt-in":'<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',"opt-out":'<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>'},type:"info",layouts:{basic:"{{messagelink}}{{compliance}}","basic-close":"{{messagelink}}{{compliance}}{{close}}","basic-header":"{{header}}{{message}}{{link}}{{compliance}}"},layout:"basic",position:"bottom",theme:"block",static:!1,palette:null,revokable:!1,animateRevokable:!0,showLink:!0,dismissOnScroll:!1,dismissOnTimeout:!1,autoOpen:!0,autoAttach:!0,whitelistPage:[],blacklistPage:[],overrideHTML:null};return d.prototype.initialise=function(a){this.options&&this.destroy(),b.deepExtend(this.options={},t),b.isPlainObject(a)&&b.deepExtend(this.options,a),g.call(this)&&(this.options.enabled=!1),q(this.options.blacklistPage,location.pathname)&&(this.options.enabled=!1),q(this.options.whitelistPage,location.pathname)&&(this.options.enabled=!0);var c=this.options.window.replace("{{classes}}",i.call(this).join(" ")).replace("{{children}}",j.call(this)),d=this.options.overrideHTML;if("string"==typeof d&&d.length&&(c=d),this.options.static){var e=k.call(this,'<div class="cc-grower">'+c+"</div>");e.style.display="",this.element=e.firstChild,this.element.style.display="none",b.addClass(this.element,"cc-invisible")}else this.element=k.call(this,c);r.call(this),s.call(this),this.options.autoOpen&&this.autoOpen()},d.prototype.destroy=function(){this.onButtonClick&&this.element&&(this.element.removeEventListener("click",this.onButtonClick),this.onButtonClick=null),this.dismissTimeout&&(clearTimeout(this.dismissTimeout),this.dismissTimeout=null),this.onWindowScroll&&(window.removeEventListener("scroll",this.onWindowScroll),this.onWindowScroll=null),this.onMouseMove&&(window.removeEventListener("mousemove",this.onMouseMove),this.onMouseMove=null),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null,this.revokeBtn&&this.revokeBtn.parentNode&&this.revokeBtn.parentNode.removeChild(this.revokeBtn),this.revokeBtn=null,p(this.options.palette),this.options=null},d.prototype.open=function(b){if(this.element)return this.isOpen()||(a.hasTransition?this.fadeIn():this.element.style.display="",this.options.revokable&&this.toggleRevokeButton(),this.options.onPopupOpen.call(this)),this},d.prototype.close=function(b){if(this.element)return this.isOpen()&&(a.hasTransition?this.fadeOut():this.element.style.display="none",b&&this.options.revokable&&this.toggleRevokeButton(!0),this.options.onPopupClose.call(this)),this},d.prototype.fadeIn=function(){var c=this.element;if(a.hasTransition&&c&&(this.afterTransition&&f.call(this,c),b.hasClass(c,"cc-invisible"))){if(c.style.display="",this.options.static){var d=this.element.clientHeight;this.element.parentNode.style.maxHeight=d+"px"}this.openingTimeout=setTimeout(e.bind(this,c),20)}},d.prototype.fadeOut=function(){var c=this.element;a.hasTransition&&c&&(this.openingTimeout&&(clearTimeout(this.openingTimeout),e.bind(this,c)),b.hasClass(c,"cc-invisible")||(this.options.static&&(this.element.parentNode.style.maxHeight=""),this.afterTransition=f.bind(this,c),c.addEventListener(a.transitionEnd,this.afterTransition),b.addClass(c,"cc-invisible")))},d.prototype.isOpen=function(){return this.element&&""==this.element.style.display&&(!a.hasTransition||!b.hasClass(this.element,"cc-invisible"))},d.prototype.toggleRevokeButton=function(a){this.revokeBtn&&(this.revokeBtn.style.display=a?"":"none")},d.prototype.revokeChoice=function(a){this.options.enabled=!0,this.clearStatus(),this.options.onRevokeChoice.call(this),a||this.autoOpen()},d.prototype.hasAnswered=function(b){return Object.keys(a.status).indexOf(this.getStatus())>=0},d.prototype.hasConsented=function(b){var c=this.getStatus();return c==a.status.allow||c==a.status.dismiss},d.prototype.autoOpen=function(a){!this.hasAnswered()&&this.options.enabled&&this.open()},d.prototype.setStatus=function(c){var d=this.options.cookie,e=b.getCookie(d.name),f=Object.keys(a.status).indexOf(e)>=0;Object.keys(a.status).indexOf(c)>=0?(b.setCookie(d.name,c,d.expiryDays,d.domain,d.path),this.options.onStatusChange.call(this,c,f)):this.clearStatus()},d.prototype.getStatus=function(){return b.getCookie(this.options.cookie.name)},d.prototype.clearStatus=function(){var a=this.options.cookie;b.setCookie(a.name,"",-1,a.domain,a.path)},d}(),a.Location=function(){function a(a){b.deepExtend(this.options={},f),b.isPlainObject(a)&&b.deepExtend(this.options,a),this.currentServiceIndex=-1}function c(a,b,c){var d,e=document.createElement("script");e.type="text/"+(a.type||"javascript"),e.src=a.src||a,e.async=!1,e.onreadystatechange=e.onload=function(){var a=e.readyState;clearTimeout(d),b.done||a&&!/loaded|complete/.test(a)||(b.done=!0,b(),e.onreadystatechange=e.onload=null)},document.body.appendChild(e),d=setTimeout(function(){b.done=!0,b(),e.onreadystatechange=e.onload=null},c)}function d(a,b,c,d,e){var f=new(window.XMLHttpRequest||window.ActiveXObject)("MSXML2.XMLHTTP.3.0");if(f.open(d?"POST":"GET",a,1),f.setRequestHeader("X-Requested-With","XMLHttpRequest"),f.setRequestHeader("Content-type","application/x-www-form-urlencoded"),Array.isArray(e))for(var g=0,h=e.length;g<h;++g){var i=e[g].split(":",2);f.setRequestHeader(i[0].replace(/^\s+|\s+$/g,""),i[1].replace(/^\s+|\s+$/g,""))}"function"==typeof b&&(f.onreadystatechange=function(){f.readyState>3&&b(f)}),f.send(d)}function e(a){return new Error("Error ["+(a.code||"UNKNOWN")+"]: "+a.error)}var f={timeout:5e3,services:["freegeoip","ipinfo","maxmind"],serviceDefinitions:{freegeoip:function(){return{url:"//freegeoip.net/json/?callback={callback}",isScript:!0,callback:function(a,b){try{var c=JSON.parse(b);return c.error?e(c):{code:c.country_code}}catch(a){return e({error:"Invalid response ("+a+")"})}}}},ipinfo:function(){return{url:"//ipinfo.io",headers:["Accept: application/json"],callback:function(a,b){try{var c=JSON.parse(b);return c.error?e(c):{code:c.country}}catch(a){return e({error:"Invalid response ("+a+")"})}}}},ipinfodb:function(a){return{url:"//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",isScript:!0,callback:function(a,b){try{var c=JSON.parse(b);return"ERROR"==c.statusCode?e({error:c.statusMessage}):{code:c.countryCode}}catch(a){return e({error:"Invalid response ("+a+")"})}}}},maxmind:function(){return{url:"//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",isScript:!0,callback:function(a){return window.geoip2?void geoip2.country(function(b){try{a({code:b.country.iso_code})}catch(b){a(e(b))}},function(b){a(e(b))}):void a(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"))}}}}};return a.prototype.getNextService=function(){var a;do{a=this.getServiceByIdx(++this.currentServiceIndex)}while(this.currentServiceIndex<this.options.services.length&&!a);return a},a.prototype.getServiceByIdx=function(a){var c=this.options.services[a];if("function"==typeof c){var d=c();return d.name&&b.deepExtend(d,this.options.serviceDefinitions[d.name](d)),d}return"string"==typeof c?this.options.serviceDefinitions[c]():b.isPlainObject(c)?this.options.serviceDefinitions[c.name](c):null},a.prototype.locate=function(a,b){var c=this.getNextService();return c?(this.callbackComplete=a,this.callbackError=b,void this.runService(c,this.runNextServiceOnError.bind(this))):void b(new Error("No services to run"))},a.prototype.setupUrl=function(a){var b=this.getCurrentServiceOpts();return a.url.replace(/\{(.*?)\}/g,function(c,d){if("callback"===d){var e="callback"+Date.now();return window[e]=function(b){a.__JSONP_DATA=JSON.stringify(b)},e}if(d in b.interpolateUrl)return b.interpolateUrl[d]})},a.prototype.runService=function(a,b){var e=this;if(a&&a.url&&a.callback){(a.isScript?c:d)(this.setupUrl(a),function(c){var d=c?c.responseText:"";a.__JSONP_DATA&&(d=a.__JSONP_DATA,delete a.__JSONP_DATA),e.runServiceCallback.call(e,b,a,d)},this.options.timeout,a.data,a.headers)}},a.prototype.runServiceCallback=function(a,b,c){var d=this,e=function(b){f||d.onServiceResult.call(d,a,b)},f=b.callback(e,c);f&&this.onServiceResult.call(this,a,f)},a.prototype.onServiceResult=function(a,b){b instanceof Error||b&&b.error?a.call(this,b,null):a.call(this,null,b)},a.prototype.runNextServiceOnError=function(a,b){if(a){this.logError(a);var c=this.getNextService();c?this.runService(c,this.runNextServiceOnError.bind(this)):this.completeService.call(this,this.callbackError,new Error("All services failed"))}else this.completeService.call(this,this.callbackComplete,b)},a.prototype.getCurrentServiceOpts=function(){var a=this.options.services[this.currentServiceIndex];return"string"==typeof a?{name:a}:"function"==typeof a?a():b.isPlainObject(a)?a:{}},a.prototype.completeService=function(a,b){this.currentServiceIndex=-1,a&&a(b)},a.prototype.logError=function(a){var b=this.currentServiceIndex;this.getServiceByIdx(b)},a}(),a.Law=function(){function a(a){this.initialise.apply(this,arguments)}var c={regionalLaw:!0,hasLaw:["AT","BE","BG","HR","CZ","CY","DK","EE","FI","FR","DE","EL","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","SK","SI","ES","SE","GB","UK"],revokable:["HR","CY","DK","EE","FR","DE","LV","LT","NL","PT","ES"],explicitAction:["HR","IT","ES"]};return a.prototype.initialise=function(a){b.deepExtend(this.options={},c),b.isPlainObject(a)&&b.deepExtend(this.options,a)},a.prototype.get=function(a){var b=this.options;return{hasLaw:b.hasLaw.indexOf(a)>=0,revokable:b.revokable.indexOf(a)>=0,explicitAction:b.explicitAction.indexOf(a)>=0}},a.prototype.applyLaw=function(a,b){var c=this.get(b);return c.hasLaw||(a.enabled=!1),this.options.regionalLaw&&(c.revokable&&(a.revokable=!0),c.explicitAction&&(a.dismissOnScroll=!1,a.dismissOnTimeout=!1)),a},a}(),a.initialise=function(b,c,d){var e=new a.Law(b.law);c||(c=function(){}),d||(d=function(){}),a.getCountryCode(b,function(d){delete b.law,delete b.location,d.code&&(b=e.applyLaw(b,d.code)),c(new a.Popup(b))},function(c){delete b.law,delete b.location,d(c,new a.Popup(b))})},a.getCountryCode=function(b,c,d){if(b.law&&b.law.countryCode)return void c({code:b.law.countryCode});if(b.location){return void new a.Location(b.location).locate(function(a){c(a||{})},d)}c({})},a.utils=b,a.hasInitialised=!0,window.cookieconsent=a}}(window.cookieconsent||{}),window.addEventListener("load",function(){injectCookieConsentCss();var a=document.documentElement.lang||"fr",b={en:{msg:"By continuing your browsing on this site, you agree to the use of cookies to improve your user experience and to make statistics of visits.",link:"Read the legal notice",href:"//mediacom.epfl.ch/disclaimer"},fr:{msg:"En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies pour am&eacute;liorer votre exp&eacute;rience utilisateur et r&eacute;aliser des statistiques de visites.",link:"Lire les mentions l&eacute;gales",href:"//mediacom.epfl.ch/mentions-legales"}},c="epfl.ch",d=window.location.hostname;if("localhost"===d||"127.0.0.1"===d)c=d;else{var e=d.split(".").reverse();void 0!==e[0]&&void 0!==e[1]&&(c=e[1]+"."+e[0])}window.cookieconsent.initialise({palette:{popup:{background:"rgba(69, 69, 69, 0.96)"},button:{background:"#e2001a"}},content:{message:b[a].msg,dismiss:"OK",link:b[a].link,href:b[a].href},cookie:{name:"petitpois",domain:c}})});