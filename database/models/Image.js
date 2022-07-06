module.exports = (sequelize, dataTypes) => {

    let alias = 'Image';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        url:{
            type: dataTypes.STRING(45),
            allowNull: true
        },
        product_id:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {underscored: true, timestamps:false};

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function(models){
        Image.belongsTo(models.Product, {
            as:'product',
            foreignKey:'product_id'
        })
    };

    return Image;
}