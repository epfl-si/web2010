web2010
=======

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
