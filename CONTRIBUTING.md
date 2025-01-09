Contributing
============

Prerequisites
-------------

* Be member of the EPFL group 'vra_p_svc0041'.
* Be member of the Keybase team 'epfl_web2010'.

Build / Run
-----------

```bash
make up
```

Test
----

Download fragments

```bash
wget -P <dest> -N -nd -r -l 1 http://localhost:8080/templates/fragments/download-me.html
```

GET ressources

```bash
python3 test_web2010_urls.py
```

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

Release
-------

Note: A milestone should have been prepared with the future version 'X.Y.Z', and all issues of the released assigned to this milestone.

1. Prepare the release on the project  
  1.1 Update the [CHANGELOG.md](CHANGELOG.md)  
  1.2 Bump the new version and date in `templates/fragments/header.sig.html` and `package.json`.

2. Create a change in ServiceNow

3. Create and push a new tag  
```bash
git tag -a v<version> -m "Version <version>"
git push --tags
```

Deploy
------

`./ansible/web2010sible` (`--prod` for production environment)

Start a new "cloud" build

`./ansible/web2010sible -t image.startbuild`

Restart the app

`./ansible/web2010sible -t app.restart`
