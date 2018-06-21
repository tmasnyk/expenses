I decided to create a server with nodejs, which could be extend with express for example to client-server app.
But web app must be without a backend. So I used "browserify" to bring nodejs to client.

Live DEMO here http://91.206.252.46:8083/

For build console version clone project and run npm install.
start: node app.js

For build web version clone project and run npm install. Then run browserify webapp.js > bundle.js

Comments:
 - This project can't be used in production because it can have performance problems. For example, if there will be a huge number of records.
   It can be solved by limiting the sample period.




