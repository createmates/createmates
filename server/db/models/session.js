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
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    blurb: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    summary: {
        type: Sequelize.STRING(200)
    },
    image: {
        type: Sequelize.STRING,
    }
})

module.exports = Session;

//categories:  song, poem, dance, painting, drawing, joke, scene, script, theater improv, comedy,
