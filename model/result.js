import { Result } from 'postcss';
import { DataTypes, sequelize } from 'sequelize';


module.exports = (sequelize) => {
    const Test = sequelize.define('Result', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Generates UUID by default
            primaryKey: true,
            allowNull: false,
        },
        testid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        userid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Test.belongsTo(User, { foreignKey: 'userid' });
    Test.belongsTo(Test, { foreignKey: 'testid' });

    return Result;

}

