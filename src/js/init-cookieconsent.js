window.addEventListener("load", function() {

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
        'l\'utilisation de cookies pour améliorer votre expérience ' +
        'utilisateur et réaliser des statistiques de visites.',
      link: 'Lire les mentions légales',
      href: '//mediacom.epfl.ch/mentions-legales'
    }
  };

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
      "domain": "epfl.ch"
    }
  });
});
