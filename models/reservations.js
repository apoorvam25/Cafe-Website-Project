const Sequelize=require('sequelize')
const Users=require('./tablesCreater').Users

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'./db.sqlite'
})

const Reservations=sequelize.define('reservations',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    date:{
        type:Sequelize.DATE,
    },
    time:{
        type:Sequelize.TIME,
    },
    count:{
        type:Sequelize.INTEGER,
    }
})

Reservations.sync({force:true}).then(()=>{
    console.log('Synced to Reservations')
})


sequelize.authenticate().then(()=>{
    console.log('Connected to reservations')
}).catch(err=>{
    console.log(err)
})

Users.hasMany(Reservations)
Reservations.belongsTo(Users)

module.exports= Reservations