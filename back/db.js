const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = lowdb(new FileSync('db.json'))