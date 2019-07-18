module.exports = (Sequelize, DataTypes) => {
    const Comment = Sequelize.define('Comment', {
        blogId: DataTypes.STRING,
        comment: DataTypes.TEXT,
        userId: DataTypes.STRING
    })

    return Comment
}