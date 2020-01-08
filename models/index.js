// import sequelize & schemas
const Sequelize = require("sequelize")
const db = require("../config/database")
const CategoryModel = require("./Category")
const TagModel = require("./Tag")
const PostModel = require("./Post")
const UserModel = require("./User")

// create models
const Category = CategoryModel(db, Sequelize)
const Tag = TagModel(db, Sequelize)
const User = UserModel(db, Sequelize)
const Post = PostModel(db, Sequelize)
const PostTag = db.define("post_tag")

// define relationships
// Category & Post (one -> many)
Category.hasMany(Post, { as: "articles" })
Post.belongsTo(Category)

// User & Post (One -> many)
User.hasMany(Post)
Post.belongsTo(User)

// Post & Tag (many -> many)
Post.belongsToMany(Tag, { through: PostTag })
Tag.belongsToMany(Post, { through: PostTag })

// generate tables in DB
db.sync({ force: false }).then(() => {
  console.log("Tables Created!")
})

module.exports = {
  Category,
  Tag,
  User,
  Post
}
