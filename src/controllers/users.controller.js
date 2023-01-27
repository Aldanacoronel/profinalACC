const usersCtrl = {};
const passport = require('passport');
const User = require('../models/user')


usersCtrl.renderSignUpForm = (req, res) => {   //funcion para que el usuario se registre
    res.render('users/signup');
};


usersCtrl.signup = async (req, res) => {  
    const errors = [];   // para enviar varios msjs creamos una constante que va a ser un arreglo
    const { name, email, password, confirm_password} = req.body;    // desde req.body extraemos estos datos name, email, etc.
    if (password != confirm_password) {   //si password es desigual a confirm password entonces mostra el msj de error
        errors.push({text: 'Ups! Las contraseñas no coinciden!'}); // llamamos a la constante errors y pusheamos un objeto al array   
    }
    if (password.length < 4){       // si la contraseña tiene menos de 4 caracteres sale este msj
        errors.push ({text: 'Las contraseñas tienen que tener 4 caracteres como minimo!'})
    };
    if (errors.length > 0) {        // si por lo menos existe un error volvemos a enviar el formulario y mostramos los errores
    res.render('users/signup', {
        errors,
        name, 
        email,
    });
}   
    else {
        const emailUser = await User.findOne({email: email});       // si el usuario ingresa un mail que ya fue ingresado a la base de datos (este lo encuentra) que lo busque y que mande el msj de error, dsp que lo redirija a sign up
        if (emailUser) {
            req.flash('error_msg', 'El mail ingresado ya esta en uso!');
            res.redirect('/users/signup');
        } else {
            const newUser = new User ({name, email, password});     // si el mail que ingreso no existe en la base de datos, encontes lo guardamos y lo redireccionamos a sign in
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Bienvenido a nuestra michifamilia!! 😻😻😸')
            res.redirect('/users/signin');
        }
    };
};

usersCtrl.renderSigninForm = (req, res) => {    // funcion para que el usuario ingrese 
    res.render('users/signin');
};


usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {         //funcion para que el usuario cierre sesion
    req.logout(function(err) {
        if (err) { return next(err); }
    req.flash('success_msg', 'Sesion cerrada! Ojala vuelvas pronto! 😻');
    res.redirect('/users/signin');
      });
};


module.exports = usersCtrl;