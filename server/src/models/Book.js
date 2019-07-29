module.exports = (Sequelize, DataTypes) => {
    const Book = Sequelize.define('Book', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,
        status: DataTypes.STRING,
        prices: DataTypes.STRING
    })

    return Book
}