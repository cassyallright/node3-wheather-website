const hbs = require('hbs')
const path = require('path')
const express= require('express')

const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup  handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index', {
        title:'wheather',
        name:' fatih akbayrak'
    })

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'FATO BABA'
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'FATİH AKBAYRAK',
        helpText:'THis is sparta babe'
    })

})

app.get('/wheather',(req,res)=>{
    res.send({
        forecast:'it is snowin',
        location:'ankara'
    })
})
app.get('/help/*', (req,res)=> {
res.render('404',{

    title:'HELP',
    errorMessage:'ARTICLE NOT FOUND'

})

})


app.get('*', (req,res)=>{
    res.render('404',{name:'FATO BABA',
        title:'404',
        errorMessage:'  Page not found'
    })
})

app.listen(3000, () => {
console.log('server is up on port 3000')

})
