import { DataTypes, sequelize } from 'sequelize';


module.exports = (sequelize) => {
    const Test = sequelize.define('Test', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Generates UUID by default
            primaryKey: true,
            allowNull: false,
        },
        subjectname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endtime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Test.belongsTo(User, { foreignKey: 'userid' });
    Test.belongsTo(User, { foreignKey: 'name' });

    return Test;

}

