module.exports = (sequelize, DataTypes) => {

    let alias = 'Cart';
    let cols = {
        id:{
            type: DataTypes.INTIGER(11),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        total:{
            type: DataTypes.INTIGER(11),
            allowNull: true,
        },
        cant_items:{
            type: DataTypes.INTIGER(11),
            allowNull: true,
        },
        users_id:{
            type: DataTypes.INTIGER(11),
            allowNull: true
        }
    };
    let config = {underscored: true};

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models){
        Cart.belongsTo(models.User, {
            as:'user',
            foreignKey:'id'
        });
        Cart.belongsToMany(models.Product, {
            as:'product',
            through:'products_carts',
            foreignKey:'carts_id',
            otherKey:'products_id',
            timestamps:false
        });
    }

    return Cart;
}