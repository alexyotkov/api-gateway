const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const RefreshToken = sequelize.define('RefreshToken', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            freezeTableName: false,
            timestamps: false
        }
    );

    RefreshToken.associate = (db) => {
        RefreshToken.belongsTo(db['User'], {
            foreignKey: 'userId'
        });
    };

    return RefreshToken;
}