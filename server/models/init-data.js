const Sequelize = require('sequelize')

module.exports = {
  battleTable: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    turnNumber: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    cellId: {
      type: Sequelize.CHAR(4),
      defaultValue: ''
    },

    dataJson: {
      type: Sequelize.TEXT,
      defaultValue: `{
      "screenshots": {
        "finalist1": "",
        "finalist2": "",
        "winner": ""
      },
      "pair1": [],
      "pair2": [],
      "finalPair": [],
      "winner": ""
    }`
    }
  },

  mapCells: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    cellName: {
      type: Sequelize.CHAR(4),
      defaultValue: 'a1'
    },

    dataJson: {
      type: Sequelize.TEXT,
      defaultValue: '{"connectedCells":[], "isStarted": false, "bonus":0, "controlledTurnsCount": 0, "players": [], "owner": null}'
    }
  },

  mapLog: {
    turn: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    playersJson: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    cellsJson: {
      type: Sequelize.TEXT,
      defaultValue: ''
    }
  },

  mapTurnData: {
    turnNumber: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    turnName: {
      type: Sequelize.CHAR(20),
      defaultValue: ''
    },

    fog: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },

  user: {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    username: {
      type: Sequelize.TEXT
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    isPlayer: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    secret: {
      type: Sequelize.STRING,
      defaultValue: ''
    }
  },

  userLkData: {
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    clanTag: {
      type: Sequelize.TEXT,
      defaultValue: 'UNKWN'
    },

    clanName: {
      type: Sequelize.STRING,
      defaultValue: 'Unknown clan'
    },

    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: false
    }
  },
  userMapData: {
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    selectedCellId: {
      type: Sequelize.CHAR(4),
      defaultValue: ''
    }
  }
}
