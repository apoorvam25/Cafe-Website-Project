const Sequelize=require('sequelize')
const Users=require('./tablesCreater').Users
const Items=require('./tablesCreater').Items

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'./db.sqlite'
})

const UsersCart=sequelize.define('UsersCart',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    quantity:{
        type:Sequelize.INTEGER,
        defaultValue:1,
    },
    amount:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    }
})

    Users.belongsToMany(Items,{
        through:UsersCart,
    })

    Items.belongsToMany(Users,{
        through:UsersCart,
    })
    
UsersCart.sync({force:true}).then(()=>{
    console.log('Synced to my cart')
})

sequelize.authenticate().then(()=>{
    console.log('Connected to cart table')
}).catch(err=>{
    console.log(err)
})

module.exports=UsersCart