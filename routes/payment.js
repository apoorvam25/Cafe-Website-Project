const route=require('express').Router()
const UsersCart=require('../models/cart')

route.get('/buynow',(req,res)=>{
    UsersCart.findAll()
    .then(items=>{
        const amounts=items.map(x=>x.get({plain:true})).map(x=>x.amount)
        const total=amounts.reduce((acum,i)=>{
            return acum+i
        })
        console.log(total)
        res.render('payment',{total,currentUser:req.user})
    })
})

module.exports=route