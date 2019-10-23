const Sequelize=require('sequelize')
const Users=require('./tablesCreater').Users

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'./db.sqlite'
})

const Items=sequelize.define('items',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    imgurl:{
        type:Sequelize.STRING,
    },
    title:{
        type:Sequelize.STRING,
    },
    price:{
        type:Sequelize.STRING,
    },
    description:{
        type:Sequelize.STRING,
    }
})

module.exports={
    Items,
    function(table){
        return table.sync({force:true})
    },
    sequelize
}