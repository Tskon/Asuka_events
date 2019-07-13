module.exports = function (sequelize, Sequelize) {
  const Map = sequelize.define('mapCell', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cell_name: {
      type: Sequelize.TEXT,
      defaultValue: 'a1'
    },

    data_json: {
      type: Sequelize.TEXT,
      defaultValue: '{"players":[],"connectedCells":[],"bonus":0, "controlledTurnsCount": 0}',
    },
  })

  return Map
}
