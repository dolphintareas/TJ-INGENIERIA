const cursosCtrl = {};

const passport = require('passport');

const Curso = require('../models/Curso')

//router.post('/cursos/busquedas', findCourse);
cursosCtrl.findCourse = (req, res) => {
    res.render('cursos/busquedas');
}


//router.get('/cursos/all', showCourses);
cursosCtrl.showCourses = async (req, res) => {
    const cursos = await Curso.find().sort({createdAt: 'desc'});
    res.render('cursos/all-cursos',{cursos});
}




//router.get('/cursos/add', renderCourseForm);
cursosCtrl.renderCoursesForm = (req, res) => {
    
    res.render('cursos/new-curso');
}

//router.post('/cursos/add', newCourse);
cursosCtrl.newCourse = async (req, res) =>{
    
    const {nombre, precio, inicio, contacto, contenido} = req.body;
            const newCurso = new Curso({nombre, precio, inicio, contacto, contenido});
            
            await newCurso.save();
            req.flash('success_msg', 'Hemos recibido tu curso, un tutor se comunicará contigo en breves momentos');
            res.redirect('/cursos/add');
};

//router.get('/cursos/edit/:id',renderEditCourse);
cursosCtrl.renderEditCourse = async (req, res) => {
    
    const curso = await Curso.findById(req.params.id);
    
    res.render('cursos/edit-curso',{curso})
    
};

//router.put('/cursos/edit/:id', updateCourse);
cursosCtrl.updateCourse = async (req, res) => {
    const {nombre, precio, inicio, contenido} = req.body;
    await Curso.findByIdAndUpdate(req.params.id, {nombre, precio, inicio, contenido})
    req.flash('success_msg', 'Curso actualizado')
    
    res.redirect('/cursos/all');
}

cursosCtrl.deleteCourse = async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Curso eliminado');
    res.redirect('/cursos/all')
}


//router.get('/cursos/find',renderFindCourse);
cursosCtrl.renderFindCourse = async (req, res) => {    
    res.render('cursos/busquedas')
};


module.exports = cursosCtrl;