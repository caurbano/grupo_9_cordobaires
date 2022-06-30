module.exports = (sequelize, DataTypes) => {

    let alias = 'User';
    let cols = {
        id:{
            type: DataTypes.INTIGER(11),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        last_name:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        admin:{
            type: DataTypes.INTIGER(11),
            allowNull: true
        },
        email:{
            type: DataTypes.VARCHAR(45),
            allowNull: true,
            unique: true
        },
        password:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        phone:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        img:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        }
    };
    let config = {underscored: true};

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models){
        User.hasMany(models.Cart, {
            as:'cart',
            foreignKey:'users_id'
        })
    }

    return User;
}