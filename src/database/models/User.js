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
        },
        state:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
    };
    let config = {underscored: true, timestamps: false};

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models){
        User.belongsToMany(models.Product, {
            through:'carts',
            foreignKey:'user_id',
            otherKey:'product_id',
            timestamps:false
        });
    }

    return User;
}