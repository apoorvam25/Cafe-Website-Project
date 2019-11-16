const express=require('express')
const route=express.Router()
const Sequelize=require('sequelize')

route.get('/reserve',(req,res)=>{
    if(req.user===undefined){
        res.redirect('/login')
    }
    else{
        console.log("WELCOME "+req.user.fullname)
            res.render('tablereservation',{currentUser:req.user})
           // res.sendStatus(200)
        }
    // }
    })

module.exports=route