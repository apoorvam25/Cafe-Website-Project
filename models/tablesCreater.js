const Users=require('./users').Users
const syncfunc=require('./users').function
const sequelize=require('./users').sequelize

const Items=require('./items').Items
const syncfuncItems=require('./items').function
const sequelizeItems=require('./items').sequelize


syncfunc(Users).then(()=>{
    console.log('Synced to Users')
    syncfuncItems(Items).then(()=>{
        console.log('Synced to Items')
        Items.bulkCreate([
            {
                imgurl:'/Momos.webp',
                title:"Chilly Momos Dry ",
                price:125,
                description:"Sweet and Spicy Vegetable Dumplings",
            },
            {
                imgurl:'/CrispyPotatoes.jpg',
                title:"Crispy Potatoes",
                price:125,
                description:"Spicy Seasoning wok tossed fried potatoes",
            },
            {
                imgurl:'/SpringRoll.jpg',
                title:"Oriental Spring Roll",
                price:150,
                description:"Oriental vegetables and Oyster sauce flavoured",
            },
            {
                imgurl:'/DalIndus.jpg',
                title:"Dal Indus",
                price:250,
                description:"Black lentils with tomato puree and butter,Cream",
            },
            {
                imgurl:'/PaneerButterMasala.jpg',
                title:"Paneer Butter Masala",
                price:350,
                description:"Tomato and Cashew Gravy , Semi Dry",
            
            },
            {
                imgurl:'/SubjJodhpuri.jpg',
                title:"Subj Jodhpuri",
                price:400,
                description:"Assorted vegetables with semi dry spinach Gravy",
            
            },
            {
                imgurl:'/Manchow.png',
                title:"Manchow",
                price:250,
                description:"Spicy thick soup with mushroom and chapped chicken",
            
            },
            {
                imgurl:'/TomatoSoup.jpg',
                title:"Cream of Tomato",
                price:250,
                description:"A velvety smooth tomato and cream soup",
            
            },
            {
                imgurl:'/Minestrone.jpg',
                title:"Minestrone",
                price:250,
                description:"A flavoured hot soup with lemongrass and chilly paste",
            
            }
        
        ]).then( () => {
            console.log("Inserted into Fooditems")
        })
})
})

sequelizeItems.authenticate().then(()=>{
    console.log('Connected to Items')
})

sequelize.authenticate().then(()=>{
    console.log('Connected to Users')
})

module.exports={
    Users,
    Items,
    }