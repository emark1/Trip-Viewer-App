const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// tell express to use mustache templating engine
app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

app.use('/css/version1/',express.static('css'))

//Empty array to capture each trip
let trips = [{triptitle: "denver", departdate: "fff", returndate: "ffff"}]


//Capture data from the input boxes, push it to the empty array
app.post('/add-trip',(req,res) => {

    let triptitle = req.body.triptitle
    let departdate = req.body.departdate
    let returndate = req.body.returndate
  
    console.log(triptitle)
    console.log(departdate)
    console.log(returndate)
  
    let trip = { triptitle: triptitle, departdate: departdate, returndate: returndate}
    trips.push(trip)
  
    res.redirect('/view-trips')
  })

//Delete object from array
//APP POST
// FILTER
app.post('/remove-trip',(req,res) => {
    let city = req.body.cityDelete
    trips = trips.filter(trip =>{
        return trip.triptitle != city
    })
    res.redirect('view-trips')
    // res.render('view-trips',{tripList: trips}) 
})

//Make the trips array available to iterate through in Mustache, on the View-Trips page
app.get('/view-trips',(req,res) => {
    res.render('view-trips',{tripList: trips})
})


  
// display the add-trip page
app.get('/add-trip',(req,res) => {
    res.render("add-trip")
})

//display view-trips
app.get('/view-trips',(req,res) => {
    res.render("view-trips")
})

app.listen(3000,() => {
    console.log("Server is running...")
  })