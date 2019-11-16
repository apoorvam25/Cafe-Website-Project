const express = require('express')
const app =express()
const hbs=require('hbs')
const path=require('path')

app.set('view engine' , 'hbs' )
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(path.join(__dirname,'/partials'))

const entryroute=require('./routes/entry.js')
const itemsroute=require('./routes/products.js')
const cartroute=require('./routes/carthandler.js')
const exitroute=require('./routes/exit.js')
const paymentroute=require('./routes/payment.js')
const tableroute=require('./routes/tablereserve.js')
const bookingroute=require('./routes/bookings.js')

app.use(entryroute.route)
app.use(itemsroute)
app.use(cartroute)
app.use(exitroute)
app.use(paymentroute)
app.use(tableroute)
app.use(bookingroute.route)

app.get('/' , (req,res) => {
res.render('cover',{currentUser:req.user})
})

app.get('/cover' , (req,res) => {
    res.render('cover',{currentUser:req.user})
})

app.get('/ourstory' , (req,res) => {
    res.render('ourstory',{currentUser:req.user})
})

app.get('/menu' , (req,res) => {
    res.render('menu',{currentUser:req.user})
})

app.get('/contactus' , (req,res) => {
    res.render('contactus',{currentUser:req.user})
})

app.listen( 4000, () => {
    console.log("Server Connected")
})