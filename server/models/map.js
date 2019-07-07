module.exports = function (sequelize, Sequelize) {
  const Map = sequelize.define('map', {
    id: {
      primaryKey: true,
      type: Sequelize.TEXT,
    },

    dataJSON: {
      type: Sequelize.TEXT,
      defaultValue: '{"players":[],"connectedCells":[],"bonus":0}',
    },

  })

  return UserLkData
}
