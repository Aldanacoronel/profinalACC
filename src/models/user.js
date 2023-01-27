const { Schema, model} = require('mongoose');
const bcrypt= require('bcryptjs');

// modelo
const UserSchema = new Schema(
    {
      name: { type: String, trim: true },
      email: { type: String, required: true, unique: true }, // unique: true para que no se pueda registrar 2 veces el mismo mail
      password: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
// esto sirve para cifrar la contraseña con bcrypt
  UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);  
    return await bcrypt.hash(password, salt);

  }
// y esto para matchear la pass con la que tenenmos en la basa de datos
  UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  module.exports = model('User', UserSchema);