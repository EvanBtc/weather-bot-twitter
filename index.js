const axios = require('axios'); // Inport du package axios
var colors = require('colors');
const Twit = require('twit');
const schedule = require('node-schedule');
const dotenv = require('dotenv');

dotenv.config();

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

console.log('🕙 Bot getting started..'.yellow.bold);
console.log('✅ Bot ready'.green.bold);

const cloudEmoji = [1003, 1006, 1009];
const snowEmoji = [1066, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264];
const snowrainEmoji = [1069, 1072, 1114, 1252];
const rainthundercloudEmoji = [1276, 1279, 1282];
const rainEmoji = [1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1249, 1273];
const cloudrainEmoji = [1063, 1150, 1153, 1168, 1171];
const fogEmoji = [1135, 1147];

var j = schedule.scheduleJob('12 11 * * *', function(){
  axios.get(`https://api.apixu.com/v1/forecast.json?key=c29ab19c2a3846dd9ab133733192504&q=Pithiviers&lang=fr`)
  .then( (responseApi) => {
    const name = responseApi.data.location.name;
    const temp = responseApi.data.current.temp_c;
    const maxTemp = responseApi.data.forecast.forecastday[0].day.maxtemp_c;
    const minTemp = responseApi.data.forecast.forecastday[0].day.mintemp_c;
    const comment = responseApi.data.current.condition.text;
    const code = responseApi.data.current.condition.code;
    const date = responseApi.data.location.localtime;
    let emoji = "";

  if (code == 1000){
    emoji = "☀️";
  } else if (cloudEmoji.indexOf(code) >= 0){
    emoji = "☁️";
  } else if (snowEmoji.indexOf(code) >= 0){
    emoji = "❄️";
  } else if (snowrainEmoji.indexOf(code) >= 0){
    emoji = "🌨";
  } else if (code == 1087){
    emoji = "⚡️";
  } else if (rainthundercloudEmoji.indexOf(code) >= 0){
    emoji = "⛈";
  } else if (rainEmoji.indexOf(code) >= 0){
    emoji = "💦";
  } else if (cloudrainEmoji.indexOf(code) >= 0){
    emoji = "🌧";
  } else if (fogEmoji.indexOf(code) >= 0){
    emoji = "🌫";
  }

  T.post('statuses/update', { status: `📍  ${name}\n ${emoji} ${temp}°C (${comment}) \nmax: ${maxTemp}°C  min: ${minTemp}°C`}, function(err, data, response) {
  // console.log(data);
  console.log(`✉️ Tweet posté à ${date}`.green.italic);
  })
});
});
