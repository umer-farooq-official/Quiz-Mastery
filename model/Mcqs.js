import { DataTypes, sequelize } from 'sequelize';
import TestModel from '@/model/Test';



module.exports = (sequelize) => {
    const Mcqs = sequelize.define('Mcqs', {
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
            type: DataTypes.STRING,
            allowNull: false,
        },
        option2: {
            type: DataTypes.STRING,
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
        correctOption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        testId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    const Test = TestModel(sequelize);
    Test.sync();
    

    Mcqs.belongsTo(Test, { foreignKey: 'testId' });
    return Mcqs;

}

