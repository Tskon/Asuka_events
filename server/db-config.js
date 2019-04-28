module.exports = {
  dbName: 'asuka_events',
  // dbUser: 'tskon1_asuka_frm',
  dbUser: 'root',
  // dbPassword: 'q1w2Q!W@',
  dbPassword: 'root',
  dbOptions: {
    // host: 'tskon1.beget.tech',
    host: 'localhost',
    port: 8080,
    // dialect: 'mysql',
    dialect: 'mariadb',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000,
    },
  },
}
