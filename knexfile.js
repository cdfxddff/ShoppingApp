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
      database: "d58qbuc2m0e2ig",
      user: "cygrlquuaibygd",
      password: "e5690f3718f1322fa53d68fcbd76c8bc4acb36dfc83d0d84d3aee5070376c143",
    },
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};