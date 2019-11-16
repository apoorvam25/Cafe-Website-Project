const route=require('express').Router()
const Sequelize=require('sequelize')
const Users=require('../models/tablesCreater').Users
const Reservations=require('../models/reservations')
   
    route.post('/bookatable', (req, res) => {
        Reservations.create({
            date : req.body.date,
            time : req.body.time,
            count : req.body.count
        }).then((newreservation) => {
             Reservations.sum('count', {
                  where : { date : req.body.date
             }}).then((sum) => {
                console.log(sum)
                if(sum>50) {
                    console.log('Seat not available')
                    Reservations.destroy({
                        where : {
                            id : newreservation.id
                        }
                    }).then(() => {
                        res.render('notavailbooking')
                    })
                }
                else
                {
                    Users.findOne({
                         where :
                          { id : req.user.id }
                }).then((reluser) => {
                    reluser.addReservation(newreservation)
                    console.log('Table Added to User')
                    res.render('confirmbooking')
                })
             }
        })
    })
})
        //      Reservations.sum('count').then(sum => {
        //          console.log(sum)
        //          if(sum>50) {
        //              console.log('Seat not available')
        //                 //res.render('notavailbooking')
        //          }
        //          else
        //          {
        //              //res.render('availbooking')
        //             Users.findOne({
        //                 where : {
        //                     id : req.user.id
        //                 }
        //             }).then( (reluser) => {
        //                 //console.log(reluser)
        //              Reservations.create({
        //                 date : req.body.date,
        //                 time : req.body.time,
        //                 count : req.body.count
        //                }).then((newreservation) => {
        //                   // console.log(newreservation)
        //                       reluser.addReservation(newreservation)
        //                })
        //             }).then(() => {
        //                 console.log('Inserted into user ')
        //                 const html = '<p>Seat Available</p>'
        //                 res.render('tablereservation',function(err,html){
        //                          res.send(html)
        //                 })
        //             })

        //          }
        //      })            

        //     // Reservations.create({
        //     //   date : req.body.date,
        //     //   time : req.body.time,
        //     //   count : req.body.count
        //     // })
        //     // .then((newreservation) => 
        //     //            {   console.log(newreservation)
        //     //                console.log("Inserted into Reservations")
        //     //             res.redirect('/reserve')
    
        // })
    //     )}
    // )

        // Users.findOne({
//             where:{
//                 id:req.user.id
//             }
//         }).then(reluser=>{
//             console.log(reluser)
//             reluser.addReservations(Reservations)
//             })
//         .then(()=>{
//             console.log("Seat Available")
//         })
//     }
// })

module.exports = {
    route,
    Reservations}