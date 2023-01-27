const indexCtrl = {};


    indexCtrl.renderIndex = (req, res) => {
        res.render("/");
    };

    
    indexCtrl.renderIndex = (req, res) => {
        res.render("index");
    };
    
    indexCtrl.renderpreguntasfrec = (req, res) => {
        res.render("preguntasfrec");
    };
    
    indexCtrl.renderproductos = (req, res) => {
        res.render("productos");
    };

    indexCtrl.renderformulario = (req, res) => {
        res.render("formulario");
    };
    

module.exports = indexCtrl;