const Sequelize = require("sequelize");
const db = require("../db");

const Session = db.define("session", {
    roomId: {
        type: Sequelize.UUID
    },
    status: {
        type: Sequelize.ENUM ('unmatched', 'matched', 'closed')
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    blurb: {
        type: Sequelize.STRING(100),
    },
    summary: {
        type: Sequelize.STRING(200)
    },
    image: {
        type: Sequelize.STRING,
    }
})

module.exports = Session;

// song, poem, dance, painting, drawing, joke, scene, script, theater improv, comedy,
