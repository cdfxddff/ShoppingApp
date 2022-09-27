const passport = require("passport");
const LocalStrategy = require("passport-local");
const knex=require("../db/knex");
const User = require("../models/user");
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";

module.exports = function (app) {
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    });

    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
      },function(username, password, done) {
        knex("users")
            .where({
                name:username,
            })
            .select("*")
            .then(results=>{
                if(results.length===0){
                  return done(null,false,{message:'Invalid User'});
                }else if(password==results[0].password){
                  return done(null,results[0]);
                }else{
                  return done(null,false,{message:'Invalid User'});
                }
            })
            .catch(err=>{
              console.error(err);
              return done(null,false,{message:err.toString()});
            });
      }
    ));

    app.use(
      cookieSession({
        name:'session',
        keys:[secret],
        maxAge:24*60*60*1000
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
};