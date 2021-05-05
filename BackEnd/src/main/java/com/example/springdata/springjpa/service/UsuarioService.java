package com.example.springdata.springjpa.service;

import java.util.Optional;

import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;

public interface UsuarioService {
	
	Iterable<Usuario> getAllUsers();
	
	Usuario findByEmail(String email);

	void deleteAllUsers();

	Usuario AddUser(Usuario newUsuario);

	Rol getRol(String email);

}
