const mongoose = require('mongoose');
const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
    edad: Number,
    correo: String
});

module.exports = mongoose.model('Cliente', clienteSchema);