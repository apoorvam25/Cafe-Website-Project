const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
  });

  const Users=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },

    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    fullname:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    mobilenumber:{
        type:Sequelize.STRING,
        allowNull:false,
    },

})

module.exports={
    Users,
    function (table){
        return table.sync({force:true})
    },
    sequelize
}
  