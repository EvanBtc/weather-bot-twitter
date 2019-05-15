const axios = require('axios'); // Inport du package axios
const express = require('express'); // Inport du package express
const app = express(); // Créer une instance d'express

// var temperature;

// // Fais une request GET sur l'api de github
// axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
// .then(function(res) { // S'execute quand l'api renvois la réponse
//   console.log(res.status); // C'est le code de réponse html 200... Ca peux te servir pour repérer les erreurs

//   temperature = res.data.main.temp;
  
//   console.log('Il fait ' + temperature + ' degrès');

// }).catch((err) => { // S'execute quand axios arrive pas à joindre l'api ou lors d'une erreur HTTP (40x...)
//   console.log(err);
// });

app.get('/temp', (request, response) => {
  const city = request.query.city;
  axios.get(`https://api.apixu.com/v1/forecast.json?key=c29ab19c2a3846dd9ab133733192504&q=${city}`)
  .then( (responseapi) => {
    const temp = responseapi.data.current.temp_c;
    const comment = responseapi.data.current.condition.text;
    response.status(200).send({
      temp,
      comment,
    })
  });
});

app.listen(3000, () => {
  console.log('App started on :3000')
} ); // Numéro de port que l'app va écouter



