const route=require('express').Router()
const Sequelize=require('sequelize')
const Users=require('../models/tablesCreater').Users
const Items=require('../models/tablesCreater').Items
const UsersCart=require('../models/cart')

route.get('/mycart',(req,res)=>{
    if(req.user===undefined){
        res.redirect('/login')
    }
    else{
        Users.findByPk(req.user.id,{
            include:[{
                model:Items
            }]
        })
        .then(function(user){
            let arr=user.items.map(x=>x.get({plain:true}))
            console.log(arr)
            res.render('mycart',{arr,currentUser:req.user})
            })
    }
})

route.get('/addtocart/:id',(req,res)=>{
    if(req.user===undefined){
        res.redirect('/login')
    }
    const relid=req.params.id
    Users.findOne({
        where:{
            id:req.user.id
        }
    }).then(reluser=>{
        Items.findOne({
            where:{
                id:relid
            }
        }).then(relitem=>{
            reluser.addItems(relitem,{through:{amount:relitem.price}})
        })
    })
    .then(()=>{
        res.redirect('/ordernow')
    })

})

route.post('/removefromcart/:itemid',(req,res)=>{
    UsersCart.destroy({
        where:{
            userId:req.user.id,
            itemId:parseInt(req.params.itemid,10)
        }
    }).then(deleteditem=>{
        res.redirect('/mycart')
    })
})

route.post('/increasequantity/:itemid',(req,res)=>{
    const userid=req.user.id
    const relid=parseInt(req.params.itemid,10)
    Items.findOne({
        where:{
            id:relid,
        }
    }).then(relitem=>{
        const p=relitem.price
        UsersCart.findOne({
            where:{
                userId:userid,
                itemId:relid,
            }
        })
        .then(tobeupdated=>{
            return tobeupdated.increment({
                'quantity': 1,
                'amount':p,
            })
        })
        .then(updated=>{
            console.log("Incremented")
            //updated.reload()
            res.redirect('/mycart')
        })
    })
    
})

route.post('/decreasequantity/:itemid',(req,res)=>{
    const userid=req.user.id
    const relitemid=parseInt(req.params.itemid,10)
    Items.findOne({
        where:{
            id:relitemid,
        }
    }).then(relitem=>{
        const p=relitem.price
        UsersCart.findOne({
            where:{
                userId:userid,
                itemId:relitemid,
            }
        }).then(toupdate=>{
            return toupdate.decrement({
                'quantity': 1,
                'amount':p,
            })
        }).then(updated=>{
            res.redirect('/mycart')
        })
    })
})


module.exports=route