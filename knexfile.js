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
      database: "ShoppingApp",
      user: "root",
      password: "[事前準備で設定したrootユーザのパスワード]",
    },
    pool: {
      min: 2,
      max: 10
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
    // connectionString: 'postgres://cygrlquuaibygd:e5690f3718f1322fa53d68fcbd76c8bc4acb36dfc83d0d84d3aee5070376c143@ec2-3-229-165-146.compute-1.amazonaws.com:5432/d58qbuc2m0e2ig',
    pool: {
      min: 2,
      max: 10
    },
  }

};