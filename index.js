var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
const { response } = require('express');
var app = express();
var port = process.env.PORT || 3000;

require('dotenv').config()

app.get("/", function (req, res) {
    res.send({
        message: "Default route"
    });
});

app.get("/currentweather/:lat/:lon", function (req, res) {
    const lat = req.params.lat;
    const lon = req.params.lon;
    axios.get(`${process.env.OPEN_WEATHER_LINK}?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
        .then(response => {
            res.send({
                message: response.data
            });
        })
})

app.get("/forecast/:lat/:lon", function (req, res) {
    const lat = req.params.lat;
    const lon = req.params.lon;

    axios.get(`${process.env.OPEN_WEATHER_FORECAST_LINK}?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
        .then(response => {
            res.send({
                message: response.data
            });
        })    
});

app.get("/cities/:city", function (req, res) {
    
    const city = req.params.city;

    axios.get(`${process.env.GEODB_CITIES_LINK}/cities?minPopulation=1000000&namePrefix=${city}`)
        .then(response => {
            res.send({
                message: response.data
            })
        })

});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})