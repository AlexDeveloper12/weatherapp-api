var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
var port = process.env.PORT || 3000;

require('dotenv').config()

app.get("/",function(req,res){
    res.send({
        message:"Default route"
    });
});

app.get("/currentweather/:lat/:lon",function(req,res){
    //https://api.openweathermap.org/data/2.5/weather?
    const lat = req.params.lat;
    const lon = req.params.lon;
    axios.get(`${process.env.OPEN_WEATHER_LINK}?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then(response=>{
        res.send({
            message:response.data
        });
    })
})

app.get("/forecast/:lat/:lon",function(req,res){
    const lat = req.params.lat;
    const lon = req.params.lon;

    axios.get(`${process.env.OPEN_WEATHER_FORECAST_LINK}?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then(response=>{
        res.send({
            message:response.data
        });
    })

//https://api.openweathermap.org/data/2.5/forecast/daily?
});

app.get("/cities",function(req,res){
//https://wft-geo-db.p.rapidapi.com/v1/geo



});




app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})