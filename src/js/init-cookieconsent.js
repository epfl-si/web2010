/*
 * (c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
 * Switzerland, VPSI, 2017.
 */

window.addEventListener("load", function() {

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

  // Retrieve language, default 'fr'
  var langAttribute = document.documentElement.lang;
  var lang = langAttribute.substring(0, 2);
  if (! cookieI18n[lang]) {
    lang = 'fr';
  }

  // Retrieve the domain
  // Don't work with google.co.uk for example
  var domain = 'epfl.ch';
  var hostame = window.location.hostname;
  if ( hostame === 'localhost' || hostame === '127.0.0.1') {
    domain = hostame;
  } else {
    var hostParts = hostame.split('.').reverse();
    if (hostParts[0] !== undefined && hostParts[1] !== undefined) {
        domain = hostParts[1] + '.' + hostParts[0];
    }
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
