const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')
const hbs = require('hbs')
const path = require('path')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup  handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: ' fatih akbayrak'
    })

})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Fatih Akbayrak'
    })

})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'FATİH AKBAYRAK',
        helpText: 'THis is sparta babe'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {

                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {

        title: 'HELP',
        errorMessage: 'ARTICLE NOT FOUND'

    })

})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!   '
        })
    }
    console.log(req.query.search)
    res.send({

        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Fatih Akbayrak',
        title: '404',
        errorMessage: '  Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)

})
