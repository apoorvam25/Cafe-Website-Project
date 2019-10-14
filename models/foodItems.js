const Sequelize=require('sequelize')
const Users=require('./tablesCreater').Users

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'./databases/tables.sqlite'
})

const Items=sequelize.define('fooditems',{
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
    sequelize,
    function(table){
        return table.sync({force:true})
    }
}