var request = require('request');

const email = '';

async function x() {
  try {
    /* VERCEL REQUEST */
    var headers = {
      'Content-Type': 'application/json'
    };

    var dataString = `{"email": "${email}", "tokenName": "customweb"}`;

    var options = {
      url: 'https://api.vercel.com/now/registration',
      method: 'POST',
      headers: headers,
      body: dataString
    };
    console.log("Logging in...")
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        const data = JSON.parse(body);
        const token = data.token;
        console.log('Check your email and accept '+data.securityCode+', once done press any key to continue', token);
        process.stdin.once('data', function () {
          request({ url: `https://api.vercel.com/now/registration/verify?email=${email}&token=${token}` }, (e, r, d) => {
            console.log(d);
            let log = JSON.parse(d);
            console.log(log.token);
            process.exit.bind(process, 0);
          });
        });
      }
    }

    request(options, callback);

  } catch (e) {
    console.log(e);
  }
}
x();
