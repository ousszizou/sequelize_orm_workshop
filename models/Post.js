module.exports = (db, type) => {
  return db.define('posts', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    },
    body: {
      type: type.STRING,
      allowNull: false
    },
  })
}