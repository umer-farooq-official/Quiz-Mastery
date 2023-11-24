import { DataTypes, sequelize } from 'sequelize';


module.exports = (sequelize) => {
    const Test = sequelize.define('Mcq', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Generates UUID by default
            primaryKey: true,
            allowNull: false,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        option1: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        option2: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        option3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        option4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correctoption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        testid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    Test.belongsTo(Test, { foreignKey: 'testid' });
    return Mcq;

}

