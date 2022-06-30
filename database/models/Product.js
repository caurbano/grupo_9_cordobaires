module.exports = (sequelize, DataTypes) => {

    let alias = 'Product';
    let cols = {
        id:{
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.VARCHAR(45),
            allowNull: true,
            unique: true
        },
        description:{
            type: DataTypes.VARCHAR(500),
            allowNull: true
        },
        category:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        color:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        price:{
            type: DataTypes.INTENTEGER(11),
            allowNull: true
        },
        discount:{
            type: DataTypes.INTENTEGER(11),
            allowNull: true
        },
        created_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        },
        stock:{
            type: DataTypes.INTENTEGER(11),
            allowNull: true
        }
    };
    let config = {underscored: true};

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models){
        Product.hasMany(models.Image, {
            as:'images',
            foreignKey:'products_id'
        });
        Product.belongsToMany(models.Cart, {
            as:'carts',
            through:'products_carts',
            foreignKey:'products_id',
            otherKey:'carts_id',
            timestamps:false
        });
    }

    return Product;
}