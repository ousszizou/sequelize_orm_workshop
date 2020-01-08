module.exports = (db, type) => {
  return db.define('tags', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    }
  })
}