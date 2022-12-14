const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
//const pg = require('pg');
const {Pool} = require('pg');

//githubに上げてるのでブランチの名前はmainです

const pool = new Pool({
  connectionString: 'postgres://yamaguchi:AOJdIvHKkUn8dex8B78No3vM7gmpuWRI@dpg-cdi869g2i3mick8lv8c0-a/shopdic',
  ssl: { rejectUnauthorized: false },
})
/* GET home page. */

let cashe=[];
let i=0;

pool.on('error',(err,client)=>{
  console.error('error',err)
  process.exit(-1);
});

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
          title:'食料品の買い物リスト',
          items:results,
          cashe:Math.floor(cashe[req.user.id]),
          isAuth:isAuth,
          NaMe:userN,
          iD:userId
        });
      })
      .catch(err=>{
        console.error(err);
        res.render('index',{
          title:'食料品の買い物リスト',
          isAuth:isAuth
        });
      });
  }else{
    res.render('index',{
      title:'食料品の買い物リスト',
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
  pool.connect()
    .then(client=>{
      return client
        .query('delete from items where id = $1',[item_id])
        .then(res=>{
          client.release();
        })
        .catch(err=>{
          client.release();
        })
    })
  cashe[req.user.id]+=yen*item_qua*1.08;
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
        title:'食料品の買い物リスト',
        isAuth:isAuth
      });
    });
});


router.use('/signup', require('./signup'));
router.use('/signin',require('./signin'));
router.use('/logout', require('./logout'));
module.exports = router;
