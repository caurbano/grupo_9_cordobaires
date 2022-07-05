module.exports = (sequelize, dataTypes) => {

    let alias = 'User';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        first_name:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        last_name:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        admin:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        email:{
            type: dataTypes.STRING(45),
            allowNull: true,
            unique: true
        },
        password:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        phone:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        img:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        created_at:{
            type: dataTypes.DATE
        },
        updated_at:{
            type: dataTypes.DATE
        }
    };
    let config = {underscored: true};

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models){
        User.hasMany(models.Cart, {
            as:'cart',
            foreignKey:'user_id'
        })
    }

    return User;
}