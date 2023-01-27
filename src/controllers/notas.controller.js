const notasCtrl = {};

const Note = require('../models/notes'); // para que tome el modelo de nota que creamos previamente

notasCtrl.renderNoteForm = (req, res) => {
    res.render("notes/new-note")
};

notasCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;      // le estamos diciendo que requerimos desde el body el title y description 
    const newNote = new Note({title, description});
    newNote.user = req.user.id;                 // parqa que guarde el id del usuario por cada nota que se cree
    await newNote.save();                       // para que guarde la nota en la BDD
    req.flash('success_msg', 'Nota agregada con exito');
    res.redirect('/notes');                     // para que nos redirija a /notes
};

notasCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'});  // filtro (query) para que busque el id del usuario que inicio sesion, "desc" para que ordene las notas por fecha
    res.render('notes/all-notes', { notes })
};

notasCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {             // validacion para que solo el usuario que inicio sesion pueda ver sus notas
        req.flash('error_msg', 'No estas autorizado para ver esta pestaña, necesitas iniciar sesion o registrarse primero 😾');
        return res.redirect('/notes')
    }
    res.render('notes/edit-note', { note });
};

notasCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;     // destructuring 
    if (Note.user != req.user.id) {             
        req.flash('error_msg', 'No estas autorizado para ver esta pestaña, necesitas iniciar sesion o registrarse primero 😾');
        return res.redirect('/notes');
    }
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada con exito');
    res.redirect('/notes')
};

notasCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // le estamos pidiendo el parametro "id" para poder eliminar el objeto
    req.flash('success_msg', 'Nota eliminada con exito');
    res.redirect('/notes'); // para que nos redirija a /notes
};

module.exports = notasCtrl; // para que podamos llamar estas funciones