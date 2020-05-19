const http = require('http');
const host = '187.188.122.85';
const port = '8091';


exports.allUsers = function(next) {
	var path = '/NutriNET/Cliente';
	
	var options = {
		host: host,
		port: port,
		path: path,
		method: 'GET',
		encoding: null
	};
	
	servicioApi(options, null, function (users, err) {
		if (err) {
			next(null, err);
		} else {
			next(users, null);
		}
    });
};
    
exports.editUser = function(idUser, estatura, peso, next) {
    const path = '/NutriNET/Cliente/' + idUser

    const userData = JSON.stringify({
        "estatura" : estatura,
        "peso" : peso
    });
    
    var options = {
        host: host,
        port: port,
        path: path,
        method: 'PUT',
        encoding: null
    };
    
    servicioApi(options, userData, function (user, err) {
        if (err) {
            next(null, err);
        } else {
            next(user, null);
        }
    });
};

exports.createUser = function(nombre, apellidos, nombre_usuario, correo_electronico, password, next) {
	const path = '/NutriNET/Cliente'
	
	const userData = {
		"Nombre" : nombre,
        "Apellidos" : apellidos,
        "Nombre_Usuario": nombre_usuario,
        "Correo_Electronico": correo_electronico,
        "Contraseña": password
	}
	
	const options = {
		host: host,
		port: port,
		path: path,
		method: 'POST',
		encoding: null
	};
	
	servicioApi(options, userData, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user, null);
		}
	});
};



function servicioApi(options, jsonObject, next) {
	var req = http.request(options, function(res) {
        const contentType = res.headers['content-type'];
        
		let data = '';

		res.on('data', function (chunk) {
			data += chunk;
		}).on('end', function () {
			let response = data;
			if (contentType.indexOf('application/json') != -1) {
				response = JSON.parse(data);
			}
			next(response, null);
		})
		.on('error', function(err) {
			console.error('Error al procesar el mensaje: ' + err)
		})
		.on('uncaughtException', function (err) {
			console.error(err);
		});
	}).on('error', function (err) {
		console.error('HTTP request failed: ' + err);
		next(null, err);
	});
	if (jsonObject) {
		req.write(jsonObject);
	}
	
	req.end();
};