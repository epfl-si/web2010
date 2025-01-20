import requests
import uuid

BASE_URL = 'http://localhost:8080'
# BASE_URL = 'https://www.epfl.ch'

paths = {
  '/accessibility.en.shtml': 200,
  '/accessibility.fr.shtml': 200,
  '/cssss': 404,
  '/css/print.css': 200,
  '/css/epfl.css': 200,
  '/images/epfl_logo.gif': 200,
  '/images/EPFL-logo.gif': 404,
  '/img/arrow-more.png': 200,
  '/javascript-help.en.shtml': 200,
  '/javascript-help.fr.shtml': 200,
  '/js/epfl-cookie-consent.js': 200,
  '/js/globalnav.js': 200,
  '/navigate.en.shtml': 200,
  '/navigate.fr.shtml': 200,
  '/templates/fragments/header.fr.html': 200,
  '/templates/fragments/header.en.html': 200,
}

sum_test_passed = 0
sum_test_failed = 0

headers = {
  'User-Agent': 'ISAS-FSD Agent 1.0',
}

for path, code in paths.items():
  url = BASE_URL + path + '?' + str(uuid.uuid4())
  print(url)
  response_head = requests.head(url, headers=headers)
  response_code = response_head.status_code
  if (response_code != code):
    print('FAILED: {} -> {}, should be {}'.format(url, response_code, code))
    sum_test_failed += 1
  else:
    sum_test_passed += 1

print('\nTEST finished:')
print('  {} passed.'.format(sum_test_passed))
print('  {} failed.'.format(sum_test_failed))
