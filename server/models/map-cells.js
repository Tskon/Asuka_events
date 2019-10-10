module.exports = function (sequelize, Sequelize) {
  const Map = sequelize.define('mapCell', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cellName: {
      type: Sequelize.CHAR(4),
      defaultValue: 'a1'
    },

    dataJson: {
      type: Sequelize.TEXT,
      defaultValue: '{"connectedCells":[],"bonus":0, "controlledTurnsCount": 0, "players": [], "owner": null}',
    },
  })

  return Map
}
