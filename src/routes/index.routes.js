const { Router } = require('express');
const router = Router();
const { renderIndex, 
        renderproductos,
        renderpreguntasfrec,
        renderformulario
} = require('../controllers/index.controller')

router.get("/", renderIndex);
router.get("/index", renderIndex);
router.get("/productos", renderproductos);
router.get("/preguntasfrec", renderpreguntasfrec);
router.get("/formulario", renderformulario);



module.exports = router;