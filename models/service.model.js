const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Service = sequelize.define('Service', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            apiName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            loadbalanceStrategy: {
                type: DataTypes.STRING,
                defaultValue: 'ROUND_ROBIN',
                allowNull: false
            }
        }, {
            freezeTableName: false,
            // tableName: "Services",
            timestamps: false,
            // createdAt: "dateCreated",
            // updatedAt: false
        }
    );

    Service.associate = (db) => {
        Service.hasMany(db['Instance'], {
            foreignKey: 'serviceId',
            as: 'instances',
        });
    };


    return Service;
}