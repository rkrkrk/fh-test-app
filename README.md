fh-test-app
===========

A Sample Application build using the FeedHenry platform

To get running you'll need to do the following:

* install node and npm
* register an account at https://apps.feedhenry.com/
* install fh-fhc `npm install -g fh-fhc`
* run the following:
<pre>
# cd fh-test-app/cloud
# npm install .
# cd fh-test-app
# fhc target https://apps.feedhenry.com
# fhc login <your-email-address> <your-password>
# fhc apps create TestApp git@github.com:TinyExplosions/fh-test-app.git
# fhc local
</pre>

go to 127.0.0.1:8000 in browser and you should see the app!