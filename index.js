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

app.use(entryroute.route)
app.use(itemsroute)
app.use(cartroute)
app.use(exitroute)
app.use(paymentroute)

app.get('/' , (req,res) => {
res.render('cover')}
)

app.get('/cover' , (req,res) => {
    res.render('cover')}
    )

app.get('/ourstory' , (req,res) => {
    res.render('ourstory')
})

app.get('/menu' , (req,res) => {
    res.render('menu')
})

app.listen( 4000, () => {
    console.log("Server Connected")
})