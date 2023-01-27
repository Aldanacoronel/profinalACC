const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    
    const user = await User.findOne({email})   // para matchear el email del usuario
    if (!user) {     // si el usuario no existe entonces mostra este mensaje
        return done (null, false, { message: 'Usuario no registrado'});
    } else {
        const match = await user.matchPassword(password);    // para matchear la contraseña del usuario
        if (match) {
            return done (null, user);
        } else {                                            
            return done (null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));


// con el metodo de passport "serialize" podemos guardar los datos del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });