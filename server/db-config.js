module.exports = {
  dbName: 'tskon1_asuka_frm',
  dbUser: 'tskon1_asuka_frm',
  dbPassword: 'q1w2Q!W@',
  dbOptions:{
    host: 'tskon1.beget.tech',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }

}