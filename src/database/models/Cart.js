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
        cant_product:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        product_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        },
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {underscored: true, timestamps:false};

    const Cart = sequelize.define(alias, cols, config);

    return Cart;
}