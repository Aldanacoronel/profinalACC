const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();

    }
    req.flash('error_msg', 'No estas autorizado para ver esta pestaña, necesitas iniciar sesion o registrarse primero 😾');
    res.redirect('/users/signin');
}
module.exports = helpers;
