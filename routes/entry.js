const route=require('express').Router()
const passport=require('../passport')
const Sequelize =require('sequelize')
const session=require('express-session')
const Users=require('../models/tablesCreater').Users
const UsersCart=require('../models/cart')

route.use(session({
    secret: 'nobody can guess',
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false }
}))

route.use(passport.initialize())
route.use(passport.session())

route.get('/login',(req,res)=>{
    res.render('login')
})

route.get('/signup',(req,res)=>{
    res.render('signup')
})

route.post('/login',function (req,res,next){
    passport.authenticate('local',function (err,user,info){
        console.log(info.message)
        if(!user){
            if(info.message=='NoSuchUser'){
                res.redirect('/signup')
            }
            if(info.message=='WrongPassword'){
                res.redirect('/login')
            }
        }
        else{
            req.logIn(user,(err)=>{
                if(err){
                    return console.log(err)
                }
                else{
                    res.redirect('/ordernow')
                }
            })
        }
    })(req,res,next)
})

route.post('/signup',(req,res)=>{
    Users.create({
        username:req.body.username,
        password:req.body.password,
        fullname:req.body.fullname,
        mobilenumber:req.body.mobilenumber
    })
    .then(newuser=>{
        res.redirect('/login')
    })
})

module.exports={
    Users,
    //sequelize,
    route
}