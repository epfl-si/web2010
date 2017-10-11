web2010
=======

Description
-----------
This EPFL project contains:
  * EPFL global header (non responsive website)
  * templates html
  * css files (non responsive)
  * js files

Links
-----
  * http://atelierweb.epfl.ch/modeles-html-css
  * http://web2010.epfl.ch/

Setup
-----

You need to have Node.js, then:

```bash
$ npm install -g grunt bower
```

and

```bash
$ bower install
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
* navigation.fr.shtml
* navigation.en.shtml

Change "headerversion" + "headerdate":
* trunk/templates/fragments/header.sig.html

Commit the changes.

Change in JavaScript or CSS
---------------------------

Original files need to be in the `src` folder.
To maintain the retrocompatibility, commit the minified files.

To build:

```bash
$ grunt
```

Then commit the changes.

Test
----
Deploy on test server.

Modify /etc/hosts file to point www.epfl.ch on the test server:
```bash
<ip_test_server>     www.epfl.ch
```

Test to download fragments:
```bash
wget -P /home/obieler/workspace/actu/src/templates/header/ -N -nd -r -l 1 http://www.epfl.ch/templates/fragments/download-me.html
```

Tagging
-------

Check the changes since the last release and update the changelog accordingly.
Bump the new version and date in `templates/fragments/header.sig.html`.

Then

```bash
git tag -a v<version> -m "Version <version>"
git push --tags
```

Deploy
------
ssh on server:
```bash
cd /var/www/vhosts/www.epfl.ch/htdocs
git pull
```

Copyright
---------
(c) All rights reserved. ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
