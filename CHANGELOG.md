Changelog
=========

### v3.6.0 / 2023-01-10

  - Add script to test web2010 urls (routing)
  - Simplify and update Dockerfile
  - Remove inaccessible files in image
  - Remove label.php
  - Improve README

### v3.5.0 / 2022-04-12

  - Containerize web2010 (with migration to NGINX instead of Apache)
    - Dockerfile
    - NGINX config
  - Remove Bower and don't install Grunt globally

### v3.4.0 / 2019-06-19

  - Clean redirect and config
  - Remove homepage related stuff

### v3.3.0 / 2019-03-18

  - Change EPFL logos
  - Keep cookieconsent to v3.0.4

### v3.2.1 / 2018-12-17

  - Fix redirect with /index.html

### v3.2.0 / 2018-08-28

  - Remove search filter
  - Remove search autocomplete
  - Fix links in header

### v3.1.1 / 2018-07-18

  - Add EPFL Middle East section
  - Update dev dependencies
  - Remove tools folder
  - Disable `package-lock.json`

### v3.1.0 / 2018-03-22

  - Add proxy pass for label.php

### v3.0.2 / 2018-03-15

  - Remove all proxy configs (apache)

### v3.0.1 / 2018-03-13

  - Gzip svg (apache config)

### v3.0.0 / 2018-01-09

  - Feature improve deployment
  - Set 5s cache on html
  - Add homepage_versions script
  - Remove email.php
  - Remove jpgraph (PHP)
  - Remove other old PHP scripts
  - Add removed logos in 04.2017 (still used today)
  - Replace epfl_small.png (color too dark in previous)

### v2.20 / 2017-11-22

  - Fix resolution of html lang attribute

### v2.19 / 2017-10-17

  - Set cookie (from Cookie Consent) on localhost and external domain
  - Remove protocols in header

### v2.18 / 2017-10-11

  - Add science and society link in header
  - Remove injection of CSS in Cookie Consent
  - Fix cookie consent background link
