module.exports = function(sequelize, dataTypes) {
    let alias = "Product";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.VARCHAR(30),
            allowNull: false
            // uniqueIndex: true
        },
        description: {
            type: dataTypes.VARCHAR(500),
            allowNull: false
        },
        categories_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        color: {
            type: dataTypes.VARCHAR(45),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    // let config = {
    //     tableName: "Product",
    //     timestamps: ???
    // }

    let Product = sequelize.define(alias, cols, config);

    return Product;
}