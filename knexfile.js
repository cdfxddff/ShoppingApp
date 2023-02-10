module.exports = {

  development: {
    client: "pg",
    connection: {
      database: "shoppingapp",
      user: "postgres",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "pg",
    connection: {
      connectionString: 'postgres://yamaguchi:RLf4P7qWYZPRUp7Yf31WkXWfOrY8YT62@dpg-cfj0hmla49903fgiimmg-a/shopdic_j7jn',
      ssl: { rejectUnauthorized: false },
    },
  },

  production: {
    client: "pg",
    connection: {
      host:'ec2-3-229-165-146.compute-1.amazonaws.com',
      user : 'cygrlquuaibygd',
      password : 'e5690f3718f1322fa53d68fcbd76c8bc4acb36dfc83d0d84d3aee5070376c143',
      database : 'd58qbuc2m0e2ig',
      port: 5432
    },
    ssl:{
      rejectUnauthorized: false
    },
    // connectionString: 'postgres://cygrlquuaibygd:e5690f3718f1322fa53d68fcbd76c8bc4acb36dfc83d0d84d3aee5070376c143@ec2-3-229-165-146.compute-1.amazonaws.com:5432/d58qbuc2m0e2ig',
    pool: {
      min: 2,
      max: 10
    },
  }

};