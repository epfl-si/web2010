web2010
=======

Old web graphical charter non-responsive still used (sometimes partially) by several applications or web sites at EPFL. 

Description
-----------

This EPFL project contains:
* EPFL global header (non responsive website)
* templates html
* css files (non responsive)
* js files
* EPFL logos
* NGINX config

Setup
-----

You need to have Node.js, then:

```bash
$ npm install
```

You can now build this :factory:.

Update global header
--------------------

Edit the following files:
* templates/fragments/header.fr.html
* templates/fragments/header.en.html
* templates/fragments/header-no-local-search.fr.html
* templates/fragments/header-no-local-search.en.html
* navigate.fr.shtml
* navigate.en.shtml

Change "headerversion" + "headerdate":
* trunk/templates/fragments/header.sig.html

Commit the changes.

Change in JavaScript or CSS
---------------------------

Original files need to be in the `src` folder.


Build / Run
-----------

```bash
$ make up
```

Test
----

Test to download fragments:
```bash
wget -P <dest> -N -nd -r -l 1 http://localhost:8080/templates/fragments/download-me.html
```

Tagging
-------

Check the changes since the last release and update `CHANGELOG.md` accordingly.
Bump the new version and date in `templates/fragments/header.sig.html` and `package.json`.

Then

```bash
git tag -a v<version> -m "Version <version>"
git push --tags
```

Deploy
------

You need to have access to wwp-test and wwp OpenShift namespaces, and be logged in to OpenShift.

Clone [wp-ops](https://github.com/epfl-si/wp-ops) repository and deploy web2010:

`./ansible/wpsible --tags "web2010" --prod`  
`./ansible/wpsible --tags "web2010.rebuild"`  
`./ansible/wpsible --tags "web2010.image.promote" --prod`  

Routing url
-----------

The routing of urls trough 'www.epfl.ch' between WordPress and web2010 is operated by Varnish (see Varnish config) since 15th of September 2022.  
Here are the white list of urls forwarded to web2010:
* `^/accessibility`
* `^/images/`
* `^/cgi-bin/csoldap`
* `^/css/`
* `^/errors/`
* `^/javascript-help`
* `^/img/`
* `^/js/`
* `^/navigate`
* `^/templates`

Test web2010 urls:
`python test_web2010_urls.py`
