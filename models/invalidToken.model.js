const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const InvalidToken = sequelize.define('InvalidToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        exp: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    });

    InvalidToken.associate = (db) => {
        InvalidToken.belongsTo(db['User'], {
            foreignKey: 'userId'
        });
    }

    return InvalidToken;
}