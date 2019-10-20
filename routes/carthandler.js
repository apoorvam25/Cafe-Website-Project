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
        // UsersCart.findAll({
        //     // where:{
        //     //     userId:req.user.id
        //     // },
        //     include:[{
        //         model:Items,
        //         through:{
        //             attributes:['imgurl','title','price','description'],
        //             where:{
        //                 userId:req.user.id
        //             }
        //         }
        //     }]
        // })
        Users.findByPk(req.user.id,{
            include:[{
                model:Items
            }]
        })
        // .then(items=>{
        //     console.log(items)
        // })
        .then(function(user){
            //let arr= items.map(x=>x.get({plain:true}))
                        //.map(item=>item.item_id)
                        //.map((itemid)=>{
                        //     return Items.findOne({where:{id:itemid}})
                        // })
            //return Promise.all(arr)
            //console.log(arr)
            let arr=user.items.map(x=>x.get({plain:true}))
            console.log(arr)
            res.render('mycart',{arr,currentUser:req.user})
            })
        // }).then(array=>{
        //     array=array.map(x=>x.get({plain:true}))
        //     console.log(array)
        //     res.render('mycart',{array})
        // })
    }
    //res.send('Cart is up and running from route')
})

route.get('/addtocart/:id',(req,res)=>{
    if(req.user===undefined){
        res.redirect('/login')
    }
    const relid=req.params.id
    //const user=req.user
    Users.findOne({
        where:{
            id:req.user.id
        }
    }).then(reluser=>{
        //UsersCart.create
        Items.findOne({
            where:{
                id:relid
            }
        }).then(relitem=>{
            reluser.addItems(relitem,{through:{amount:relitem.price}})
        })
    })
    // Items.findOne({
    //     where:{
    //         id:relid
    //     }
    // }).then(relitem=>{
    //     req.user.addItems(relitem)
    //     // UsersCart.create({
    //     //     userId:req.user.id,
    //     //     //item_id:parseInt(relid,10),
    //     //     itemId:relitem.id,
    //     //     quantity:1,
    //     //     amount:relitem.price,
    //     // })
    // })
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
        // UsersCart.update({quantity:Sequelize.literal('quantity+1'),amount:Sequelize.literal('amount'+p)},{
        //     where:{
        //         userId:userid,
        //         itemId:relid
        //     }
        // })
        // .then((updated)=>{
        //     //console.log(updated)
        //     res.redirect('/mycart')
        // })
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
    
    // UsersCart.findOne({
    //     where:{
    //         userId:userid,
    //         itemId:relid
    //     }
    // }).then((tobeupdated)=>{
    //     tobeupdated.quantity=tobeupdated.quantity+1
    // }).then((updated)=>{
    //     console.log(updated)
    //     res.redirect('/mycart')
    // })
    // UsersCart.update(object,{
    //     where:{
    //         userId:userid,
    //         itemId:relid,
    //     }
    // }).then(()=>{
    //     res.redirect('/mycart')
    // })
    
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