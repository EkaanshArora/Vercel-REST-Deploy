var request = require('request');
var fs = require('fs');

let token = '';
let username = '';

async function x() {
  try {
    /* Create from Template */
    console.log("Creating template...");
    fs.readFile('./template/index.html', 'utf-8', function (err, data) {
      if (err) throw err;
      var newValue = data.replace(/%NAME%/g, username);
      fs.writeFile('./deploy/index.html', newValue, 'utf-8', function (err, data) {
        if (err) throw err;
        console.log('Done!');
      })
      /* VERCEL REQUEST */
      var headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      };

      const html = newValue.replace(/(?:\r\n|\r|\n)/g, '\\n');

      var data = `{
      "name": "${username.toLowerCase()}-deploy",
      "files": [
        {
          "file": "index.html",
          "data": "${html}"
        }
      ],
      "projectSettings": {
        "framework": null
      }
    }`;

      var options = {
        url: 'https://api.vercel.com/v12/now/deployments',
        method: 'POST',
        headers: headers,
        body: data
      };

      function callback(error, response, body) {
        console.log(error, response, body)
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
      console.log(options)
      request(options, callback);
    })
  } catch (e) {
    console.log(e);
  }
}

x();
