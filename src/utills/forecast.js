// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request= require('request')

const forecast = (latitude,longitude,callback) => {
const url =' https://api.darksky.net/forecast/5dc29b584b119e6333facc5ad8013b59/'+latitude+ ',' + longitude
    request ({url, json:true}, (error,{body}) => {
        if(error){
        callback('Unable to connect to the wheather server',undefined)
        }else if(body.error){

            callback('Unable to find Coordinate',undefined)
        }else {
            callback(undefined,body.daily.data[0].summary + ' SICAKLIK IS '+ body.daily.data[0].temperatureHigh+' There is a '+ body.currently.precipProbability+' % chance of rain')
        }

    })

}
module.exports=forecast