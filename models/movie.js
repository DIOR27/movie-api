const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [3, 255] }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        validate: { min: 0, max: 10 }
    }
});

module.exports = Movie;
