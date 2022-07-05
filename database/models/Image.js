module.exports = (sequelize, DataTypes) => {

    let alias = 'Image';
    let cols = {
        id:{
            type: DataTypes.INTIGER(11),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.VARCHAR(45),
            allowNull: true
        },
        product_id:{
            type: DataTypes.INTIGER(11),
            allowNull: true
        }
    };
    let config = {underscored: true};

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function(models){
        Image.belongsTo(models.Product, {
            as:'product',
            foreignKey:'products_id'
        })
    };

    return Image;
}