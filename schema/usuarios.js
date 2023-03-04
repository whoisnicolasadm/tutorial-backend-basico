const mg = require('mongoose');

const schema = new mg.Schema({ 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
 })

 module.exports = mg.model("usuario", schema)