const express = require('express')
const app =express()
const hbs=require('hbs')
const path=require('path')

app.set('view engine' , 'hbs' )
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(path.join(__dirname,'/partials'))

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

app.get('/login', (req,res)=> {
    res.render('login')
})

app.get('/signup', (req,res) => {
    res.render('signup')
})
app.listen( 4000, () => {
    console.log("Server Connected")
})