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
                allowNull: false,
                unique: true
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

    User.associate = (db) => {
        User.hasMany(db['RefreshToken'], {
            foreignKey: 'userId'
        });
        User.hasMany(db['InvalidToken'], {
            foreignKey: 'userId'
        });
    }

    return User;
}