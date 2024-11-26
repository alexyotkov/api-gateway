const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Instance = sequelize.define('Instance', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'enabled',
                allowNull: false
            }
        }, {
            timestamps: false
        }
    );

    Instance.associate = (db) => {
        Instance.belongsTo(db['Service'], {
            foreignKey: 'serviceId',
            onDelete: 'CASCADE',
        });
    };

    return Instance;
}