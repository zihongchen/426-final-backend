var http = require('https');

var mail = new Buffer(
    "From: example@gmail.com\n" +
    "To: example@gmail.com\n" +
    "Subject: Subject Text\n\n" +

    "Message text"
).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');


var post_options = {
  hostname: 'www.googleapis.com',
  port: '443',
  path: '/gmail/v1/users/me/messages/send',
  method: 'POST',
  headers: {
    "Authorization": 'Bearer <ACCESS_TOKEN>',
    "Content-Type" : "application/json"
  }
};

var post_req = http.request(post_options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
  });
});

post_req.write(JSON.stringify({ "raw": mail }));
post_req.end();