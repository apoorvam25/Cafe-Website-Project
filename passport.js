const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const Users=require('./models/tablesCreater').Users


passport.use(new LocalStrategy((username,password,done)=>{
    console.log(username)
    console.log(password)
    Users.findOne({
        where:{
           username : username
        }
    })
        .then(reluser=>{
            console.log('SEARCHED')
            if(reluser==null){
                return done(null,false,{message:"NoSuchUser"})
                //res.redirect('/signup')
            }
            else if(reluser.password!==password){
                return done(null,false,{message:"WrongPassword"})
                //res.redirect('/login')
            }
            else{
                console.log('WE HAVE FOUND '+reluser.fullname)
                //res.send('Welcome '+reluser.firstname)
                //res.redirect('/shopnow')
                return done(null,reluser,{message:"Success"})
            }
        })
        // }).catch(err=>{
        //     return done(err)
        // })
}
))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

module.exports=passport