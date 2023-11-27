import { DataTypes, sequelize } from 'sequelize';
import UserModel from '@/model/User';


module.exports = (sequelize) => {
    const Test = sequelize.define('Test', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Generates UUID by default
            primaryKey: true,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    const User = UserModel(sequelize);
    User.sync();


    Test.belongsTo(User, { foreignKey: 'userId' });
    return Test;

}

