# Weather Bot Twitter - Evan Bitic

Require with your token of twitter developper account
````
var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});
````

When you want your bot tweet (here at 07:15 all days)
````
var j = schedule.scheduleJob('15 07 * * *', function(){
````

Request API with a City (Pithiviers for example)
````
axios.get(`https://api.apixu.com/v1/forecast.json?key=c29ab19c2a3846dd9ab133733192504&q=Pithiviers&lang=fr`)
````

Content of tweet (callback with a message in consol)
````
T.post('statuses/update', { status: `📍  ${name}\n ${emoji} ${temp}°C (${comment}) \nmax: ${maxTemp}°C  min: ${minTemp}°C`}, function(err, data, response) {
  // console.log(data);
  console.log(`✉️ Tweet posté à ${date}`.green.italic);
  })
````

### Example Tweet

![alt text](https://image.noelshack.com/fichiers/2019/26/2/1561445568-capture-d-ecran-2019-06-25-a-08-52-34.png)

## Creator

Created by [Evan Bitic](www.evan-bitic.fr).
