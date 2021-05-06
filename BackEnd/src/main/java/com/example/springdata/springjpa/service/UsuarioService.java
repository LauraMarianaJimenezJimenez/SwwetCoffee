package com.example.springdata.springjpa.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.example.springdata.springjpa.model.Rol;
import com.example.springdata.springjpa.model.Usuario;

public interface UsuarioService {
	
	Page<Usuario> getAllUsers(PageRequest pageRequest);
	
	Usuario findByEmail(String email);

	void deleteAllUsers();

	Usuario AddUser(Usuario newUsuario);

	Rol getRol(String email);

}
