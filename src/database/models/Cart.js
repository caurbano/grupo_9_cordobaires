module.exports = (sequelize, dataTypes) => {

    let alias = 'Cart';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        total:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        cant_items:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {underscored: true, timestamps:false};

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models){
        Cart.belongsTo(models.User, {
            as:'user',
            foreignKey:'id'
        });
        Cart.belongsToMany(models.Product, {
            as:'product',
            through:'products_carts',
            foreignKey:'cart_id',
            otherKey:'product_id',
            timestamps:false
        });
    }

    return Cart;
}