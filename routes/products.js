const express=require('express')
const route=express.Router()
const Sequelize=require('sequelize')
const Items=require('../models/tablesCreater').Items

route.get('/ordernow',(req,res)=>{
    
    if(req.user===undefined){
        res.redirect('/login')
    }
    else{
        console.log("WELCOME "+req.user.fullname)
    // Items.getAll=function(){
        Items.findAll().then(function (users){
            let arr=users.map(u => u.get({plain: true}))
            //console.log(arr)
            res.render('orderonline',{arr,currentUser:req.user})
            //res.sendStatus(200)
        });
    // }
    }

})


// sequelize.authenticate().then(()=>{
//     console.log('Connected to products db')
// })

module.exports=route