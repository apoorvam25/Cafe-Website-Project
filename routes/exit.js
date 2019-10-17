const route=require('express').Router()

route.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})

module.exports=route