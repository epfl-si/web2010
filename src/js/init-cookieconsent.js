/*
 * (c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
 * Switzerland, VPSI, 2017.
 */

window.addEventListener("load", function() {

  // Ensure we have latest style
  injectCookieConsentCss();

  // Retrieve language, default 'fr'
  var lang = document.documentElement.lang || 'fr';

  // Translation
  var cookieI18n = {
    en: {
      msg: 'By continuing your browsing on this site, you agree to the use ' +
        'of cookies to improve your user experience and to make statistics ' +
        'of visits.',
      link: 'Read the legal notice',
      href: '//mediacom.epfl.ch/disclaimer'
    },
    fr: {
      msg: 'En poursuivant votre navigation sur ce site, vous acceptez ' +
        'l\'utilisation de cookies pour am&eacute;liorer votre ' +
        'exp&eacute;rience utilisateur et r&eacute;aliser des statistiques ' +
        'de visites.',
      link: 'Lire les mentions l&eacute;gales',
      href: '//mediacom.epfl.ch/mentions-legales'
    }
  };

  // To avoid being annoyed locally
  var domain = 'epfl.ch';
  var location = window.location.hostname;
  if ( location === 'localhost' || location === '127.0.0.1') {
    domain = location;
  }

  // Init cookieconsent
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "rgba(69, 69, 69, 0.96)"
      },
      "button": {
        "background": "#e2001a"
      }
    },
    "content": {
      "message": cookieI18n[lang].msg,
      "dismiss": "OK",
      "link": cookieI18n[lang].link,
      "href": cookieI18n[lang].href
    },
    "cookie": {
      "name": "petitpois", // Chosen by a magical unicorn!
      "domain": domain
    }
  });
});

/*
 * Reload epfl.css !
 * Delete this, 1 month after prod...
 */
function injectCookieConsentCss() {
  var link = document.createElement("link");
  link.href = "https://www.epfl.ch/css/epfl-cookie-consent.css";
  link.type = "text/css";
  link.rel = "stylesheet";

  var headTag = document.getElementsByTagName("head")[0];
  headTag.appendChild(link);
}
