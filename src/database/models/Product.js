module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(45),
            allowNull: true,
            unique: true
        },
        description:{
            type: dataTypes.STRING(500),
            allowNull: true
        },
        category:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        color:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        price:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        discount:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        created_at:{
            type: dataTypes.DATE
        },
        updated_at:{
            type: dataTypes.DATE
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        state:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
    };
    let config = {underscored: true};//, timestamps: false

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models){
        Product.hasMany(models.Image, {
            as:'images',
            foreignKey:'product_id'
        });
        Product.belongsToMany(models.User, {
            through:'carts',
            foreignKey:'product_id',
            otherKey:'user_id',
            timestamps:false
        });
    }

    return Product;
}