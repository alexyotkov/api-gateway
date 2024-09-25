const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'user',
                allowNull: false
            }
        }, {
            timestamps: false
        }
    );

    return User;
}