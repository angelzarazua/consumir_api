const userService = require('../services/userService');

exports.listUsers = function(req, res) {
	userService.allUsers(function(users, err) {
		if (err) {
			console.error('Error al recuperar los usuarios');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			// console.log('Users recuperados:', users);
			res.render('users', {users: users});
		}
	});
};

exports.editUser = function(req, res) {
	const idUser = req.params.idUser;
	const estatura = req.body.estatura;
	const peso = req.body.peso;
	
	userService.editUser(idUser, estatura, peso, function(user, err) {
		if (err) {
			console.error('Error al editar los datos del usuario');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('User modificado:', user);
			res.render('editUser', {user: user});
		}
	});
};

// exports.newUser = function(req, res) {
// 	var user = {};
	
// 	res.render('newUser', {user: user});
// };


/**
 * Creates a new User.
 */
exports.createUser = function(req, res) {
	const nombre = req.body.Nombre;
	const apellidos = req.body.Apellidos;
	const nombre_usuario = req.body.Nombre_Usuario;
	const correo_electronico = req.body.Correo_Electronico;
	const password = req.body.password;

	console.log('Nombre', nombre);
	
	
	userService.createUser(nombre, apellidos, nombre_usuario, correo_electronico, password, function(user, err) {
		if (err) {
			console.error('Error al crear el usuario');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('User creado:', user);
			res.redirect('/users');
			res.render(user)
		}
	});
};