const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const pg = require('pg');

// const client = new Client({
//   host:'ec2-3-229-165-146.compute-1.amazonaws.com',
//   user:'cygrlquuaibygd',
//   password:'e5690f3718f1322fa53d68fcbd76c8bc4acb36dfc83d0d84d3aee5070376c14',
//   database:'d58qbuc2m0e2ig',
//   port: 5432,
//   ssl: { rejectUnauthorized: false },
// })

// const client = new Client({
//   user:'postgres',
//   host:'localhost',
//   database:'shoppingapp',
//   password:'password',
//   port:5432
// })
const setting={
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
}
/* GET home page. */

let cashe=[];
let i=0;


router.get('/', function(req, res, next) {
  const isAuth=req.isAuthenticated();
  if(isAuth){
    const userId=req.user.id;
    const userN=req.user.name;
    if(isNaN(cashe[req.user.id])){
      cashe[req.user.id]=0;
    }
    knex("items")
      .select("*")
      .where({user_id:userId})
      .then(results=>{
        res.render('index',{
          title:'Shopping App',
          items:results,
          cashe:cashe[req.user.id],
          isAuth:isAuth,
          NaMe:userN,
          iD:userId
        });
      })
      .catch(err=>{
        console.error(err);
        res.render('index',{
          title:'Shopping App',
          isAuth:isAuth
        });
      });
  }else{
    res.render('index',{
      title:'Shopping App',
      isAuth:isAuth
    });
  }
});

router.post('/count',(req,res,next)=>{
  const isAuth=req.isAuthenticated();
  cashe[req.user.id]=0;
  res.redirect('/');
})

router.post('/buy',(req,res,next)=>{
  const isAuth=req.isAuthenticated();
  //この関数は働いている
  const yen = Number(req.body.daikin);
  const item_id=Number(req.body.id);
  const item_qua=Number(req.body.qua);
  //定数たちも正しく代入されている
  // client.query({
  //   text:'delete from items where id = $1',
  //   values:[item_id]
  // },(err,res)=>{
  //   if(err){
  //     console.log(err.stack)
  //   }else{
  //     console.log(res.rows[0]);
  //   }
  // })
  const pool = new pg.Pool(setting);
  pool.connect((err,client)=>{
    if(err){
      console.log(err);
    }else{
      client.query({
        text:'delete from items where id = $1',
        values:[item_id]
      })
      .catch(e=> console.error(e.stack));
    }
  })
  cashe[req.user.id]+=yen*item_qua;
  res.redirect('/');
})

router.post('/',(req,res,next)=>{
  const isAuth=req.isAuthenticated();
  const userId=req.user.id;

  const itemName=req.body.item;
  const itemQua=req.body.quantity;
  knex("items")
    .insert({user_id:userId,item_name: itemName,item_quantity:Number(itemQua) })
    .then(()=>{
      res.redirect('/');
    })
    .catch(err=>{
      console.error(err);
      res.render('index',{
        title:'Shopping App',
        isAuth:isAuth
      });
    });
});


router.use('/signup', require('./signup'));
router.use('/signin',require('./signin'));
router.use('/logout', require('./logout'));
module.exports = router;
