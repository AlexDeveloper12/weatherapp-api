var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
var port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
    methods:'GET',
    optionsSuccessStatus:200,
    origin:'*'
}));

app.options('*',cors());

require('dotenv').config()

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.send({
        message: "Default route"
    });
});

app.get("/currentweather/:lat/:lon", function (req, res) {
    const lat = req.params.lat;
    const lon = req.params.lon;
    axios.get(`${process.env.OPEN_WEATHER_LINK}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
        .then(response => {
            res.send({
                message: response.data
            });
        })
})

app.get("/forecast/:lat/:lon", function (req, res) {
    const lat = req.params.lat;
    const lon = req.params.lon;

    axios.get(`${process.env.OPEN_WEATHER_FORECAST_LINK}lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
        .then(response => {
            res.send({
                message: response.data
            });
        })    
});

app.get("/cities/:city", function (req, res) {
    
    const city = req.params.city;

    const config = {
        headers:{
            'X-RapidAPI-Key':`${process.env.GEODB_CITIES_API_KEY}`,
            'X-RapidAPI-Host': `${process.env.RAPID_API_HOST}`
        }
    }

    axios.get(`${process.env.GEODB_CITIES_LINK}/cities?minPopulation=1000000&namePrefix=${city}`,config)
        .then(response => {
            res.send({
                message: response.data
            })
        })

});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})