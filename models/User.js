module.exports = (db, type) => {
  return db.define('users', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: type.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", 'i']
      }
    }
  })
}